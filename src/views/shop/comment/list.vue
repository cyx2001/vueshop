<template>
  <div class="bg-white px-3" style="margin: -20px; margin-bottom: 0 !important">
    <button-search
      class="pt-3"
      placeholder="要搜索的商品名"
      @search="searchEvent"
      ref="buttonSearch"
    >
      <template #left
        ><!-- 左边 -->
        <el-button size="mini" type="danger" @click="deleteAll"
          >批量删除</el-button
        >
      </template>
      <template #form>
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="评价用户" class="mb-0">
            <el-input
              v-model="form.username"
              placeholder="评价用户"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="评价类型" class="mb-0">
            <el-select
              v-model="form.type"
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
          <el-form-item label="发布时间" class="mb-0">
            <el-date-picker
              size="mini"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="mb-0">
            <el-button type="info" size="mini" @click="searchEvent">
              搜索</el-button
            >
            <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
          </el-form-item>
        </el-form>
      </template>
    </button-search>
    <!-- 表格 -->
    <el-table
      border
      class="mt-3"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >  <el-table-column type="selection" width="45" align="center">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props"> </template>
      </el-table-column>

      <el-table-column label="ID" prop="id" width="60"> </el-table-column>
      <el-table-column label="商品" width="380">
        <template slot-scope="scope">
          <div class="media">
            <img
              class="mr-3"
              style="width: 60px; height: 60px"
              :src="scope.row.goods.cover"
            />
            <div class="media-body">
              <p class="mt-0">{{ scope.row.goods.title }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250" label="评价信息">
        <template slot-scope="scope">
          <div class="d-flex flex-column">
            <p>用户名：{{ scope.row.username }}</p>
            <p>
              评分：<el-rate
                v-model="scope.row.rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="review_time" align="center" label="评价时间">
      </el-table-column>
      <el-table-column align="center" label="是否显示" width="150">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'success' : 'danger'"
            size="mini"
            @click="changeStatus(scope.row)"
            plain
            >{{ scope.row.status ? "启用" : "禁用" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 60px"></div>
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
      form: {
        name: "",
        type: "",
        date: "",
      }, cateOptions: [],
      tableData: [
        {
          id: 1,
          goods: {
            title: "商品标题",
            cover: "",
          },
          username: "用户名",
          review_time: "",
          status: 1,
        },
      ],
      superSearch: false,
      currentPage4: 1,
      multipleSelection: [],
    };
  },
  methods: {
    clearSearch() {
      this.form = {
        name: "",
        type: "",
        date: "",
      };
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },
    closeSuperSearch() {
      this.superSearch = false;
    },
    searchEvent() {
      if (typeof e === "string") {
        console.log("简单搜索");
      }
      console.log("搜索");
    },
    //   批量删除
    deleteAll() {
      this.multipleSelection.forEach((item) => {
        let index = this.tableData.findIndex((v) => (v.id = item.id));
        if (index !== -1) this.tableData.splice(index, 1);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }, //改变状态
    changeStatus(item) {
      item.status = !item.status;
    },
  },
};
</script>
<style>
</style>
