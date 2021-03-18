<template>
  <b-navbar id="adminNavBar" fixed="top" type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#">广科校园论坛后台管理系统</b-nav-item>
      <b-nav-item-dropdown :text="user" right>
        <b-dropdown-item href="#">退出</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  export default {
    name:"AdminNavBar",
    data() {
      return {
        
      }
    },
    methods:{

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