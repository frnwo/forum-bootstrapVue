<!--  -->
<template>
  <div class="post-item">
    <div class="user" @click="$router.push('/profile/'+postsItem.user.id)">
      <img class="header-img" :src="postsItem.user.headerUrl" />
      <span class="username text-success" >{{ postsItem.user.username }}</span>
    </div>
    <div class="title text-info" @click="titleClick(postsItem.post.id)">{{ postsItem.post.title }}</div>
    <div class="comment-count">
      <i class="zi zi_commentdots"></i>{{ postsItem.post.commentCount }}
    </div>
    <div class="time">
      <i class="zi zi_clock" zico="时钟"></i
      >&nbsp;{{ postsItem.post.createTime | calcTime }}
    </div>
  </div>
</template>

<script>
import { handleTime } from "common/utils.js";

export default {
  name: "PostListItem",
  props: {
    postsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
     titleClick(postId){
      // console.log(postId)
      this.$emit("titleClick",postId)
    }
  },
  filters: {
    calcTime(time) {
      return handleTime(time);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */

.user .header-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.post-item {
  display: flex;
  height: 100px;
  border-bottom:1px solid rgba(52, 172, 224,.4) ;
  box-shadow: 0 5px 5px #70a1ff;
  background: #f1f2f6;

}
.title {
  width:620px;
  height: 100%;
  line-height: 100px;
  text-align: center;
  margin-left: 50px;
  overflow: hidden;
  font-size:1.2em
}
.user {
  display: flex;
  width: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.comment-count{
  padding-right: 10px;
  line-height: 100px;
  color:#D6A2E8
}
.time{
  line-height: 100px;
  color: #FC427B;
}
</style>