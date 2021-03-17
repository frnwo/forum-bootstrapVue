<!--  -->
<template>
  <div class="messageItem">
    <div class="left">
      <img :src="img" alt="">
      <div>{{username}}</div>
    </div>
    <div class="middle" @click="messageDetail">
      <img src="~assets/img/new.png"/>
      {{content}}
    </div>
    <div class="right">
      <span>{{time | handleTime}}</span>
      <div class="count">共{{count}}条消息</div>
    </div>
  </div>
</template>

<script>
import {handleTime} from "common/utils.js";

  export default {
    name:"MessageItem",
    props:{
      message:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data() {
      return {

      }
    },
    computed:{
      img(){
        return this.message.target.headerUrl;
      },
      username(){
        return this.message.target.username;
      },
      content(){
        return this.message.conversation.content;
      },
      time(){
        return this.message.conversation.createTime;
      },
      count(){
        return this.message.letterCount;
      },
      conversationId(){
        return this.message.conversation.conversationId
      }
    },
    methods:{
      messageDetail(){
        this.$router.push("/messageDetail/"+this.conversationId);
      }
    },
    filters:{
      handleTime(time){
        return handleTime(time);
      }
    }
  }
</script>
<style scoped>
/* @import url(); 引入css类 */
.messageItem{
  display: flex;
  border-bottom: 1px solid red;
  height: 102px;
  padding: 10px 0;
 background: rgba(209, 216, 224,.4);
}
.left{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100px;
  margin-right: 100px;
  color:#58B19F;
}
.left img{
  width:48px;
  height: 48px;
  border-radius: 50%;
}
.middle{
  position: relative;
  line-height: 102px;
  flex-grow: 1;
  color:#1B9CFC;
  font-size: 1.2em;
}
.middle .img{
  position: absolute;
  left:10px;
  top:5px
}
.right{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 200px;
  font-size: 16px;
}
.right .count{
  color:#ff3838
}
</style>