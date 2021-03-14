<template>
  <b-navbar id="navbar" toggleable="lg" type="dark" variant="info" fixed="top">
    <b-navbar-brand href="#" @click="jumpHome">广科校园论坛</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="!hasLogin" @click="jumpLogin">登录</b-nav-item>
        <b-nav-item v-if="!hasLogin" @click="jumpRegister">注册</b-nav-item>
        <b-nav-item v-if="hasLogin" @click="showModal"
          ><span class="publishItem">我要发布</span></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!-- 搜索 -->
        <b-nav-form class="search">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="查找"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
        </b-nav-form>

        <!-- 用户信息登录之后才会显示-->
        <b-nav-item-dropdown right v-if="hasLogin">
          <template v-slot:button-content>
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item @click="jumpMessage">消息</b-dropdown-item>
          <b-dropdown-item href="#">个人首页</b-dropdown-item>
          <b-dropdown-item @click="jumpAccount">账号设置</b-dropdown-item>
          <b-dropdown-item @click="logout">退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    <publish ref="my-publish"/>
  </b-navbar>
</template>

<script>
import Publish from "./Publish.vue";

import { logout, } from "network/home";
export default {
  name: "Jheader",
  components: { 
    Publish 
  },
  data: {
    hasLogin: false,
  },
  methods: {
    //跳转到注册页面
    jumpRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    //登录
    jumpLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    //退出
    logout() {
      console.log("退出");
      logout().then((res) => {
        //删除的vuex和localStorage的登录信息
          this.$store.commit("login", false);
          this.$store.commit("username",undefined);
          localStorage.removeItem("isLogin");
          localStorage.removeItem("username");
          //去首页
          this.$router.push("/login")
      });
    },
    //私信
    jumpMessage(){
      this.$router.push("/message");
    },
    //账号设置
    jumpAccount() {
      this.$router.push({
        path: "/account",
      });
    },
    //跳转到首页
    jumpHome() {
      this.$router.push("/home");
    },
    //显示发布
    showModal() {
      this.$refs["my-publish"].showModal();
    },
  },
  computed: {
    hasLogin() {
      return this.$store.state.isLogin || localStorage.getItem("isLogin");
    },
    username() {
      return this.$store.state.username || localStorage.getItem("username");
    },
  },
};
</script>

<style scoped>
.search {
  margin-right: 150px;
}

.publishItem {
  color: #fd9644;
}
</style>