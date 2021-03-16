<template>

  <div id="message">
    <jheader/>
    <div v-for="(conversation,index) in message.conversations" :key="index">
      <message-item :message="conversation"/>
    </div>
    <!-- 分页 开始 -->
      <div class="pagnation">
        <span @click="jumpPage(1)">首页</span>
        <span @click="jumpPage(message.current - 1)">上页</span>
        <span @click="jumpPage(message.current + 1)">下页</span>
        <span @click="jumpPage(message.page.to)">末页</span>
      </div>
      <!-- 分页结束 -->
  </div>
</template>

<script>
import {getMessage} from "network/message.js";
import MessageItem from 'components/MessageItem.vue';
import Jheader from 'components/Jheader.vue';

  export default {
  components: { 
    MessageItem,
    Jheader 
  },
    name:"Message",
    data() {
      return {       
        message:{
          conversations:[],
          unreadCount:"", 
          current:1,
          limit:5,
          page:undefined
        }
      }
    },
    methods:{
      getMessage(current,limit){
        getMessage(current,limit).then(res=>{
          const data = res.data;
          // console.log(data)
          this.message.conversations = data.conversations;
          this.message.unreadCount = data.unreadCount;
          this.message.page = data.page;
          this.message.current = current
        })
      },
      jumpPage(page) {
        if (page > this.message.page.to) {
          return;
        }
        if (page == 0) {
          return;
        }
        this.getMessage(page, 5);
        //回到顶部
        // this.$nextTick(() => {
        document.documentElement.scrollTop = 0;
        // });
    },
    },
    created(){
      this.getMessage(this.message.current,this.message.limit);
    }
  }
</script>
<style scoped>
/* @import url(); 引入css类 */
#message{
  width: 60%;
  margin:120px auto 0;
}
/* 分页 开始 */
.pagnation {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 40px;

}
.pagnation span {
  display: inline-block;
  width:60px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  background: #7d5fff;
  margin-right: 8px;
  text-align: center;
  border-radius: 10px;
  color: #fffa65;
  font-size: 0.8em;
}

/* 分页 结束 */
</style>
