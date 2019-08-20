<template>
  <div class="staffManage">
    <div class="header">
      <h4 class="title">
        <p>
          商品销售情况
          <span class="small_title">GoodsSell</span>
        </p>
      </h4>
    </div>
    <div class="container">
      <el-tabs type="border-card">
        <el-tab-pane label="统计图表">
          <chartComponent></chartComponent>
        </el-tab-pane>
        <el-tab-pane label="详细数据">
          <tableComponent></tableComponent>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import chartComponent from "../components/goodsSell/chartComponent";
import tableComponent from "../components/goodsSell/tableComponent";
export default {
  name: "goodsSell",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {},
  components: {
    chartComponent,
    tableComponent
  }
};
</script>


<style scoped>
.staffManage {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.container {
  width: 95%;
  margin-left: 30px;
}
.header {
  width: 95%;
  margin: 20px 30px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #2b6ab8;
}
.title {
  padding-left: 12px;
  margin: 0;
  color: #2b6ab8;
  font-size: 22px;
  font-weight: normal;
  border-left: solid 5px #2b6ab8;
  display: flex;
  justify-content: space-between;
}
.title p {
  margin-top: 5px;
}
.small_title {
  margin-left: 8px;
  font-size: 13px;
}
</style>


