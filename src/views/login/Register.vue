<template>
  <div class="jh-form">
    <jheader/>
    <div style="text-align:center;font-size:36px"><b class="text-danger">注册</b></div>
    <!-- 正在注册提示 -->
    <b-alert show v-show="isLoading"
      ><b-spinner variant="primary" label="Spinning"></b-spinner
      >&nbsp;&nbsp;&nbsp;注册中</b-alert
    >
    <!-- 注册成功提示 -->
    <b-alert variant="success" show v-show="success">注册成功,已发送激活邮件</b-alert>
    <!-- 注册失败提示 -->
    <b-alert variant="danger" show v-show="failed">{{errMsg}}</b-alert >
    <!-- 用户名 -->
    <b-form-group id="input-group-1" label="用户名:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.name"
        required
        placeholder="用户名"
        :state="namevalidation"
        @focus="valid(0)"
      ></b-form-input>
      <b-form-invalid-feedback :state="namevalidation" v-if="s[0]"
        >请输入2-8个字符</b-form-invalid-feedback
      >
    </b-form-group>
    <!-- 邮箱 -->
    <b-form-group id="input-group-2" label="邮箱:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.email"
        type="email"
        required
        :state="emailvalidation"
        placeholder="邮箱"
        @focus="valid(1)"
      ></b-form-input>
      <b-form-invalid-feedback :state="emailvalidation" v-if="s[1]"
        >请输入正确格式的邮箱</b-form-invalid-feedback
      >
    </b-form-group>
    <!-- 密码 -->
    <b-form-group id="input-group-3" label="密码:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.password"
        required
        type="password"
        :state="pwdvalidation"
        placeholder="最少6个字符"
        @focus="valid(2)"
      ></b-form-input>
      <b-form-invalid-feedback :state="pwdvalidation" v-if="s[2]"
        >密码至少6位</b-form-invalid-feedback
      >
    </b-form-group>
    <!-- 登录按钮 -->
    <b-button @click="submit" class="submitBtn" variant="primary"
      >注册</b-button
    >
  </div>
</template>

<script>
import Jheader from "components/Jheader.vue";

import { register } from "network/register";

  export default {
    name:"Register",
    components:{
    Jheader,

    },
    data() {
      return {
        form: {
          email: '',
          name: '',
          password:'',
        },
        isLoading:false,
        success:false,
        failed:false,
        errMsg:"",

        s:[false,false,false]

      }
    },
    computed:{
      
      namevalidation() {
        return this.form.name.length >=2  && this.form.name.length < 8
      },
      emailvalidation(){
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        return reg.test(this.form.email);
      },
      pwdvalidation(){
        return this.form.password.length >=6
      }
    },
    methods: {
      valid(index){
        this.s[index] = true
      },
      // 注册
      submit(){
        this.failed = false;
        //如果都符合验证要求就请求注册
        if(this.namevalidation && this.emailvalidation && this.pwdvalidation){
          // 显示正在注册文本
          this.isLoading  = true
          register(this.form.name, this.form.password, this.form.email).then(res=>{
            const data = res.data;
            if (data.status == "success") {
              //隐藏正在注册的文本
              this.isLoading = false
              // 显示注册成功文本
              this.success = true
              setTimeout(()=>{
                this.$router.push("/login")
              },2000)
          } else {
            //隐藏正在注册的文本
              this.isLoading = false
            //显示注册失败的文本
            const errMsg = Object.values(data).filter((item) => item != null)[0];
            this.errMsg = errMsg;
            this.failed = true;
          }
        });   
      }
    }
  }
}
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