<template>
  <div class="stockDialog">
    <el-dialog
      :title="stockDialog.title"
      :visible.sync="stockDialog.show"
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
        <el-form-item label="商品类型">
          <el-select v-model="formData.type" placeholder="商品类型">
            <el-option
              v-for="(formtype,index) in format_type_list"
              :key="index"
              :label="formtype"
              :value="formtype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="商品名称">
          <el-input type="name" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="amount" label="现存数量">
          <el-input type="amount" v-model="formData.amount"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="商品单价">
          <el-input type="price" v-model="formData.price"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="total" label="库存总额">
          <el-input type="total" v-model="formData.total"></el-input>
        </el-form-item>-->
        <el-form-item prop="place" label="存放地点">
          <el-input type="place" v-model="formData.place"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="stockDialog.show=false">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "stockDialog",
  data() {
    return {
      format_type_list: ["饮料酒水", "休闲食品", "粮油调料", "床上用品"],
      form_rules: {
        name: [
          { required: true, message: "商品名称不能为空!", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "商品数量不能为空!", trigger: "blur" }
        ],
        price: [
          { required: true, message: "商品单价不能为空!", trigger: "blur" }
        ],
        place: [
          { required: true, message: "存放地点不能为空!", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    stockDialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const url =
            this.stockDialog.option == "add"
              ? "addStockDatas"
              : `edit/${this.formData.id}`;
          this.$axios
            .post(`api/goodsManage/goodsStock/${url}`, this.formData)
            .then(res => {
              // console.log(this.formData);
              //添加成功
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              //stockDialog
              this.stockDialog.show = false;
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


