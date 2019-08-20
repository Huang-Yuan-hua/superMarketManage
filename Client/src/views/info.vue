<template>
  <div class="info">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img
            v-if="userInfo.avatar"
            :src="require(`../assets/avatar/${userInfo.avatar}`)"
            class="avatar"
          >
          <!-- <img :src="'data:image/png;base64,'+userInfo.avatar" class="avatar"> -->
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
              <el-button
                style="float: right"
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="handleEdit()"
              >修改信息</el-button>
            </div>
            <div class="useritem">
              <i class="fa fa-user"></i>&nbsp
              <span>姓名：{{userInfo.name}}</span>
            </div>
            <div class="useritem">
              <i class="fa fa-user-md"></i>&nbsp
              <span>职位: &nbsp{{userInfo.identity === '管理员' ? '管理员' : '员工'}}</span>
            </div>
            <div class="useritem">
              <i class="fa fa-phone"></i>&nbsp
              <span>电话：{{userInfo.phoneNumber}}</span>
            </div>
            <div class="useritem">
              <i class="fa fa-envelope"></i>&nbsp
              <span>邮箱：{{userInfo.email}}</span>
            </div>
            <div class="useritem">
              <i class="fa fa-pencil"></i>&nbsp
              <span>签名：{{userInfo.motto}}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <InfoDialog :infoDialog="infoDialog" :formData="formData" @update="getUserInfo"></InfoDialog>
  </div>
</template>

<script>
import InfoDialog from "../components/infoDialog";
export default {
  name: "info",
  data() {
    return {
      userInfo: [],
      formData: {
        name: "",
        identity: "",
        phoneNumber: "",
        email: "",
        motto: "",
        avatar: ""
      },
      infoDialog: {
        show: false,
        title: ""
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
    },
    handleEdit() {
      // console.log(this.userInfo);
      this.infoDialog = {
        show: true,
        title: "个人信息修改"
      };
      this.formData = {
        name: this.userInfo.name,
        identity: this.userInfo.identity,
        phoneNumber:String(this.userInfo.phoneNumber),
        email: this.userInfo.email,
        motto: this.userInfo.motto,
        avatar: this.userInfo.avatar
      };
    }
  },
  components: {
    InfoDialog
  }
};
</script>


<style scoped>
.info {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
  left: 20%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.useritem {
  position: relative;
  top: 30%;
  padding: 20px;
  font-size: 20px;
  color: #333;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  position: absolute;
  width: 500px;
  height: 500px;
  left: 50%;
  top: 10%;
  box-shadow: 0 28px 16px -26px black;
  transition: all 0.6s ease-in-out;
}
.box-card:hover {
  transform: scale(1.1);
  box-shadow: 0 58px 36px -56px black;
}
</style>


