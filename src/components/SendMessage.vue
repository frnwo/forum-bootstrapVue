<!--  -->
<template>
  <b-modal ref="send-message" hide-footer @close="close" title="发私信">
    <div>{{tip}}</div>

    <!-- 发给谁 -->
    <div>发给:</div>
    <b-form-input class="title" v-model="toName" ></b-form-input>
    <!-- 私信内容 -->
    <b-form-textarea
      class="content"
      v-model="content"
      rows="6"
      max-rows="8"
    ></b-form-textarea>  
    <!-- 发布按钮 -->
    <b-button class="mt-3" variant="warning"  block @click="sendMessage" >{{btnVal}}</b-button>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">取消</b-button>
  </b-modal>
</template>

<script>
import { sendMessage } from "network/message";

export default {
  name:"SendMessage",
  props:{
    toName:{
      type:String,
      default(){
        return ""
      }
    }
  },
  data() {
    return {
      content: "",
      btnVal:"发送",
      tip:"",
    };
  },
  methods: {
     //发私信
    sendMessage() {
      // console.log(this.toName,this.content)
      //检查输入是否有效
      const validation = this.checkInput(this.toName,this.content)
      if(validation!="ok"){
        // 无效则不发起请求
        return
      }
      sendMessage(this.toName, this.content).then(
        (res) => {
          console.log(res)
          if(res.data.status == "ok"){
            //发布成功提示
            this.btnVal = "发送成功！"
            setTimeout(()=>{           
              this.$router.go(0);
            },100) 
          }else{
            this.tip = res.data.noExist
          }
              
        }
      );
    },
    checkInput(toName,content){
      if(toName == ""){
        this.tip = "发送目标用户不能为空！";
        return 
      }
      if(content == ""){
        this.tip = "内容不能为空！";
        return
      }
      return "ok"
    },
    hideModal(){
      this.$refs['send-message'].hide();
      this.content = "";
      this.tip = "";
    },
    showModal(){
      this.$refs['send-message'].show()
    },
    
    close(){
      this.content = "";
      this.tip = "";
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.areaSelect{
  display: flex;
  flex-wrap: wrap;
}
.areaSelect > div{
  padding-right: 10px;
}
.content{
  margin: 10px 0;
}
</style>