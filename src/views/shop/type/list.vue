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

      <el-table-column label="类型名称" prop="name"> </el-table-column>
      <el-table-column align="center" width="380" label="属性标签">
        <template slot-scope="scope">
          {{ scope.row.value_list | formatValue }}
        </template>
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
              @click="deleteItem(scope.row)"
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
        <el-form-item label="类型名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="类型名称"
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
        <el-form-item label="关联规格">
          <div class="d-flex">
            <span
              class="sku-list-item px-3 py-2 border rounded mr-3"
              style="line-height: initial"
              v-for="(item, index) in form.sku_list"
              :key="index"
            >
              <font>{{ item.name }}</font>
              <i class="el-icon-delete" @click="deleteFormSkuList(index)"></i>
            </span>
            <el-button size="mini" @click="chooseSkus">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="属性列表">
          <el-table :data="value_list" style="width: 100%">
            <el-table-column prop="order" label="排序" width="80">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.order"
                  size="mini"
                  placeholder="排序"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="属性名称" width="130">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  size="mini"
                  placeholder="属性名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="所属类型" width="130">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.type"
                  placeholder="请选择所属类型"
                  size="mini"
                >
                  <el-option label="输入框" value="input"></el-option>
                  <el-option label="单选框" value="radio"></el-option>
                  <el-option label="多选框" value="checkbox"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="是否显示" width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="属性值">
              <template slot-scope="scope" v-if="scope.row.type !== 'input'">
                <el-input
                  type="textarea"
                  v-model="scope.row.default"
                  size="mini"
                  placeholder="一行为一个属性值，多个属性值用换行输入"
                  v-if="scope.row.isedit"
                ></el-input>
                <span v-else>{{ scope.row.default }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.type !== 'input'"
                  type="text"
                  size="mini"
                  @click="editRow(scope)"
                  >{{ scope.row.isedit ? "完成" : "编辑属性值" }}</el-button
                >
                <el-button type="text" size="mini" @click="delRow(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click="addValue"
            >添加一个属性</el-button
          >
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
  inject: ["app"],
  components: {
    buttonSearch,
  },
  data() {
    return {
      preUrl: "goods_type",
      tableData: [
        {
          id: 1,
          name: "鞋子",
          order: 50,
          status: 1,
          sku_list: [
            { id: 1, name: "颜色" },
            { id: 2, name: "尺寸" },
          ],
          value_list: [
            {
              order: 50,
              name: "特性",
              type: "input",
              value: "",
            },
            {
              order: 50,
              name: "前置摄像机",
              type: "input",
              value: "",
            },
          ],
        },
      ],
      form: {
        name: "",
        order: 50,
        status: 1,
        arr: [],
        sku_list: [],
      },
      value_list: [],
      createModel: false,
      editIndex: -1,
      rules: {
        name: [
          {
            required: true,
            message: "类型名称不能为空",
            trigger: "blur",
          },
        ],
      },
      currentPage4: 1,
      multipleSelection: [],
    };
  },
  filters: {
    formatValue(value) {
      let arr = value.map((v) => v.name);
      return arr.join(",");
    },
  },
  methods: {
    //   批量删除
    deleteAll() {
      this.multipleSelection.forEach((item) => {
        let index = this.tableData.findIndex((v) => (v.id = item.id));
        if (index !== -1) this.tableData.splice(index, 1);
      });
    },
    openModel(e) {
      if (!e) {
        //初始化表单
        this.form = {
          name: "",
          order: 50,
          status: 1,
          arr: [],
          sku_list: [],
        };
        this.editIndex = -1;
      } else {
        // 修改
        this.form = {
          ...e.row,
        };
        this.value_list = [...e.row.value_list];
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
        var result = true,
          message = [];
        this.value_list.forEach((item, index) => {
          let no = index + 1;
          if (item.order == "") {
            result = result && false;
            message.push("第" + no + "行：排序不能为空");
          }
          if (item.name == "") {
            result = result && false;
            message.push("第" + no + "行：属性名称不能为空");
          }
          if (item.type !== "input" && item.default == "") {
            result = result && false;
            message.push("第" + no + "行：属性值不能为空");
          }
        });
        if (!result) {
          var temp = "";
          message.forEach((v) => {
            temp += `<li>${v}</li>`;
          });
          return this.$notify({
            title: "属性列表提示",
            dangerouslyUseHTMLString: true,
            type: "warning",
            duration: 3000,
            message: `<ul>${temp}</ul>`,
          });
        }
        if (res) {
          var msg = "添加";
          if (this.editIndex == -1) {
            //this.form.default = this.form.default.replace(/\n/g, ",");
            this.tableData.unshift({
              ...this.form,
              value_list: [...this.value_list],
            });
          } else {
            this.tableData[this.editIndex].form = this.form;
            msg = "修改";
          }
          this.createModel = false;
          this.$message({
            message: msg + "成功",
            type: "success",
          });
        }
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
    },
    // 删除表单列表
    deleteFormSkuList(index) {
      this.form.sku_list.splice(index, 1);
    },
    // 添加规格值
    addValue() {
      this.value_list.push({
        order: 50,
        name: "",
        type: "input",
        value: "",
        isedit: false,
      });
    },
    chooseSkus() {
      this.app.chooseSkus((e) => {
        let index = this.form.sku_list.findIndex((item) => {
          return item.id === e.id;
        });
        if (index === -1) {
          this.form.sku_list.push(e);
        }
      });
    },
    editRow(scope) {
      scope.row.isedit = !scope.row.isedit;
    },
    //删除行
    delRow(index) {
      this.value_list.splice(index, 1);
    },
  },
};
</script>
<style>
.sku-list-item > i {
  display: none;
  cursor: pointer;
}
.sku-list-item:hover {
  background-color: #f4f4f4;
}
.sku-list-item:hover > font {
  display: none;
}
.sku-list-item:hover > i {
  display: inline-block;
}
</style>
