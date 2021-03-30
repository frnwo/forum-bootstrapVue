<template>
  <b-navbar id="adminNavBar" fixed="top" type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#">广科校园论坛后台管理系统</b-nav-item>
      <b-nav-item-dropdown :text="user" right>
        <b-dropdown-item href="#" @click="logout">退出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { logout, } from "network/home";

  export default {
    name:"AdminNavBar",
    data() {
      return {
        
      }
    },
    methods:{
       //退出
    logout() {
      console.log("退出");
      logout().then((res) => {
        //删除的vuex和localStorage的登录信息
          this.$store.commit("login", false);
          this.$store.commit("username",undefined);
          this.$store.commit("userId",undefined);
          localStorage.removeItem("isLogin");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          localStorage.removeItem("userType");
          //去首页
          this.$router.push("/login")
      });
    },
    },
    computed:{
      user(){
        return "管理员 "+localStorage.getItem("username")
      }
    }
  }
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>