<template>
  <div class="changePwdDialog">
    <el-dialog
      :title="changePwdDialog.title"
      :visible.sync="changePwdDialog.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <el-form
        :model="formData"
        status-icon
        :rules="rules"
        ref="formData"
        label-width="100px"
        class="demo-formData"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="formData.oldPass" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="formData.pass"
            placeholder="请输入新密码"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="formData.checkPass"
            placeholder="请再次输入密码"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')">提交</el-button>
          <el-button @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
export default {
  name: "changePwdDialog",
  data() {
    var validatorOldPass = (rule, value, callback) => {
      if (md5(value) !== this.formData.theOldPass) {
        callback(new Error("旧密码错误！请重新输入"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        oldPass: [
          {
            required: true,
            message: "旧密码不能为空！",
            trigger: "blur"
          },
          {
            validator: validatorOldPass,
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "新密码不能为空！",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "长度在6到16位之间！",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "确认密码不能为空！",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    changePwdDialog: Object,
    formData: Object
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/changePassword", this.formData)
            .then(res => {
              //修改成功
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              //隐藏changePwdDialog
              this.changePwdDialog.show = false;
              this.$emit("update");
              //清除token
              localStorage.removeItem("eleToken");
              //设置vuex store
              this.$store.dispatch("clearCurrentState");
              //跳转
              this.$router.push("/login");
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped>
</style>


