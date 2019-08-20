<template>
  <div class="fundList">
    <div class="header">
      <h4 class="title">
        <p>
          收支管理
          <span class="small_title">FundManage</span>
        </p>
      </h4>

      <div class="search_add">
        <el-form :inline="true" ref="add_data" :model="search_data">
          <!-- 按时间筛选 -->
          <el-form-item label="按时间筛选">
            <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
            <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch()">筛选</el-button>
          </el-form-item>
          <el-form-item class="btnRight">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              @click="handleAdd()"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tableContainer">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 92%"
      >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="150" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="110" align="center"></el-table-column>
        <el-table-column prop="describe" label="收支描述" width="156" align="center"></el-table-column>
        <el-table-column prop="income" label="收入" width="90" align="center">
          <template slot-scope="scope">
            <span style="color:green">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="90" align="center">
          <template slot-scope="scope">
            <span style="color:red">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" width="100" align="center">
          <template slot-scope="scope">
            <span style="color:blue">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="user.identity == '管理员'"
            >删除</el-button>
            <!-- <el-button
              size="small"
              type="info"
              icon="el-icon-edit-outline"
              @click="handleRecord(scope.$index, scope.row)"
              v-if="user.identity == '管理员'"
            >修改记录</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <fundDialog :fundDialog="fundDialog" :formData="formData" @update="getProfile"></fundDialog>
  </div>
</template>

<script>
import fundDialog from "../components/fundDialog";
export default {
  name: "fundList",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: ""
      },
      filterTableData: [],
      paginations: {
        page_index: 1, //当前页数
        total: 0, //总数
        page_size: 5, //当前一页显示条数
        page_sizes: [5, 10, 15, 20], //可设置每页显示条数
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      fundDialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/funds")
        .then(res => {
          this.allTableData = res.data;
          this.filterTableData = res.data;
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      //获取点前页
      let index = this.paginations.page_size * (page - 1);
      //数据总数
      let nums = this.paginations.page_size * page;
      //容器
      let tables = [];
      //遍历
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleAdd() {
      this.fundDialog = {
        show: true,
        title: "添加收支记录",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
      this.fundDialog.show = true;
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/funds/delete/${row._id}`).then(res => {
        this.$message({ message: res.data.msg, type: "success" });
        this.getProfile();
      });
    },
    handleEdit(index, row) {
      this.fundDialog = {
        show: true,
        title: "修改收支记录",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleRecord(index, row) {},
    handleSearch() {
      //筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间！"
        });
        this.getProfile();
        return;
      }
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();

      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });

      //调用分页数据方法
      this.setPaginations();
    }
  },
  components: {
    fundDialog
  }
};
</script>


<style scoped>
.fundList {
  width: 100%;
  height: 100%;
  padding: 16px;
  margin: 10px 0 0 60px;
  box-sizing: border-box;
}
.header {
  width: 92%;
  margin-top: 20px;
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
.search_add {
  float: right;
  margin-top: -35px;
}
.btnRight {
  float: right;
  padding-right: 20px;
}
.pagination {
  text-align: right;
  margin-top: 10px;
  padding-right: 80px;
}
</style>


