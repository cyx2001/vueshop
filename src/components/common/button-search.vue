<template>
  <div>
    <div class="d-flex align-items-center">
      <!-- 左边 -->
      <slot name="left"></slot>
      <!-- 右边 -->
      <div class="ms-auto" v-show="!superSearch" v-if="showSearch">
        <slot name="right"
          ><el-input
            v-model="keyword"
            :placeholder="placeholder"
            size="mini"
            style="width: 150px"
            class="me-2"
          ></el-input>
          <el-button size="mini" type="info" @click="$emit('search', keyword)"
            >搜索</el-button
          >
          <el-button size="mini" @click="superSearch = true"
            >高级搜索</el-button
          ></slot
        >
      </div>
    </div>
    <el-card v-show="superSearch" class="box-card bg-light my-3">
      <div slot="header" class="clearfix" style="margin: -10px">
        <span>高级搜索</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="closeSuperSearch"
          >收起</el-button
        >
      </div>
      <!-- 表单 -->
      <slot name="form"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    showSuperSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      keyword: "",
      superSearch: false,
    };
  },
  methods: {
    closeSuperSearch() {
      this.superSearch = false;
    },
  },
};
</script>

<style>
</style>