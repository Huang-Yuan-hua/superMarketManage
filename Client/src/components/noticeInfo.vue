<template>
  <div class="noticeInfo">
    <el-dialog
      :title="noticeInfo.title"
      :visible.sync="noticeInfo.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="50%"
      center
    >
      <div class="noticeInfo_container">
        <div class="content" v-html="noticeInfo.content"></div>
        <br>
        <br>
        <br>
        <!-- 这里使用这两种方法绑定数据均可 -->
        <span class="date">{{noticeInfo.date|dateFormat}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="noticeInfo.show = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "noticeInfo",
  data() {
    return {};
  },
  props: {
    noticeInfo: Object
  }
};
</script>


<style scoped>
.content {
  line-height: 1.5em;
  text-indent: 2em;
  font-size: 16px;
  letter-spacing: 1px;
}
.date {
  font-size: 15px;
  font-weight: 300;
  float: right;
  margin-right: 100px;
}
</style>


