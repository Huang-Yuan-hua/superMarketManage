<template>
  <el-row class="menu-page">
    <el-col>
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        background-color="#426388"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>

        <el-submenu index="1">
          <template slot="title">
            <i class="fa fa-margin fa fa-bell"></i>
            <span slot="title">通知公告</span>
          </template>
          <router-link to="/announce">
            <el-menu-item index="1">
              <span slot="title">近期通告</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="fa fa-margin fa fa-money"></i>
            <span slot="title">收支管理</span>
          </template>
          <router-link to="/fundList">
            <el-menu-item index="2">
              <span slot="title">收支记录</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="fa fa-margin fa-shopping-cart"></i>
            <span slot="title">商品管理</span>
          </template>
          <router-link to="/goodsSell">
            <el-menu-item index="3-1" v-if="user.identity == '管理员'">
              <span slot="title">商品销售</span>
            </el-menu-item>
          </router-link>
          <router-link to="/goodsStock">
            <el-menu-item index="3-2">
              <span slot="title">商品库存</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="4" v-if="user.identity == '管理员'">
          <template slot="title">
            <i class="fa fa-margin fa fa fa-users"></i>
            <span slot="title">员工管理</span>
          </template>
          <router-link to="/staffManage">
            <el-menu-item index="4">
              <span slot="title">员工账号</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="fa fa-margin fa fa-user-circle-o"></i>
            <span slot="title">个人信息</span>
          </template>
          <router-link to="/info">
            <el-menu-item index="5">
              <span slot="title">我的资料</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>


<style scoped>
.menu-page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #426388;
  z-index: 98;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown .hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>


