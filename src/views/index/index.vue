<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card" shadow="hover">
          <div class="d-flex align-items-center">
            <i
              :class="[item.icon, item.color]"
              class="h4 mb-0 text-white text-center"
              style="
                height: 40px;
                width: 40px;
                line-height: 40px;
                margin-right: 40px;
              "
            ></i>
            <div>
              <h4 class="mb-1">{{ item.num }}</h4>
              <small>{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 订单、统计图 -->
    <el-row :gutter="20" class="my-3">
      <el-col
        :span="12"
        class="d-flex flex-column"
        style="height: 370px; justify-content: space-between"
      >
        <el-card class="box-card" v-for="(item, index) in tips" :key="index">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{
              item.desc
            }}</el-button>
          </div>
          <div class="row">
            <div
              :class="item.list.length | getcol"
              v-for="(item1, index1) in item.list"
              :key="index1"
            >
              <button class="btn btn-light w-100">
                <h4 class="mb-1">{{ item1.value }}</h4>
                <small>{{ item1.name }}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 统计图 -->
      <el-col :span="12">
        <el-card class="box-card" style="height: 370px">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div ref="mychart" style="width: 100%; height: 270px"></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 销售情况 -->
    <el-row :gutter="20" class="mt-2">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >按周期统计商家店铺的订单量和订单金额</el-button
            >
          </div>
          <div class="d-flex align-items-center border">
            <div class="border-end py-4 px-3 bg-light">
              <span> 昨日销量</span>
            </div>
            <div class="flex-grow-1">
              <div class="border-bottom ps-3 pb-1 mb-1">
                <span>订单金额(元) </span> 12
              </div>
              <div class="ps-3"><span>订单量(件) </span> 12</div>
            </div>
          </div>
          <div class="d-flex align-items-center border mt-3">
            <div class="py-4 px-3 bg-light border-end">
              <span> 上月销量</span>
            </div>
            <div class="flex-grow-1">
              <div class="border-end ps-3 pb-1 mb-1">
                <span>订单金额(元) </span> 12
              </div>
              <div class="ps-3"><span>订单量(件) </span> 12</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >按周期统计商家店铺的订单量和订单金额</el-button
            >
          </div>
          <el-table :data="tableData" height="160" border style="width: 100%">
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="name" label="商品信息" width="420">
            </el-table-column>
            <el-table-column prop="num" label="销量"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      counts: [
        {
          icon: " el-icon-user-solid",
          num: 30,
          desc: "关注人数（个）",
          color: "bg-primary",
        },
        {
          icon: " el-icon-s-order",
          num: 30,
          desc: "订单总数（笔）",
          color: "bg-sucess",
        },
        {
          icon: " el-icon-s-finance",
          num: 30,
          desc: "订单总金额（元）",
          color: "bg-warning",
        },
        {
          icon: " el-icon-s-data",
          num: 30,
          desc: "本月销量（元）",
          color: "bg-danger",
        },
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "待回复", value: "10" },
            { name: "库存预警", value: "0" },
            { name: "仓库中", value: "3" },
          ],
        },
        {
          title: "交易提示",
          desc: "需要立即处理的交易订单",
          list: [
            { name: "待付款", value: "0" },
            { name: "待发货", value: "10" },
            { name: "已发货", value: "0" },
            { name: "已收货", value: "3" },
            { name: "退款中", value: "3" },
            { name: "待售后", value: "3" },
          ],
        },
      ],
      tableData: [
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9",
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9",
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9",
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9",
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9",
        },
      ],
    };
  },
  filters: {
    getcol(total) {
      return `col-${12 / total}`;
    },
  },
  mounted() {
    this.drawline();
  },
  methods: {
    drawline() {
      var myChart = echarts.init(this.$refs.mychart);
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>
