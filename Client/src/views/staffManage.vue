<template>
  <div class="staffManage">
    <div class="header">
      <h4 class="title">
        <p>
          账号管理
          <span class="small_title">Account</span>
        </p>
        <template>
          <div>
            <!-- 注意：el-button需要放在template中 -->
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              @click="handleAdd()"
            >添加账号</el-button>
          </div>
        </template>
      </h4>
    </div>
    <div class="tableContainer">
      <el-table v-if="users.length>0" :data="users" max-height="450" border style="width: 94%">
        <el-table-column prop="date" label="创建时间" width="240" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column type="index" label="工号" width="220" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" width="220" align="center"></el-table-column>
        <el-table-column prop="identity" label="身份" width="220" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作" width="304" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="warning"
              icon="el-icon-refresh"
              @click="resetPassword(scope.$index, scope.row)"
            >密码重置</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <accountInfo :accountInfo="accountInfo" :formData="formData" @update="getUsers"></accountInfo>
  </div>
</template>

<script>
import accountInfo from "../components/accountInfo";
export default {
  name: "staffManage",
  data() {
    return {
      users: [],
      accountInfo: {
        show: false,
        title: ""
      },
      formData: {
        name: "",
        identity: "",
        id: ""
      },
      usersData: {
        num: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      //获取账号信息
      this.$axios
        .get("/api/users/getUsers")
        .then(res => {
          // console.log(res.data);
          this.users = res.data;
          this.usersData.num = this.users.length + 1;
        })
        .catch(err => console.log(err));
    },
    //添加账号
    handleAdd() {
      this.$axios
        .post("/api/users/addAccount", this.usersData)
        .then(res => {
          this.getUsers();
        })
        .catch(err => console.log(err));
    },
    //重置密码
    resetPassword(index, row) {
      this.$axios.post(`/api/users/resetPassword/${row._id}`).then(res => {
        this.$message("密码重置成功！");
        this.getUsers();
      });
    },
    //删除账号
    handleDelete(index, row) {
      this.$axios.delete(`/api/users/deleteAccount/${row._id}`).then(res => {
        this.$message("账号删除成功！");
        this.getUsers();
      });
    },
    //编辑账号
    handleEdit(index, row) {
      this.accountInfo = {
        show: true,
        title: "编辑账号"
      };
      this.formData = {
        name: row.name,
        identity: row.identity,
        id: row._id
      };
    }
  },
  components: {
    accountInfo
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
</style>


