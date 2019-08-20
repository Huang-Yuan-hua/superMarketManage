<template>
  <div class="infoDialog">
    <el-dialog
      :title="infoDialog.title"
      :visible.sync="infoDialog.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="form_rules"
        label-width="120px"
        style="margin:10px;width:auto"
      >
        <el-form-item prop="name" label="姓名">
          <el-input type="name" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话">
          <el-input type="phoneNumber" v-model="formData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input type="email" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item prop="motto" label="签名">
          <textarea type="textarea" rows="3" cols="87" v-model="formData.motto"></textarea>
        </el-form-item>
        <el-form-item prop="avatar" label="头像">
          <div>
            <input type="file" name="file" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
          </div>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="infoDialog.show=false">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
// import Bus from "../../bus.js";
export default {
  name: "infoDialog",
  data() {
    return {
      imageUrl: "",
      newavatar: true,
      form_rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空！",
            trigger: "blur"
          },
          {
            min: 2,
            max: 16,
            message: "长度在2到16个字符之间!",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "电话号码为空！",
            trigger: "blur"
          },
          {
            min: 6,
            max: 11,
            message: "号码在6到11位之间!",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            message: "邮箱格式不正确！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  props: {
    infoDialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      // console.log(this.$store.getters.user.avatar);
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/infoEdit", {
              formData: this.formData,
              user_id: this.$store.getters.user.id,
              avatar: this.imageUrl
            })
            .then(res => {
              //修改成功
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              //隐藏infoDialog
              this.infoDialog.show = false;
              this.$emit("update");
            });
          this.$router.go(0);
          // Bus.$emit("new", this.flag);
        }
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt3M;
    },

    uploadAvatar(avatar) {
      // console.log(avatar.target.files[0]);
      let file = avatar.target.files[0];
      let data = new FormData();
      data.append("file", file, file.name); 
      data.append("data", 112);
      // console.log(data);
      // console.log(data.get("file"));
      return this.$axios
        .post("/api/users/file", data, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(res => {
          // console.log(res);
          this.imageUrl = res.data.imageUrl;
          // console.log(this.imageUrl);
        });
    }
  }
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


