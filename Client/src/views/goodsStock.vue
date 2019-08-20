<template>
  <div class="staffManage">
    <div class="header">
      <h4 class="title">
        <p>
          商品库存
          <span class="small_title">GoodsStock</span>
        </p>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="handleAdd()"
        >添加库存</el-button>
      </h4>
    </div>
    <div class="tableContainer">
      <el-tabs v-model="activeName" @tab-click="changeDataTo">
        <el-tab-pane label="全部" name="A"></el-tab-pane>
        <el-tab-pane label="饮料酒水" name="B"></el-tab-pane>
        <el-tab-pane label="休闲食品" name="C"></el-tab-pane>
        <el-tab-pane label="粮油调料" name="D"></el-tab-pane>
        <el-tab-pane label="床上用品" name="E"></el-tab-pane>
      </el-tabs>

      <el-table
        border
        :row-class-name="tableRowClassName"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <!-- <el-table-column label="商品编号" prop="code" width="108" align="center">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>-->
        <el-table-column label="商品名称" prop="name" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="入库日期" prop="date" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.date | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="现存数量/件" prop="amount" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.amount }}</template>
        </el-table-column>
        <el-table-column label="商品单价/元" prop="price" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="库存总额/元" prop="total" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.price*scope.row.amount }}</template>
        </el-table-column>
        <el-table-column label="存放地点" prop="place" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.place }}</template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="166" align="center">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>

        <el-table-column prop="operation" label="操作" width="260" align="center">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
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
    <stockDialog :stockDialog="stockDialog" :formData="formData" @update="getStockData"></stockDialog>
  </div>
</template>

<script>
import stockDialog from "../components/stockDialog";
export default {
  name: "goodsStock",
  data() {
    return {
      activeName: "A",
      search: "",
      tableData: [],
      dataA: [],
      dataB: [],
      dataC: [],
      dataD: [],
      dataE: [],
      stockDialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        type: "",
        name: "",
        amount: "",
        price: "",
        total: "",
        place: "",
        remark: "",
        id: ""
      },
      paginations: {
        page_index: 1, //当前页数
        total: 0, //总数
        page_size: 5, //当前一页显示条数
        page_sizes: [5, 10, 15, 20], //可设置每页显示条数
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      }
    };
  },
  components: {
    stockDialog
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getStockData();
  },
  methods: {
    getStockData() {
      //获取库存表格数据
      this.$axios
        .get("/api/goodsManage/goodsStock/getStockDatas")
        .then(res => {
          // console.log(res.data);
          this.dataA = res.data;
          this.tableData = this.dataA;
          for (var i in res.data) {
            if (res.data[i].type === "饮料酒水") {
              this.dataB.push(res.data[i]);
            } else if (res.data[i].type === "休闲食品") {
              this.dataC.push(res.data[i]);
            } else if (res.data[i].type === "粮油调料") {
              this.dataD.push(res.data[i]);
            } else {
              this.dataE.push(res.data[i]);
            }
          }
          // console.log(this.dataB, this.dataC, this.dataD, this.dataE);
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //分页属性设置
      this.paginations.total = this.dataA.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认分页数据
      this.tableData = this.dataA.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.dataA.filter((item, index) => {
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
        if (this.dataA[i]) {
          tables.push(this.dataA[i]);
        }
        this.tableData = tables;
      }
    },
    //改变表格数据
    changeDataTo(tab) {
      // console.log(tab.name);
      this.tableData = this["data" + tab.name];
    },
    handleAdd() {
      this.stockDialog = {
        show: true,
        title: "添加库存",
        option: "add"
      };
      this.formData = {
        type: "",
        name: "",
        amount: "",
        price: "",
        total: "",
        place: "",
        remark: "",
        id: ""
      };
      this.stockDialog.show = true;
    },
    handleEdit(index, row) {
      this.stockDialog = {
        show: true,
        title: "修改库存",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        name: row.name,
        amount: row.amount,
        price: row.price,
        total: row.total,
        place: row.place,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/goodsManage/goodsStock/delete/${row._id}`)
        .then(res => {
          this.$message("删除成功！");
          this.getStockData();
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>


<style scoped>
.staffManage {
  width: 100%;
  height: 100%;
  padding: 26px;
  box-sizing: border-box;
}
.tableContainer {
  width: 90%;
  margin-left: 49px;
}
.header {
  width: 90%;
  margin: 20px 50px;
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
.pagination {
  text-align: right;
  margin-top: 10px;
  padding-right: 80px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>


