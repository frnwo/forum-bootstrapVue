<!--  -->
<template>
  <div id="messageDetail">
    <jheader/>
    <div class="top">
      <div>与<span style="color:#17c0eb;font-weight:bold">{{ target }}</span>的私信</div>
      <b-button variant="info" @click="showSend">发私信</b-button>
      <send-message  ref="send-message" :toName = "target"/>
    </div>
    
    <div v-for="(m, index) in messages" :key="index">
      <message-detail-item :item="m" :class="{fr:m.fromUser.username==loginName}"/>
    </div>
    <!-- 分页 开始 -->
      <div class="pagnation">
        <span @click="jumpPage(1)">首页</span>
        <span @click="jumpPage(current - 1)">上页</span>
        <span @click="jumpPage(current + 1)">下页</span>
        <span @click="jumpPage(page.to)">末页</span>
      </div>
      <!-- 分页结束 -->
  </div>
</template>

<script>
import MessageDetailItem from "components/MessageDetailItem.vue";
import Jheader from './Jheader.vue';
import SendMessage from "./SendMessage";

import { getMessageDetail } from "network/message.js";

export default {
  name: "MessageDetail",
  components: {
    MessageDetailItem,
    Jheader,
    SendMessage,
  },
  data() {
    return {
      current: 1,
      conversationId: undefined,
      messages: [],
      target: "",
      page:{},
      
    };
  },
  computed:{
    loginName(){
      return localStorage.getItem("username")
    }
  },
  methods: {
    //显示发送私信
      showSend(){
        this.$refs["send-message"].showModal();
      },
    getMessageDetail(current) {
      getMessageDetail(current, this.conversationId).then((res) => {
        console.log(res);
        this.messages = res.data.messages;
        this.target = res.data.target.username;
        this.page = res.data.page;
        this.current = current;
      });
    },
    jumpPage(page) {
        if (page > this.page.to) {
          return;
        }
        if (page == 0) {
          return;
        }
        this.getMessageDetail(page);
        //回到顶部
        // this.$nextTick(() => {
        document.documentElement.scrollTop = 0;
        // });
    },
  },
  created() {
    this.conversationId = this.$route.params.conversationId;
    this.getMessageDetail(1);
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#messageDetail{
  margin-top: 150px;
  width: 60%;
  margin: 150px auto 0;
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
.top{
  display: flex;
  justify-content: space-between;
}
.fr{
  margin-left: 100px;
  background: #d1ccc0;
}
</style>