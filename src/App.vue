<template>
  <div id="appxx">
    <keep-alive exclude="Register,Login,Jheader,Account,PostDetail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Jheader from './components/Jheader.vue';
export default {
  name: "App",
  components: {Jheader},
};
</script>

<style>
/**引入base.css */
@import "assets/css/base.css";
@import url("https://ico.z01.com/zico.css");

</style>
