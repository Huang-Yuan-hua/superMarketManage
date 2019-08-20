<template>
  <div class="accountInfo">
    <el-dialog
      :title="accountInfo.title"
      :visible.sync="accountInfo.show"
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
        <el-form-item prop="name" label="名称">
          <el-input type="name" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="identity" label="身份">
          <el-select v-model="formData.identity">
            <el-option
              v-for="(formtype,index) in format_type_list"
              :key="index"
              :label="formtype"
              :value="formtype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="accountInfo.show=false">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "accountInfo",
  data() {
    return {
      format_type_list: ["管理员", "员工"],
      form_rules: {
        name: [{ required: true, message: "名称不能为空!", trigger: "blur" }]
      }
    };
  },
  props: {
    accountInfo: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .post(`/api/users/editAccount/${this.formData.id}`, this.formData)
            .then(res => {
              //修改成功
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              //隐藏accountInfo
              this.accountInfo.show = false;
              this.$emit("update");
            });
        }
      });
    }
  }
};
</script>


<style scoped>
</style>


