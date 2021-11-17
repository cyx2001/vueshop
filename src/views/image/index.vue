<template>
  <div>
    <el-container
      style="position: absolute; top: 55px; bottom: 0; left: 0; right: 0"
    >
      <el-header class="d-flex align-items-center border-bottom">
        <div class="me-auto">
          <el-select
            class="me-2"
            placeholder="请选择图片排序方式"
            size="mini"
            style="width: 150px"
            v-model="searchForm.order"
          >
            <el-option label="降序" value="desc"></el-option>
            <el-option label="升序" value="asc"></el-option>
          </el-select>
          <el-input
            class="me-2"
            size="mini"
            placeholder="输入图片名称"
            style="width: 150px"
            v-model="searchForm.keyword"
          ></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <el-button
          type="warning"
          size="mini"
          @click="unChoose"
          v-if="chooseList.length"
        >
          取消选中</el-button
        >
        <el-button
          type="danger"
          size="mini"
          @click="delImage({ all: true })"
          v-if="chooseList.length"
        >
          批量删除</el-button
        >
        <el-button type="success" size="mini" @click="openAlbumModel(false)"
          >创建相册</el-button
        >
        <el-button type="warning" size="mini" @click="uploadModel = true"
          >上传图片</el-button
        >
      </el-header>
      <el-container>
        <!-- 侧边|相册列表 -->
        <el-aside
          width="200px"
          style="position: absolute; top: 55px; bottom: 60px; left: 0"
        >
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              :active="albumIndex === index"
              @change="albumChange"
              @edit="openAlbumModel"
              @del="albumDel"
            ></album-item>
          </ul>
        </el-aside>
        <!-- 主内容 -->
        <el-main
          style="
            position: absolute;
            top: 55px;
            bottom: 60px;
            left: 200px;
            right: 0;
          "
        >
          <el-row :gutter="20">
            <el-col
              :span="24"
              :lg="4"
              :md="6"
              :sm="8"
              v-for="(item, index) in imageList"
              :key="index"
            >
              <el-card
                class="box-card mb-3 position-relative"
                :body-style="{ padding: '0' }"
                shadow="hover"
              >
                <div class="border" :class="{ 'border-danger': item.ischeck }">
                  <span
                    class="badge bg-danger"
                    style="position: absolute; right: 0; top: 0"
                    v-if="item.ischeck"
                  >
                    {{ item.checkOrder }}</span
                  >
                  <img
                    :src="item.url"
                    alt=""
                    class="w-100"
                    style="height: 100px"
                    @click="choose(item)"
                  />
                  <div
                    class="w-100 text-white px-1"
                    style="
                      background: rgba(0, 0, 0, 0.5);
                      margin-top: -25px;
                      position: absolute;
                    "
                  >
                    <span class="small">{{ item.name }}</span>
                  </div>
                  <div class="p-2 text-center">
                    <el-button-group>
                      <el-button
                        class="p-2"
                        icon="el-icon-view"
                        size="mini"
                        @click="previewImage()"
                      ></el-button>
                      <el-button
                        class="p-2"
                        icon="el-icon-edit"
                        size="mini"
                        @click="editImage(item)"
                      ></el-button>
                      <el-button
                        class="p-2"
                        icon="el-icon-delete"
                        size="mini"
                        @click="delImage(index)"
                      ></el-button>
                    </el-button-group>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer class="d-flex align-items-center px-0 border-top">
        <div  style="width: 200px; flex-shrink: 0"
          class="
            h-100
            d-flex
            align-items-center
            justify-content-center
            border-end
          ">
          <el-button-group>
            <el-button  icon="el-icon-arrow-left" size="mini"
              >上一页</el-button
            >
            <el-button  size="mini"
              >下一页<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </el-button-group>
        </div>
        <div style="flex:1">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 修改|创建相册 -->
    <el-dialog :title="albumModelTitle" :visible.sync="albumModel">
      <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input
            v-model="albumForm.name"
            size="medium"
            placeholder="请输入相册名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="albumForm.order"
            :min="0"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <div class="text-center">
        <el-upload
          class="upload-demo w-100"
          drag
          action="/admin/image/upload"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- 预览图片 -->
    <el-dialog :visible.sync="previewModel" width="50vw">
      <div style="margin: -60px -20px -30px -20px">
        <img
          src="https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg"
          alt=""
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import albumItem from "@/components/image/album-item.vue";
export default {
  components: { albumItem },
  data() {
    return {
      searchForm: {
        order: "desc",
        keyword: "",
      },
      albums: [],
      albumIndex: 0,
      albumModel: false,
      albumEditIndex: -1,
      albumForm: {
        name: "",
        order: 0,
      },
      uploadModel: false,
      previewModel: false,
      imageList: [],
      // 选中的数组
      chooseList: [],
      currentPage: 1,
    };
  },
  computed: {
    albumModelTitle() {
      return this.albumEditIndex > -1 ? "修改相册" : "创建相册";
    },
  },
  created() {
    this.init();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 取消选中
    unChoose() {
      this.imageList.forEach((img) => {
        // 找到所有选中的图片
        let i = this.chooseList.findIndex((item) => {
          return item.id === img.id;
        });
        if (i > -1) {
          // 取消选中样式，选中排序归零
          img.ischeck = false;
          img.checkOrder = 0;
          // 从chooseList中移除
          this.chooseList.splice(i, 1);
        }
      });
    },
    // 选中图片
    choose(item) {
      // 选中
      if (!item.ischeck) {
        // 加入选中
        this.chooseList.push({ id: item.id, url: item.url });
        // 计算序号
        item.checkOrder = this.chooseList.length;
        // 修改状态
        item.ischeck = true;
        return;
      }
      // 取消选中
      // 找到在chooseList中的索引，
      let i = this.chooseList.findIndex((v) => v.id === item.id);
      if (i === -1) return;
      // 重新计算序号
      let length = this.chooseList.length;
      // 取消选中中间部分
      if (i + 1 < length) {
        // 重新计算imageList选中序号
        for (let j = i; j < length; j++) {
          let no = this.imageList.findIndex(
            (v) => v.id === this.chooseList[j].id
          );
          if (no > -1) {
            this.imageList[no].checkOrder--;
          }
        }
      }
      // 删除
      this.chooseList.splice(i, 1);
      // 修改状态
      item.ischeck = false;
      // 重置序号
      item.checkOrder = 0;
    },
    //删除照片
    delImage(obj) {
      this.$confirm(obj.all ? "是否删除选中照片" : "是否删除照片", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (obj.all) {
            let list = this.imageList.filter((img) => {
              return !this.chooseList.some((v) => img.id === v.id);
            });
            this.imageList = list;
            this.chooseList = [];
          } else {
            this.imageList.splice(obj.index, 1);
          }

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //   编辑图片
    editImage(item) {
      this.$prompt("请输入图片名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        inputValidator(val) {
          if (val === "") {
            return "图片名称不能为空";
          }
        },
      }).then(({ value }) => {
        item.name = value;
        this.$message({
          type: "success",
          message: "修改成功 ",
        });
      });
    },
    // 预览图片
    previewImage() {
      this.previewModel = true;
    },
    //   打开相册|编辑相册
    openAlbumModel(obj) {
      if (obj) {
        let { item, index } = obj;
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;

        return (this.albumModel = true);
      }
      this.albumForm = {
        name: "",
        order: 0,
      };
      this.albumEditIndex = -1;
      this.albumModel = true;
    },
    //确定修改或者创建操作
    confirmAlbumModel() {
      if (this.albumEditIndex > -1) {
        this.albumEdit();
        return (this.albumModel = false);
      }
    },
    //   编辑相册
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
    },
    //   删除相册
    albumDel(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.albums.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    albumChange(index) {
      this.albumIndex = index;
    },
    init() {
      for (var i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0,
        });
      }
      for (var i = 0; i < 30; i++) {
        this.imageList.push({
          id: i,
          url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
          name: "图片" + i,
          ischeck: false,
          checkOrder: 0,
        });
      }
    },
  },
};
</script>
<style>
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
