<!--  -->
<template>
  <div class="messageDetailItem">
    <div class="img" :class="{right:isRight}">
      <img :src="item.fromUser.headerUrl" alt="">
      <div>{{item.fromUser.username}}</div>
    </div>
    <div>
      <span class="content">{{item.message.content}}</span>
      <div class="time">{{item.message.createTime|calcTime}}</div>
    </div>
    
  </div>
</template>

<script>
  import {handleTime} from "common/utils.js"
  export default {
    name:"MessageDetailItem",
    props:{
      item:{
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
   
    methods:{

    },
    computed:{
      isRight(){
        return this.item.fromUser.username == localStorage.getItem("username")
      }
    },
    filters:{
      calcTime(time){
        return handleTime(time);
      }
    }
  }
</script>
<style scoped>
/* @import url(); 引入css类 */
.messageDetailItem{
  width: 85%;
  position: relative;
  display: flex;
  align-items: center;
  height: 100px;
  background: #f7f1e3;
  border-radius: 10px;
  margin-top: 10px;
}
.img{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3ae374;
  font-weight: bold;
}
.img img{
  width: 48px;
  border-radius: 50%;
}
.content{
  position: absolute;
  width:400px;
  left: 50%;
  top:20px;
  margin-left: -200px;
  color:#4b4b4b;
  font-size: 24px;
}
 .time{
  position: absolute;
  left: 50%;
  bottom: 5px;
  margin-left: -150px;
  font-size: 16px;
  width:100px;
  color:#ff3838;
}
.messageDetailItem .right{
  position: absolute;
  right: 0;
  color:#2c2c54
}

</style>