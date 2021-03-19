<template>
  <div id="message">
    <jheader/>
    <b-tabs content-class="mt-3">
      <b-tab title="私信" active>
        <b-button variant="info" @click="showSend" >发私信</b-button>
        <send-message ref="send-message"/>
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
      </b-tab>
      <b-tab title="点赞通知">
        <div v-for="(n,index) in notice.likeNotice" :key="index">
         <span> <router-link :to="/profile/+n.userId">{{n.user.username}}</router-link></span>点赞了你的
          <span v-if="n.entityType==1">帖子</span>
          <span v-else-if="n.entityType==2">评论</span>
          <span><router-link :to="/postDetail/+n.postId">点击查看更多</router-link></span>
        </div>
      </b-tab>
      <b-tab title="评论通知">
        <div v-for="(n,index) in notice.commentNotice" :key="index">
         <span> <router-link :to="/profile/+n.userId"> {{n.user.username}}</router-link></span>评论了你的帖子
          <span><router-link :to="/postDetail/+n.postId">点击查看更多</router-link></span>
        </div>
      </b-tab>
    </b-tabs>
</div>
</template>

<script>
import {getMessage,getNotice} from "network/message.js";
import MessageItem from 'components/MessageItem.vue';
import SendMessage from 'components/SendMessage.vue';
import Jheader from 'components/Jheader.vue';

  export default {
  components: { 
    MessageItem,
    Jheader,
    SendMessage,
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
        },
        notice:{
          likeNotice:[],
          commentNotice:[]
        }
      }
    },
    methods:{
      //显示发送私信
      showSend(){
        this.$refs["send-message"].showModal();
      },
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
      getNotice("like").then(res=>{
        // console.log(res.data)
        this.notice.likeNotice = res.data.notices
      })
      getNotice("comment").then(res=>{
        this.notice.commentNotice = res.data.notices
        
      })
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
