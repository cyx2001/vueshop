<template>
  <div>
    <el-container
      style="
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
      "
    >
      <!-- 头部导航栏 -->
      <el-header class="d-flex align-items-center"   style="background: #545c64;">
        <a href="" class="h5 text-light mb-0" style="margin-right: auto">{{
          $icof.logo
        }}</a>
        <el-menu
          :default-active="narBar.active"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numtoString"
            v-for="(item, index) in narBar.list"
            :key="index"
            >{{ item.name }}</el-menu-item
          >

          <el-submenu index="6">
            <template slot="title">
              <el-avatar :size="20" :src="circleUrl"></el-avatar>
              用户名</template
            >

            <el-menu-item index="6-1">修改</el-menu-item>
            <el-menu-item index="6-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <!-- 主布局 -->
      <el-container style="height: 100%">
        <!-- 侧边导航栏 -->
        <el-aside width="200px">
          <el-menu
            :default-active="this.slideActive"
            @select="slideSelect"
            style="height: 100%"
          >
            <el-menu-item
              :index="index | numtoString"
              v-for="(item, index) in slideMenu"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主要内容 -->
        <el-main style="padding-bottom: 60px; position: relative">
          <!-- 面包屑导航栏 -->
          <div
            class="border-bottom mb-3 bg-white"
            style="padding: 20px; margin: -20px"
            v-if="bran.length > 0"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :key="index"
                :to="{ path: 'item.path' }"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <router-view></router-view>
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="
                 {
                  height: 100%;
                  width: 100%;
                  background-color: #f2f5f6;
                  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                  text-align: center;
                  line-height: 40px;
                  color: #1989fa;
                }
              "
            >
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import common from "../common/mixins/common.js";
export default {
  mixins: [common],
  data() {
    return {
      narBar: [],
      bran: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    this.narBar = this.$icof.narBar;
    this.getRoute();
    this._initnav();
  },
  watch: {
    $route(to, from) {
      localStorage.setItem(
        "navItem",
        JSON.stringify({
          top: this.narBar.active,
          left: this.slideActive,
        })
      );
      this.getRoute();
    },
  },
  computed: {
    slideActive: {
      get() {
        return this.narBar.list[this.narBar.active].subactive || "";
      },
      set(val) {
        this.narBar.list[this.narBar.active].subactive = val;
      },
    },
    slideMenu() {
      return this.narBar.list[this.narBar.active].submenu || "";
    },
  },
  methods: {
    _initnav() {
      let ac = localStorage.getItem("navItem");
      if (ac) {
        ac = JSON.parse(ac);
        this.narBar.active = ac.top;
        this.slideActive = ac.left;
      }
    },
    handleSelect(key, keyPath) {
      //头部导航栏选择
      this.narBar.active = key;

      this.slideActive = "0";
      if (this.slideMenu.length > 0) {
        this.$router.push({
          name: this.slideMenu[this.slideActive].pathname,
        });
      }
    },
    slideSelect(key, keyPath) {
      //侧边栏选择值
      this.slideActive = key;
      this.$router.push({
        name: this.slideMenu[key].pathname,
      });
    },
    // 获取面包屑导航栏路由
    getRoute() {
      let a = this.$route.matched.filter((v) => v.name);
      let arr = [];
      a.forEach((key) => {
        if (key.name === "layout" || key.name === "index") return;
        arr.push({
          name: key.name,
          path: key.path,
          title: key.meta.title,
        });
      });
      if (arr.length > 0) {
        arr.unshift({
          name: "index",
          path: "/index",
          title: "后台首页",
        });
      }
      this.bran = arr;
    },
  },
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
