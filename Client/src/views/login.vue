<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">超市收支管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="loginUser.name" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="submitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        name: "",
        passwrod: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "账号不能为空！",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "长度在6到16位之间！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            // console.log(res.data);
            if (res.data.code === 0) {
              this.$message({ message: res.data.msg, type: "success" });
            } else {
              this.$message({ message: res.data.msg, type: "error" });
            }

            //token
            const { token, identity } = res.data;
            //存储到localStorage
            localStorage.setItem("eleToken", token);
            localStorage.setItem("identity", identity);
            //解析Token
            const decoded = jwt_decode(token);
            //将token存储到vuex中
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);

            this.$router.push("/index");
          });
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bgp_1.png) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 410px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


