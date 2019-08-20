<template>
  <div class="fundDialog">
    <el-dialog
      :title="fundDialog.title"
      :visible.sync="fundDialog.show"
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
        <el-form-item label="收支类型">
          <el-select v-model="formData.type" placeholder="收支类型">
            <el-option
              v-for="(formtype,index) in format_type_list"
              :key="index"
              :label="formtype"
              :value="formtype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="describe" label="收支描述">
          <el-input type="describe" v-model="formData.describe"></el-input>
        </el-form-item>
        <el-form-item prop="income" label="收入">
          <el-input type="income" v-model="formData.income"></el-input>
        </el-form-item>
        <el-form-item prop="expend" label="支出">
          <el-input type="expend" v-model="formData.expend"></el-input>
        </el-form-item>
        <el-form-item prop="cash" label="账户现金">
          <el-input type="cash" v-model="formData.cash"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item prop="a" label="备注">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="fundDialog.show=false">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "fundDialog",
  data() {
    return {
      format_type_list: ["进货", "缴费", "出货", "收费"],
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空!", trigger: "blur" }
        ],
        income: [{ required: true, message: "收入不能为空!", trigger: "blur" }],
        expend: [{ required: true, message: "支出不能为空!", trigger: "blur" }],
        cash: [
          { required: true, message: "账户现金不能为空!", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    fundDialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const url =
            this.fundDialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          this.$axios.post(`/api/funds/${url}`, this.formData).then(res => {
            // console.log(res)
            //添加/修改成功
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            //fundDialog
            this.fundDialog.show = false;
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


