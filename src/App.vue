<template>
  <div id="appxx">
    <keep-alive exclude="Register,Login,Jheader,Account,PostDetail,MessageDetail,Message,Publish,Profile,Search">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/**引入base.css */
@import "assets/css/base.css";
@import url("https://ico.z01.com/zico.css");

</style>
