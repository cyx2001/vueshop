<template>
  <div class="card mb-3" style="line-height: 1.2">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input
        size="mini"
        style="width: 200px"
        :value="item.name"
        @input="vModel('name', index, $event)"
      >
        <el-button
          slot="append"
          icon="el-icon-more"
          @click="chooseSkus"
        ></el-button>
      </el-input>
      <el-radio-group
        size="mini"
        :value="item.type"
        @input="vModel('type', index, $event)"
        style="margin-bottom: -10px"
        class="ml-2"
      >
        <el-radio :label="0">无</el-radio>
        <el-radio :label="1">颜色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
      <!-- 上移 -->
      <el-button
        size="mini"
        class="ml-auto"
        :disabled="index === 0"
        icon="el-icon-top"
        @click="sortCard('moveUp', index)"
      ></el-button>
      <!-- 下移 -->
      <el-button
        size="mini"
        :disabled="total === index + 1"
        icon="el-icon-bottom"
        @click="sortCard('moveDown', index)"
      ></el-button>
      <!-- 删除 -->
      <el-button size="mini" @click="delSkuCard" type="text">删除</el-button>
    </div>
    <div class="card-body">
      <!-- 规格属性列表 -->
      <div class="d-flex align-items-center flex-wrap">
        <sku-card-children
          :type="item.type"
          v-for="(item2, index2) in list"
          :key="index2"
          :item="item2"
          :index="index2"
          :cardIndex="index"
          v-dragging="{
            item: item2,
            list: list,
            group: `skuItem${index}`,
          }"
        ></sku-card-children>
      </div>
      <!-- 增加规格属性 -->
      <div class="mt-2">
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addSkuValue(index)"
        >
          增加规格值
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import skuCardChildren from "./sku-card-children.vue";
export default {
  inject: ["app"],
  props: {
    item: Object,
    index: Number,
    total: Number,
  },
  components: {
    skuCardChildren,
  },
  data() {
    return {
      list: this.item.list,
    };
  },
  computed: {
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
    }),
  },
  mounted() {
    this.$watch('item.list',(newValue,oldValue)=>{
      this.list=newValue;
    }),
    this.$dragging.$on("dragend", (e) => {
      if (e.group === "skuItem" + this.index) {
        this.sortSkuValue({
          index: this.index,
          value: this.list,
        });
        console.log(this.list);
      }
    });
  },
  methods: {
    ...mapMutations([
      "addSkuValue",
      "delSkuCard",
      "vModelSkuCard",
      "sortSkuCard",
      "sortSkuValue",
    ]),
    vModel(key, index, value) {
      this.vModelSkuCard({ key, index, value });
    },
    sortCard(action, index) {
      this.sortSkuCard({ action, index });
    },
    chooseSkus() {
      this.app.chooseSkus((res) => {
       this.vModel("name", this.index, res.name);
        this.vModel("type", this.index, res.type);
        this.vModel('list',this.index,res.list)
        this.list = res.list
        // res.list.forEach((item) => {
        //   this.addSkuValueEvent(item.name);
        // });
      });
    },
  },
};
</script>

<style>
</style>