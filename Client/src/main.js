import Vue from "vue";
import App from "./App.vue";
import axios from "./http";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import moment from "moment";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

//全局时间格式化过滤器(使用moment插件)
Vue.filter("dateFormat", (dataStr, pattern = "YYYY-MM-DD") => {
  return moment(dataStr).format(pattern);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
