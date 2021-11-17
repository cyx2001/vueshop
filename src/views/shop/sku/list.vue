<template>
  <div class="bg-white px-3" style="margin: -20px; margin-bottom: 0 !important">
    <button-search class="pt-3" :showSearch="false">
      <template #left
        ><!-- 左边 -->
        <el-button size="mini" type="success" @click="openModel(false)"
          >添加规格</el-button
        >
        <el-button size="mini" type="danger" @click="deleteAll"
          >批量删除</el-button
        >
      </template>
    </button-search>
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
      <el-table-column label="规格名称" prop="name"> </el-table-column>
      <el-table-column prop="default" align="center" width="380" label="规格值">
      </el-table-column>
      <el-table-column align="center" prop="order" label="排序">
      </el-table-column>
      <el-table-column prop="status" align="center" label="状态">
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
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="openModel(scope)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              plain
              @click="deleteItem(scope.$index)"
              >删除</el-button
            >
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
    <!-- 新增/修改模态框 -->
    <el-dialog
      :title="editIndex > -1 ? '修改规格' : '添加规格'"
      :visible.sync="createModel"
      top="5vh"
    >
      <!-- 表单内容 -->
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="规格名称"
            size="mini"
            style="width: 25%"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            size="mini"
            v-model="form.order"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" v border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type" size="mini">
            <el-radio :label="0" v border>文字</el-radio>
            <el-radio :label="1" border>颜色</el-radio>
            <el-radio :label="2" border>图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="一行为一个规格项，多个规格项用换行输入"
            v-model="form.default"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="createModel = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
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
      tableData: [
        {
          name: "颜色1",id:1,
          value: "棕色",
          order: 50,
          status: 1,
          default: "",
        },
        {
          name: "颜色2",id:2,
          value: "棕色",
          order: 50,
          status: 1,
          default: "",
        },
        {
          name: "颜色3",id:4,
          value: "棕色",
          order: 50,
          status: 1,
          default: "",
        },
        {
          name: "颜色4",id:3,
          value: "棕色",
          order: 50,
          status: 1,
          default: "",
        },
      ],
      createModel: false,
      editIndex: -1,
      form: {
        name: "",
        order: 50,
        status: 1,
        type: 0,
        default: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "规格名称不能为空",
            trigger: "blur",
          },
        ],
        default: [
          {
            required: true,
            message: "规格值不能为空",
            trigger: "blur",
          },
        ],
      },
      currentPage4: 1,
      multipleSelection: [],
    };
  },
  methods: {
    //   批量删除
    deleteAll() {
     this.multipleSelection.forEach((item)=>{
         let index=this.tableData.findIndex((v)=>v.id=item.id)
         if(index!==-1)this.tableData.splice(index,1)
     })
    },
    openModel(e) {
      if (!e) {
        //初始化表单
        this.form = {
          name: "",
          order: 50,
          status: 1,
          type: 0,
          default: "",
        };
        this.editIndex = -1;
      } else {
        // 修改

        this.form = {
          name: e.row.name,
          order: e.row.order,
          status: e.row.status,
          type: e.row.type,
          default: e.row.default.replace(/,/g, "\n"),
        };
        this.editIndex = e.$index;
      }

      this.createModel = true;
    },
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
    submit() {
      this.$refs.form.validate((res) => {
        if (res) {
          var msg = "添加";
          if (this.editIndex == -1) {
            this.form.default = this.form.default.replace(/\n/g, ",");
            this.tableData.unshift(this.form);
          } else {
            this.tableData[this.editIndex].form = this.form;
            msg = "修改";
          }
          this.createModel = false;
          this.$message({
            text: msg + "成功",
            type: "sucecess",
          });
        }
      });
    },
    getList() {},
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
  },
};
</script>
<style>
</style>
