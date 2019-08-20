<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt>
        <span class="title">超市收支管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img
            v-if="userInfo.avatar"
            :src="require(`../assets/avatar/${userInfo.avatar}`)"
            class="avatar"
          >
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
    <changePwdDialog :changePwdDialog="changePwdDialog" :formData="formData" @update="getUserInfo"></changePwdDialog>
  </header>
</template>

<script>
import changePwdDialog from "../components/changePwdDialog";
// 引入公共的bug，来做为中间传达的工具
// import Bus from "../../bus.js";
export default {
  name: "head-nav",
  data() {
    return {
      userInfo: [],
      changePwdDialog: {
        show: false,
        title: ""
      },
      formData: {
        theOldPass: "",
        oldPass: "",
        pass: "",
        checkPass: "",
        _id: ""
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    changePwdDialog
  },
  methods: {
    getUserInfo() {
      //获取用户数据
      this.$axios
        .get(`/api/users/getUserInfo/${this.$store.getters.user.id}`)
        .then(res => {
          // console.log(res.data);
          this.userInfo = res.data;
        })
        .catch(err => console.log(err));
      // console.log(this.userInfo);
    },

    setInfo(cmdItem) {
      switch (cmdItem) {
        case "info":
          this.showInfo();
          break;
        case "changePwd":
          this.changePwd();
          break;
        case "logout":
          this.logout();
          break;
        default:
          break;
      }
    },
    showInfo() {
      this.$router.push("/info");
    },
    changePwd() {
      this.changePwdDialog = {
        show: true,
        title: "修改密码"
      };
      this.formData = {
        theOldPass: this.userInfo.password,
        oldPass: String(this.formData.oldPass),
        _id: this.$store.getters.user.id
      };
    },
    logout() {
      //清除token
      localStorage.removeItem("eleToken");
      //设置vuex store
      this.$store.dispatch("clearCurrentState");
      //跳转
      this.$router.push("/login");
    }
  }
};
</script>


<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #426388;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 20px;
  font-weight: normal;
  letter-spacing: 4px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>


