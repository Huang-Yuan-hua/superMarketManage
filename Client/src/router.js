import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Login from "./views/login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/home.vue";
import Info from "./views/info.vue";
import FundList from "./views/fundList.vue";
import Announce from "./views/announce.vue";
import StaffManage from "./views/staffManage.vue";
import GoodsSell from "./views/goodsSell.vue";
import GoodsStock from "./views/goodsStock.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: Index,
      hidden: false,
      children: [
        { path: "", component: Home },
        { path: "/home", name: "home", component: Home },
        { path: "/announce", name: "announce", component: Announce },
        { path: "/info", name: "info", component: Info },
        { path: "/fundList", name: "fundList", component: FundList },
        { path: "/staffManage", name: "staffManage", component: StaffManage },
        { path: "/goodsSell", name: "goodsSell", component: GoodsSell },
        { path: "/goodsStock", name: "goodsStock", component: GoodsStock },
      ]
    },
    {
      path: "/login",
      name: "/login",
      component: Login
    },
    {
      path: "*",
      name: "/404",
      component: NotFound
    }
  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
