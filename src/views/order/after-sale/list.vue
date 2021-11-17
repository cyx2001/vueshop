<template>
  <div class="bg-white px-3" style="margin: -20px; margin-bottom: 0 !important">
    <div class="d-flex align-items-center">
      <div class="ms-auto">
        <el-date-picker
          size="mini"
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-input
          v-model="keyword"
          placeholder="请输入订单编号"
          size="mini"
          style="width: 150px"
          class="mx-2"
        ></el-input>
        <el-button size="mini" type="info">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table border class="mt-3"
		  :data="tableData"
		  style="width: 100%"
		   @selection-change="handleSelectionChange">
		  <el-table-column
			type="selection"
			width="45"
			align="center">
		  </el-table-column>
		  
		  <el-table-column
			label="商品信息"
			prop="name">
		  </el-table-column>
		 
		  <el-table-column
			align="center"
			prop="username"
			label="商品清单">
		  </el-table-column>
		  
		  <el-table-column
			align="center"
			prop="price"
			label="订单金额">
		  </el-table-column>
		  
		  <el-table-column
			align="center"
			prop="price"
			label="收货信息">
		  </el-table-column>
		  
		  <el-table-column
			align="center"
			prop="content"
			label="买家">
		  </el-table-column>
		  
		  <el-table-column
			align="center"
			prop="code"
			label="交易状态">
		  </el-table-column>
		  
		  <el-table-column
			align="center"
			prop="create_time"
			label="创建时间">
		  </el-table-column>
		  
		  <el-table-column
			align="center"
			label="操作"
			width="150">
			<template slot-scope="scope">
				<el-button-group>
				  <el-button type="danger" size="mini" 
				  plain @click="deleteItem(scope)"
				  >删除</el-button>
				</el-button-group>
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
      preUrl: "skus",
      keyword: "",
      date: "",
      tableData: [
        {
          name: "颜色1",
          username: "111",
          price: "11",
          content: "11",
          code: "111",
          create_time: "11",
        },
      ],
      currentPage4: 1,
      multipleSelection: [],
    };
  },
  methods: {
    deleteItem(index) {
      this.$confirm("是否删除该规格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "放弃删除",
        type: "warning",
      }).then(() => {
        this.tableData.splice(index, 1),
          this.$message({
            type: "success",
            message: "删除成功",
          });
      });
    },
    //改变状态
    changeStatus(item) {
      item.status = !item.status;
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
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
   
    searchEvent() {
      if (typeof e === "string") {
        console.log("简单搜索");
      }
      console.log("搜索");
    },
  },
};
</script>
<style>
</style>
