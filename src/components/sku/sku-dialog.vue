<template>
  <el-dialog title="规格选择" :visible.sync="CreateModel" width="80%" top="8vh">
    <el-container style="position: relative; height: 70vh; margin: -30px -20px">
      <el-container>
        <el-aside
          width="200px"
          style="position: absolute; top: 0; left: 0; bottom: 50px"
          class="bg-white border-right"
        >
          <!-- 侧边 | 规格卡片标题-->
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item list-group-item-action"
              v-for="(item, index) in skusList"
              :key="index"
              :class="skuIndex === index ? 'sum-active' : ''"
              @click="changeSku(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-aside>
        <!-- <el-footer
          style="
            position: absolute;
            left: 0;
            bottom: 0;
            height: 50px;
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
          class="border"
        >
          <el-pagination
            :current-page="page.current"
            :page-sizes="page.sizes"
            :page-size="page.size"
            layout="prev, next"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-footer> -->
        <el-container>
          <el-header
            style="
              position: absolute;
              top: 0;
              left: 200px;
              right: 0;
              height: 60px;
              line-height: 60px;
            "
            class="border-top border-bottom"
          >
            <el-button type="primary" size="mini" @click="doChooseAll">
              {{ isChooseAll ? "取消全选" : "全选" }}
            </el-button>
          </el-header>
          <el-main
            style="
              position: absolute;
              top: 60px;
              left: 200px;
              bottom: 0;
              right: 0;
            "
          >
            <div class="d-flex flex-wrap">
              <span
                class="border rounded py-1 px-2 m-2"
                style="cursor: pointer"
                v-for="(item, index) in skuItems"
                :key="index"
                :class="item.ischeck ? 'sum-active' : ''"
                @click="choose(item)"
              >
                {{ item.name }}
              </span>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      preUrl: "skus",
      loading: false,
      CreateModel: false,
      callback: false,
      // 选中的数组
      chooseList: [],
      // 数据
      skuIndex: 0,
      skusList: [
        {
          name: "尺寸",
          type: 0,
          list: [
            {
              name: "xxl",
              image: "",
              color: "",
            },
            {
              name: "s",
              image: "",
              color: "",
            },
          ],
        },
      ],
    };
  },
  computed: {
    // 当前规格下的规格属性列表
    skuItems() {
      let item = this.skusList[this.skuIndex];
      return item ? item.list : [];
    }, // 是否全选
    isChooseAll() {
      return this.skuItems.length === this.chooseList.length;
    },
  },
  created() {},
  methods: {
    chooseSku(callback) {
      this.callback = callback;
      this.CreateModel = true;
    },
    hide() {
        this.unChooseAll()
      this.CreateModel = false;
      this.callback = false;
    },
    confirm() {
      // 选中的skus
      if (typeof this.callback === "function") {
        let item = this.skusList[this.skuIndex];
        this.callback({
          name: item.name,
          type: item.type,
          list: this.chooseList,
        });
      }
      // 隐藏
      this.hide();
    },
    changeSku(index) {
      this.skuIndex = index;
    },
    // 选中/取消选中
    doChooseAll() {
      let list = this.skusList[this.skuIndex].list;
      if (this.isChooseAll) {
        // 取消全选
        return this.unChooseAll();
      }
      // 全选
      this.chooseList = list.map((v) => {
        // 设置全选状态
        v.ischeck = true;
        return v;
      });
    },
    // 选中规格属性
    choose(item) {
      // 选中
      if (!item.ischeck) {
        // 加入选中
        this.chooseList.push(item);
        // 修改状态
        item.ischeck = true;
        return;
      }
      // 取消选中
      // 找到在chooseList中的索引，
      let i = this.chooseList.findIndex((v) => v.id === item.id);
      if (i === -1) return;

      // 删除
      this.chooseList.splice(i, 1);
      // 修改状态
      item.ischeck = false;
    },
    // 取消选中所有
    unChooseAll() {
      let list = this.skusList[this.skuIndex].list;
      // 取消全选
      this.chooseList = list.map((v) => {
        // 取消全选状态
        v.ischeck = false;
      });
      return (this.chooseList = []);
    },
  },
};
</script>

<style>
.sum-active {
  background-color: teal;
  color: #ffffff;
}
</style>