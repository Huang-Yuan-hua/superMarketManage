<template>
  <div class="announceDialog">
    <el-dialog
      :title="announceDialog.title"
      :visible.sync="announceDialog.show"
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
        <el-form-item prop="title" label="标题">
          <el-input type="title" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item prop="tooltip" label="概述">
          <el-input type="tooltip" v-model="formData.tooltip"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <quill-editor :options="editorOption" type="textarea" rows="6" v-model="formData.content"></quill-editor>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="announceDialog.show=false">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "announceDialog",
  data() {
    return {
      form_rules: {
        title: [{ required: true, message: "标题不能为空!", trigger: "blur" }],
        tooltip: [
          { required: true, message: "描述不能为空!", trigger: "blur" }
        ],
        content: [{ required: true, message: "内容不能为空!", trigger: "blur" }]
      },
      editorOption: {
					placeholder: '请输入公告内容',
					theme: 'snow',
					modules: {}
				}
    };
  },
  props: {
    announceDialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const url =
            this.announceDialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          this.$axios.post(`/api/announces/${url}`, this.formData).then(res => {
            //添加成功
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            //隐藏announceDialog
            this.announceDialog.show = false;
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


