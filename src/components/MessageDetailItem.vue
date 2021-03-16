<!--  -->
<template>
  <div class="messageDetailItem">
    <div class="img" :class="{right:isRight}">
      <img :src="item.fromUser.headerUrl" alt="">
      <div>{{item.fromUser.username}}</div>
    </div>
    <div class="content">
      <span>{{item.message.content}}</span>
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
  position: relative;
  display: flex;
  height: 100px;
  border-bottom: 1px solid red;
}
.img{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3ae374;
  font-weight: bold;
}
.content{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  color:#4b4b4b;
  font-size: 24px;
}
.content .time{
  font-size: 16px;
  align-self: flex-end;
  color:#ff3838;
  margin-right: 120px;
}
.messageDetailItem .right{
  position: absolute;
  right: 0;
  color:#2c2c54
}

</style>