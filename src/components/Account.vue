<template>
  <div id="account">
    <jheader />
    <!-- 正在修改提示 -->
    <b-alert show v-show="isLoading"
      ><b-spinner variant="primary" label="Spinning"></b-spinner
      >&nbsp;&nbsp;&nbsp;修改中</b-alert
    >
    <!-- 修改成功提示 -->
    <b-alert variant="success" show v-show="success">修改成功</b-alert>
    <!-- 修改失败提示 -->
    <b-alert variant="danger" show v-show="failed">{{ errMsg }}</b-alert>
    <!-- 更新头像 -->
    <div class="photo">
      <b-form-file accept=".jpg, .png, .gif" v-model="photo" placeholder="选择图片"></b-form-file>
      <b-button variant="danger" @click="updatePhoto">确认更新</b-button>
    </div>

    <!-- 更新密码 -->
    <div class="pwd">
      <!-- 原密码 -->
      <b-form-input
        v-model="password"
        required
        type="password"
        placeholder="请输入原密码"
      ></b-form-input>
      <!-- 新密码 -->
      <b-form-input
        v-model="newPassword"
        required
        type="password"
        placeholder="请输入新密码"
      ></b-form-input>
      <!-- 确认密码 -->
      <b-form-input
        v-model="password_sure"
        required
        type="password"
        placeholder="请再次确认密码"
      ></b-form-input>
      <!-- 确认按钮 -->
      <b-button @click="submitPwd" variant="primary">确认修改</b-button>
    </div>
  </div>
</template>

<script>
import { updatePwd, updatePhoto } from "network/account.js";
import Jheader from "./Jheader.vue";
export default {
  name: "Account",
  components: {
    Jheader,
  },
  data() {
    return {
      photo: null,
      password: "",
      newPassword: "",
      password_sure: "",
      isLoading: false,
      success: false,
      failed: false,
      errMsg: "",
    };
  },
  methods: {
    //修改密码
    submitPwd() {
      this.failed = false;
      this.errMsg = "";
      if((!/^[a-zA-Z]\w{6,18}$/.test(this.newPassword)) || this.newPassword==""){
        this.failed = true;
        this.errMsg = "密码必须以字母开头,长度在6到10位"
        return
      }
      if(this.password_sure!=this.newPassword){
        this.failed = true;
        this.errMsg = "确认密码与新密码不一致";
        return 
      }
      if (this.password && this.newPassword) {
        this.isLoading = true;
        updatePwd(this.password, this.newPassword)
          .then((res) => {
            // console.log(res);
            this.isLoading = false
            const myUpdatePwd = res.data;
            if (myUpdatePwd.status == "ok") {
              this.success = true
            } else {
              this.errMsg = myUpdatePwd.err
              this.failed = true
            }
          })
      }
    },
    //修改图片
    updatePhoto() {
      this.failed = false;
      this.errMsg = "";
      if(this.photo == null){
        this.failed = true;
        this.errMsg = "您没有选择图片"
      }else{
        this.isLoading = true
        updatePhoto(this.photo).then((res) => {
          this.isLoading = false
          if (res.data.status == "ok") {
            this.success = true
          }else{
            this.failed = true;
            this.errMsg = res.data.err
          }
        })
      }
    },
  }
}
</script>

<style scoped>
#account {
  width: 60%;
  margin: 160px auto 0;
}
.photo {
  height: 150px;
}
.pwd {
  height: 250px;
}
.photo,
.pwd {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style> 
