<template>
  <div class="index">
    <headNav></headNav>
    <leftMenu></leftMenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headNav from "../components/headerNav";
import leftMenu from "../components/leftMenu";
import { mapGetters } from "vuex";
export default {
  name: "index",
  components: {
    headNav,
    leftMenu
  },
  computed: {
    ...mapGetters(["newrouter"])
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: 90%;
  height: 100%;
  overflow: auto;
}
</style>
