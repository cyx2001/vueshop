<template>
  <div
    class="bg-white px-3"
    style="margin: -20px; margin-top: -1rem; margin-bottom: 0 !important"
  >
    <el-tabs v-model="tabIndex" @tab-click="getList">
      <el-tab-pane :label="tab.name" :key="tabI" v-for="(tab, tabI) in tabbars">
        <button-search
          placeholder="要搜索的商品名"
          @search="searchEvent"
          ref="buttonSearch"
        >
          <template #left
            ><!-- 左边 -->
            <router-link :to="{ name: 'shop_goods_create' }">
              <el-button size="mini" type="success">发布商品</el-button>
            </router-link>

            <el-button size="mini" type="danger">批量删除</el-button>
          </template>
          <template #form>
            <el-form inline ref="form" :model="form" label-width="80px">
              <el-form-item label="商品名称" class="mb-0">
                <el-input
                  v-model="form.name"
                  placeholder="商品名称"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类" class="mb-0">
                <el-select
                  v-model="form.category_id"
                  placeholder="请选择商品分类"
                  size="mini"
                >
                  <el-option
                    v-for="item in cateOptions"
                    :key="item.id"
                    :label="item | tree"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="mb-0">
                <el-button type="info" size="mini" @click="searchEvent">
                  搜索</el-button
                >
                <el-button size="mini" @click="clearSearch"
                  >清空筛选条件</el-button
                >
              </el-form-item>
            </el-form>
          </template>
        </button-search>
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <el-table
      border
      class="mt-3"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center">
      </el-table-column>

      <el-table-column label="商品" width="300">
        <template slot-scope="scope">
          <div class="media">
            <img
              class="me-3"
              style="width: 60px; height: 60px"
              :src="scope.row.cover"
            />
            <div class="media-body">
              <p class="mt-0">{{ scope.row.title }}</p>
              <p class="mb-0">分类：{{ scope.row.category.name }}</p>
              <p class="mb-0">时间：{{ scope.row.create_time }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="sale_count"
        width="70"
        label="实际销量"
      >
      </el-table-column>
      <el-table-column prop="status" align="center" label="商品状态" width="60">
        <template slot-scope="scope">
          <span
            class="badge"
            :class="scope.row.status ? 'badge-success' : 'badge-danger'"
            >{{ scope.row.status ? "上架" : "仓库" }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        width="120"
        label="审核状态"
      >
        <template slot-scope="scope">
          <div class="d-flex flex-column" v-if="!scope.row.ischeck">
            <el-button
              type="success"
              size="mini"
              @click="checkGoods(scope.row, 1)"
              plain
              >审核通过
            </el-button>

            <el-button
              class="ml-0 mt-2"
              type="danger"
              size="mini"
              @click="checkGoods(scope.row, 2)"
              plain
              >审核拒绝
            </el-button>
          </div>
          <span v-else>{{ scope.row.ischeck === 1 ? "通过" : "拒绝" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stock" align="center" width="90" label="总库存">
      </el-table-column>
      <el-table-column
        prop="pprice"
        align="center"
        label=" 价格(元)"
        width="120"
      >
        <template slot-scope="scope">
          <span class="text-danger">￥{{ scope.row.min_price }}</span>
          <span>/</span>
          <span class="text-muted">￥{{ scope.row.min_oprice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="navigate('shop_goods_create', scope.row.id)"
            >基础设置</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="navigate('shop_goods_sku', scope.row.id)"
            :class="
              (scope.row.sku_type == 0 && !scope.row.sku_value) ||
              (scope.row.sku_type == 1 && !scope.row.goods_skus.length)
                ? 'text-danger'
                : ''
            "
            >商品规格</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="navigate('shop_goods_attr', scope.row.id)"
            :class="scope.row.goods_attrs.length == 0 ? 'text-danger' : ''"
            >商品属性</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="navigate('shop_goods_banner', scope.row.id)"
            :class="scope.row.goods_banner.length == 0 ? 'text-danger' : ''"
            >媒体设置</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="navigate('shop_goods_content', scope.row.id)"
            :class="!scope.row.content ? 'text-danger' : ''"
            >商品详情</el-button
          >
          <el-button type="text" size="mini">折扣设置</el-button>
          <el-button type="text" size="mini" @click="deleteItem(scope.row)"
            >删除商品</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-footer
      class="border-top d-flex align-items-center px-0 position-fixed bg-white"
      style="bottom: 0; left: 200px; right: 0; z-index: 100"
    >
      <div style="flex: 1" class="px-2">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-footer>
  </div>
</template>
<script>
import buttonSearch from "../../../components/common/button-search.vue";
export default {
  components: {
    buttonSearch,
  },
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        { name: "全部", key: "all" },
        { name: "审核中", key: "checking" },
        { name: "出售中", key: "saling" },
        { name: "已下架", key: "off" },
        { name: "库存预警", key: "min_stock" },
        { name: "回收站", key: "delete" },
      ],
      form: {
        name: "",
        code: "",
        type: "",
        category: "",
      },
      superSearch: false,
      tableData: [],
      cateOptions: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  created() {
    this._getData();
  },
  methods: {
    _getData() {},
    getList() {},
    clearSearch() {
      this.form = {
        name: "",
        code: "",
        type: "",
        category: "",
      };
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },
    closeSuperSearch() {
      this.superSearch = false;
    },
    searchEvent(e) {
      if (typeof e === "string") {
        console.log("简单搜索");
      }
      console.log("搜索");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },handleSelectionChange(){
      
    }
  },
};
</script>
<style>
</style>
