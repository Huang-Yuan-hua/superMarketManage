<template>
  <div class="chartComponent">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="changeDataTo">
      <el-tab-pane label="饮料酒水" name="A"></el-tab-pane>
      <el-tab-pane label="休闲食品" name="B"></el-tab-pane>
      <el-tab-pane label="粮油调料" name="C"></el-tab-pane>
      <el-tab-pane label="床上用品" name="D"></el-tab-pane>
      <div id="chart"></div>
    </el-tabs>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框、title和legend组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "chartComponent",
  data() {
    return {
      activeName: "A",
      goodsName: [],
      sellNumber: [],
      goodsNameA: [],
      goodsNameB: [],
      goodsNameC: [],
      goodsNameD: [],
      sellNumberA: [],
      sellNumberB: [],
      sellNumberC: [],
      sellNumberD: [],
      labelOption: {
        normal: {
          show: true,
          position: "insideBottom",
          distance: 4,
          align: "left",
          verticalAlign: "middle",
          rotate: 90,
          formatter: "{c}  {name|{a}}",
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        }
      }
    };
  },
  props: {
    chartComponent: Object
  },
  mounted() {
    this.getSellDatas();
  },
  methods: {
    getSellDatas() {
      this.$axios
        .get("/api/goodsManage/goodsSell/getSellDatas")
        .then(res => {
          // console.log(res.data[0].dataA);
          //取商品的名称
          if (res.data[0].dataA.length > 0) {
            for (var i = 0; i < 4; i++) {
              this.goodsNameA.push(res.data[0].dataA[i].goods.name);
              this.goodsNameB.push(res.data[0].dataB[i].goods.name);
              this.goodsNameC.push(res.data[0].dataC[i].goods.name);
              this.goodsNameD.push(res.data[0].dataD[i].goods.name);
            }
          }
          // console.log(this.goodsNameA);
          //取各类商品的销售数量
          this.$options.methods.getSellNumber.bind(this)(
            res.data[0].dataA,
            this.sellNumberA
          );
          this.$options.methods.getSellNumber.bind(this)(
            res.data[0].dataB,
            this.sellNumberB
          );
          this.$options.methods.getSellNumber.bind(this)(
            res.data[0].dataC,
            this.sellNumberC
          );
          this.$options.methods.getSellNumber.bind(this)(
            res.data[0].dataD,
            this.sellNumberD
          );
          // console.log(this.sellNumberA);
          this.goodsName = this.goodsNameA;
          this.sellNumber = this.sellNumberA;
          this.drawLine();
        })
        .catch(err => console.log(err));
    },
    //封装取销售数量的方法
    getSellNumber(dataX, numberX) {
      if (dataX.length > 0) {
        let newArry = [];
        let index = 0;
        for (var i in dataX) {
          for (var j = 1; j <= 5; j++) {
            newArry.push(dataX[i].goods["number" + j]);
          }
        }
        while (index < newArry.length) {
          numberX.push(newArry.slice(index, (index += 5)));
        }
      }
    },
    //绘制统计图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("chart"));
      // console.log(goodsNameA);
      // 绘制图表
      var echartsJson = {
        color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          type: "scroll",
          data: this.goodsName
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            name: "月份",
            type: "category",
            axisTick: { show: false },
            data: ["一月", "二月", "三月", "四月", "五月"]
          }
        ],
        yAxis: [
          {
            name: "销售量/件",
            type: "value"
          }
        ],
        series: []
      };
      for (var i in this.goodsName) {
        echartsJson.series.push({
          name: this.goodsName[i],
          type: "bar",
          barGap: 0,
          label: this.labelOption,
          data: this.sellNumber[i]
        });
      }
      myChart.setOption(echartsJson);
    },
    //改变统计图数据
    changeDataTo(tab) {
      // console.log(tab.name);
      this.goodsName = this["goodsName" + tab.name];
      this.sellNumber = this["sellNumber" + tab.name];
      // console.log(this.sellNumber)
      // console.log(this.goodsName);
      this.drawLine();
    }
  }
};
</script>

<style scoped>
#chart {
  width: 1150px;
  height: 520px;
  margin-left: -60px;
}
</style>

