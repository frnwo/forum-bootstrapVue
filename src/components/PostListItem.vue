<!--  -->
<template>
  <div class="post-item">
    <div class="user">
      <img class="header-img" :src="postsItem.user.headerUrl" />
      <span class="username">{{ postsItem.user.username }}</span>
    </div>
    <div class="title">{{ postsItem.post.title }}</div>
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
  methods: {},
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
  border-bottom:1px solid #70a1ff;
  background: #f1f2f6;

}
.title {
  width:660px;
  height: 100%;
  margin-left: 50px;
  overflow: hidden;
}
.user {
  display: flex;
  width: 80px;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.comment-count{
  padding-right: 10px;
}
</style>