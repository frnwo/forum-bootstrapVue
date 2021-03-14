<template>
  <div class="jh-form">
    <jheader/>

    <!-- 正在注册提示 -->
    <b-alert show v-show="isLoading"
      ><b-spinner variant="primary" label="Spinning"></b-spinner
      >&nbsp;&nbsp;&nbsp;登录中</b-alert
    >
    <!-- 登录成功提示 -->
    <b-alert variant="success" show v-show="success">登录成功</b-alert>
    <!-- 失败提示 -->
    <b-alert variant="danger" show v-show="failed">{{ errMsg }}</b-alert>
    <!-- 用户名 -->
    <b-form-group id="input-group-1" label="用户名:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.name"
        required
        :state="namevalidation"
        @focus="valid(0)"
      ></b-form-input>
      <b-form-invalid-feedback :state="namevalidation" v-if="s[0]"
        >用户名不能为空</b-form-invalid-feedback
      >
    </b-form-group>
    <!-- 密码 -->
    <b-form-group id="input-group-2" label="密码:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.password"
        required
        :state="pwdvalidation"
        type="password"
        @focus="valid(1)"
      ></b-form-input>
      <b-form-invalid-feedback :state="pwdvalidation" v-if="s[1]"
        >密码不能为空</b-form-invalid-feedback
      >
    </b-form-group>
    <!-- 验证码 -->
    <b-row class="kaptcha">
      <b-col sm="9">
        <b-form-input
          type="text"
          v-model="form.kaptcha"
          placeholder="验证码"
        ></b-form-input>
      </b-col>
      <b-col sm="3">
        <img
          src="http://localhost:8888/forum/kaptcha"
          @click="refreshKaptcha"
        />
      </b-col>
    </b-row>

    <!-- 登录按钮 -->
    <b-button
      sm="2"
      class="submitBtn"
      @click="submit"
      variant="primary"
      >登录</b-button
    >
    <!-- 记住我 -->
    <b-form-checkbox
      id="rememberme"
      v-model="form.rememberme"
      name="checkbox-1"
      value="1"
      unchecked-value="0"
    >
      记住我
    </b-form-checkbox>
  </div>
</template>

<script>
import Jheader from "components/Jheader.vue";

import { login } from "network/login";

export default {
  name:"Login",
  components:{
    Jheader,

  },
  data() {
    return {
      form: {
        name: "",
        password: "",
        kaptcha: "",
        rememberme: "1",
      },
      isLoading: false,
      success: false,
      failed: false,
      errMsg: "",

      s:[false,false]
    };
  },
  computed: {
    namevalidation() {
      return this.form.name.length > 0;
    },
    pwdvalidation() {
      return this.form.password.length > 0;
    },
    kaptchavalidation() {
      return this.form.kaptcha.length > 0;
    },
  },
  methods: {
    valid(index){
      this.s[index] = true
    },
    //刷新验证码
    refreshKaptcha(e) {
      e.target.src = "http://localhost:8888/forum/kaptcha?p=" + Math.random();
    },
    submit() {
      //隐藏错误提示
      this.failed = false;
      if (this.namevalidation && this.pwdvalidation && this.kaptchavalidation) {
        this.isLoading = true;
        return login(this.form.name, this.form.password, this.form.kaptcha, this.rememberme).then(res=>{
          console.log(res)
          const data = res.data;
          this.isLoading = false;
          if(data.status=="ok"){
            //显示登录成功文本
            this.success = true;
            // 登录成功后把用户信息存进localstorage
            this.$store.commit("login", true);
            this.$store.commit("username",data.user.username)
            localStorage.setItem("isLogin", "1");
            localStorage.setItem("username", data.user.username);
            //跳转到首页
            this.$router.push({
              path: "/home",
            });
          } else {
            //显示登录失败的toast
            const errMsg = Object.values(data).filter(
              (item) => item != null
            )[0];
            //显示登录错误文本
            this.errMsg = errMsg;
            this.failed = true;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.jh-form {
  width: 40%;
  margin: 150px auto;
}
.submitBtn {
  margin-top: 20px;
}
</style>