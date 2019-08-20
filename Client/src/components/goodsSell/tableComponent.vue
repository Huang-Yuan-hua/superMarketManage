<template>
  <div class="tableComponent">
    <el-tabs tab-position="left">
      <el-tab-pane label="饮料酒水">
        <div class="table">
          <my-table :col="col" :data="tableData1"></my-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="休闲食品">
        <div class="table">
          <my-table :col="col" :data="tableData2"></my-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="粮油调料">
        <div class="table">
          <my-table :col="col" :data="tableData3"></my-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="床上用品">
        <div class="table">
          <my-table :col="col" :data="tableData4"></my-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyTable from "./myTable";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "chartComponent",
  data() {
    return {
      col: [],
      data: [],
      allTableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getMeters();
    this.getSellDatas();
  },
  props: {
    tableComponent: Object
  },
  components: {
    MyTable
  },
  methods: {
    getMeters() {
      this.col = [{ label: "商品名称", prop: "name" }];
      //获取表头数据
      this.$axios
        .get("/api/goodsManage/goodsSell/getMeters")
        .then(res => {
          // console.log(res.data[0]);
          var monthArray = res.data[0].label.split(",");
          if (monthArray && monthArray.length > 0) {
            for (var i in monthArray) {
              var menu = {
                label: monthArray[i],
                children: [
                  {
                    label: res.data[0].sellNumber[i],
                    prop: res.data[0].theNumber[i]
                  },
                  {
                    label: res.data[0].sellMoney[i],
                    prop: res.data[0].theMoney[i]
                  }
                ]
              };
              this.col.push(menu);
            }
            // console.log(this.col);
          }
        })
        .catch(err => console.log(err));
    },
    //获取表格数据
    getSellDatas() {
      this.$axios
        .get("/api/goodsManage/goodsSell/getSellDatas")
        .then(res => {
          // console.log(res.data[0].dataA);
          if (res.data[0].dataA.length > 0) {
            for (var i = 0; i < 4; i++) {
              this.tableData1.push(res.data[0].dataA[i].goods);
              this.tableData2.push(res.data[0].dataB[i].goods);
              this.tableData3.push(res.data[0].dataC[i].goods);
              this.tableData4.push(res.data[0].dataD[i].goods);
            }
          }
          // console.log(this.tableData1);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.table {
  margin-left: 30px;
}
</style>

