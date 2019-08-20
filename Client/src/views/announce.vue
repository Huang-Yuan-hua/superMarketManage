<template>
  <div class="announce">
    <div class="header">
      <h4 class="title">
        <p>
          通知公告
          <span class="small_title">Notice</span>
        </p>
        <div class="searchContainer">
          <div class="search_input">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @keyup.enter.native="handleSearch()"/>
          </div>
          <div class="search_btn">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="handleSearch()"
            >搜索</el-button>
          </div>
        </div>
        <template>
          <div>
            <!-- 注意：el-button需要放在template中 -->
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              @click="handleAdd()"
              v-if="user.identity == '管理员'"
            >添加公告</el-button>
          </div>
        </template>
      </h4>
    </div>
    <div class="tableContainer">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%"
      >
        <el-table-column prop="title" label="通知" width="800">
          <template slot-scope="scope">
            <i class="el-icon-info"></i>
            <el-popover placement="right" width="400" trigger="hover">
              <span>{{scope.row.tooltip}}</span>
              <span
                class="notice_title"
                style="margin-left: 10px"
                slot="reference"
                @click="checkNoticeInfo(scope.$index, scope.row)"
              >{{ scope.row.title}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="203" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date | dateFormat}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="operation"
          label="操作"
          width="240"
          align="center"
          v-if="user.identity == '员工'"
        >
          <template slot-scope="scope">
            <el-badge :value="scope.row.thumbs" class="thumbs_item">
              <el-button
                size="small"
                type="warning"
                class="fa fa-thumbs-o-up"
                @click="handleThumbsUp(scope.$index, scope.row)"
              >&nbsp&nbsp点个赞</el-button>
            </el-badge>
          </template>
        </el-table-column>

        <el-table-column
          prop="operation"
          label="操作"
          width="240"
          align="center"
          v-if="user.identity == '管理员'"
        >
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
    <AnnounceDialog :announceDialog="announceDialog" :formData="formData" @update="getAnnounce"></AnnounceDialog>
    <NoticeInfo :noticeInfo="noticeInfo" @update="getAnnounce"></NoticeInfo>
  </div>
</template>

<script>
import AnnounceDialog from "../components/announceDialog";
import NoticeInfo from "../components/noticeInfo";
export default {
  name: "announce",
  data() {
    return {
      search: "",
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
      announceDialog: {
        show: false,
        title: "",
        option: "edit"
      },
      noticeInfo: {
        show: false,
        title: "",
        content: "",
        date: ""
      },
      formData: {
        title: "",
        tooltip: "",
        content: "",
        id: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getAnnounce();
  },
  methods: {
    getAnnounce() {
      //获取通告列表数据
      this.$axios
        .get("/api/announces")
        .then(res => {
          this.allTableData = res.data;
          // console.log(this.allTableData);
          this.filterTableData = res.data;
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
      // console.log(this.$store.getters.user.id)
    },

    handleSearch() {
      //筛选
      if (!this.search) {
        this.$message({
          type: "warning",
          message: "请输入关键字！"
        });
        this.getAnnounce();
        return;
      }
      // const keyWord = String.valueOf(this.search);
      const keyWord = this.search;
      this.allTableData = this.filterTableData.filter(item => {
        // console.log(item);
        return Object.keys(item).some(key => {
          // console.log(key);
          return (
            String(item[key])
              .toLowerCase()
              .indexOf(keyWord) > -1
          );
        });
      });

      //调用分页数据方法
      this.setPaginations();
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

    handleAdd() {
      this.announceDialog = {
        show: true,
        title: "添加公告",
        option: "add"
      };
      this.formData = {
        title: "",
        tooltip: "",
        content: "",
        remark: "",
        id: ""
      };
      this.announceDialog.show = true;
    },

    handleDelete(index, row) {
      this.$axios.delete(`/api/announces/delete/${row._id}`).then(res => {
        this.$message("删除成功！");
        this.getAnnounce();
      });
    },

    handleEdit(index, row) {
      this.announceDialog = {
        show: true,
        title: "编辑公告",
        option: "edit"
      };
      this.formData = {
        title: row.title,
        tooltip: row.tooltip,
        content: row.content,
        remark: row.remark,
        id: row._id
      };
    },

    handleThumbsUp(index, row) {
      // console.log(index);
      // console.log(row);
      row.thumbs++;
      this.$axios
        .post(`/api/announces/thumbsup/${row._id}`, {
          thumbs: row.thumbs
          // user_id: this.$store.getters.user.id
        })
        .then(res => {
          // console.log(res);
        });
      // console.log(res.data.status);
    },

    checkNoticeInfo(index, row) {
      this.noticeInfo = {
        show: true,
        title: row.title,
        content: row.content,
        date: row.date,
        id: row._id
      };
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
    }
  },
  components: {
    AnnounceDialog,
    NoticeInfo
  }
};
</script>

<style scoped>
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
.searchContainer {
  width: 260px;
  height: 20px;
  margin: 2px -620px 0 0;
  display: flex;
  justify-content: space-between;
}
.search_input {
  width: 200px;
}
.search_btn {
  width: 50px;
}
.tableContainer {
  width: 90%;
  margin: 20px 50px;
}
.notice_title {
  cursor: pointer;
}
.thumbs_item {
  margin-top: 10px;
}
.pagination {
  text-align: right;
  margin-top: 10px;
  padding-right: 80px;
}
</style>
