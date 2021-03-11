<template>
  <div id="postDetail">
    <!-- 导航头部 -->
    <jheader />
    <!-- 楼主层 -->
    <div class="louzhu" v-if="Object.keys(post).length != 0">
      <!-- 楼主信息 -->
      <div class="left">
        <div class="post_people">
          {{ postUser.username }}
        </div>
        <div class="post_headerUrl"><img :src="postUser.headerUrl" /></div>
        <div><button>关注Ta</button><button>私信</button></div>
      </div>
      <!-- 帖子信息 -->
      <div class="right">
        <div class="post_title">{{ post.title }}</div>
        <div class="post_time">
          评论{{ post.commentCount }} 发布于:{{ post.createTime | calcTime }}
        </div>
        <div class="post_content">
          <div class="content">
            {{ post.content }}
          </div>
        </div>
        <div class="pics">
          <span v-for="(pic, index) in pics" :key="index">
            <img :src="pic" />
          </span>
        </div>
      </div>
    </div>
    <!-- 评论信息 -->
    <div class="comment" v-for="(c, index) in comments" :key="index">
      <!-- 评论人 -->
      <div class="left">
        <div class="comment_people">
          {{ c.user.username }}
        </div>
        <div class="comment_headerUrl"><img :src="c.user.headerUrl" /></div>
        <div><button>关注Ta</button><button>私信</button></div>
      </div>
      <!-- 评论内容 -->
      <div class="right">
        <div class="comment_content">
          <div class="content">{{ c.comment.content }}</div>
        </div>
        <div class="comment_time">
          回复{{ c.replyCount }} 评论于:{{ c.comment.createTime | calcTime }}
        </div>
        <!-- 二级评论 -->
        <div
          class="second_comment"
          v-for="(reply, index) in c.replies"
          :key="index"
        >
          <!-- 回复内容 -->
          <div class="content">
            {{ reply.replyUser.username
            }}<span v-if="reply.targetUser">
              回复 {{ reply.targetUser.username }}</span
            >:{{ reply.reply.content }}
          </div>
          <!-- 时间 -->
          <div class="time">
            <span>{{ reply.reply.createTime | calcTime }}</span>
            <span class="time_right"
              >赞(1)|<span
                @click="
                  show(
                    $event,
                    reply.replyUser.username,
                    reply.replyUser.id,
                    c.comment.id
                  )
                "
                >回复</span
              ></span
            >
          </div>
        </div>
        <!-- 没有指定用户的二级评论 -->
        <div class="replyNoTarget">
          <input type="text" placeholder="回复该评论" /><button
            @click="commentToCommentNoTarget($event, c.comment.id)"
          >
            回复
          </button>
        </div>
      </div>
    </div>
    <!-- 二级评论给特定用户 -->
    <div ref="replyToTarget" class="replyInput" v-show="showReply">
      <input type="text" v-model="cTcTargetContent" /><button
        @click="commentToCommentWithTarget"
      >
        回复
      </button>
    </div>
    <!-- 给帖子的评论 -->
    <div class="comment_text">
      <textarea
        rows="5"
        cols="50"
        v-model="commentToPostContent"
        placeholder="发表您的观点"
      ></textarea>
      <span><button @click="commentToPost">回帖</button></span>
    </div>
    <div>
      <button @click="prePage">上一页</button
      ><button @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script>
import { getPostDetail, comment } from "network/detail";

import Jheader from "components/Jheader.vue";
export default {
  name: "PostDetail",
  components: {
    Jheader,
  },
  data() {
    return {
      postId: "",
      post: {},
      postUser: {},
      showReply: false,
      comments: [],
      page: 0,
      lastPage: 1,
      commentToPostContent: "",
      toTarget: "",
      commentId: "",
      cTcTargetContent: "",
    };
  },
  created() {
    this.postId = this.$route.params.postId;
    this.getPostDetail(this.postId, this.page + 1);
  },
  methods: {
    nextPage() {
      this.getPostDetail(this.postId, this.page + 1);
      document.documentElement.scrollTop = 0;
    },
    prePage() {
      if (this.page == 1) {
        return;
      }
      getPostDetail(this.postId, this.page - 1).then((res) => {
        this.post = res.data.post;
        this.postUser = res.data.user;
        this.comments = res.data.comments;
        this.page--;
        // console.log(res);
      });
      document.documentElement.scrollTop = 0;
    },
    getPostDetail(postId, page) {
      if (page > this.lastPage) {
        return;
      }
      getPostDetail(postId, page).then((res) => {
        console.log(res);
        this.post = res.data.post;
        this.postUser = res.data.user;
        // this.comments = [];
        // this.comments.push(...res.data.comments);
        this.comments = res.data.comments;
        this.lastPage = res.data.totalPage;
        this.page = page;
      });
    },
    show(e, toUser, toTarget, commentId) {
      if (
        this.showReply == true &&
        e.target.parentNode.parentNode == this.$refs.replyToTarget.parentNode
      ) {
        this.showReply = false;
      } else {
        this.toTarget = toTarget;
        this.commentId = commentId;
        this.showReply = true;
        this.$refs.replyToTarget.firstChild.setAttribute(
          "placeholder",
          "回复给" + toUser
        );
        e.target.parentNode.parentNode.appendChild(this.$refs.replyToTarget);
      }
    },
    // 给帖子评论
    commentToPost() {
      comment("1", this.postId, this.commentToPostContent, "0").then((res) => {
        console.log(res);
        if (res.data.status == "ok") {
          this.commentToPostContent = "";
          this.$bvToast.toast("评论成功", {
            solid: true,
            variant: "success",
            noCloseButton: true,
            autoHideDelay: "600",
            toaster: "b-toaster-top-center",
          });
          if (this.comments.length != 0) {
            this.getPostDetail(this.postId, this.page);
          } else {
            this.$router.go(0);
          }
        }
      });
    },
    //不指向任何人的二级评论
    commentToCommentNoTarget(e, commentId) {
      comment("2", commentId, e.target.parentNode.firstChild.value, "0").then(
        (res) => {
          if (res.data.status == "ok") {
            e.target.parentNode.firstChild.value = "";
            this.$bvToast.toast("评论成功", {
              solid: true,
              variant: "success",
              noCloseButton: true,
              autoHideDelay: "600",
              toaster: "b-toaster-top-center",
            });
            this.getPostDetail(this.postId, this.page);
          }
        }
      );
    },
    //指向某个人的二级评论
    commentToCommentWithTarget() {
      comment("2", this.commentId, this.cTcTargetContent, this.toTarget).then(
        (res) => {
          if (res.data.status == "ok") {
            this.commentId = "";
            this.cTcTargetContent = "";
            this.toTarget = "";
            this.showReply = false;
            this.$bvToast.toast("评论成功", {
              solid: true,
              variant: "success",
              noCloseButton: true,
              autoHideDelay: "600",
              toaster: "b-toaster-top-center",
            });
            this.getPostDetail(this.postId, this.page);
          }
        }
      );
    },
  },
  filters: {
    //调整时间格式
    calcTime(data) {
      let t = data.split("T");
      let date = t[0].substring(5);
      let time = t[1].substring(0, 5);
      // console.log(time);
      return date + " " + time;
    },
  },
  computed: {
    pics() {
      if (this.post.postImg) {
        let urls = this.post.postImg.substring(0, this.post.postImg.length - 1);
        urls = urls.split(";");
        console.log(urls);
        return urls;
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped>
.home {
  position: relative;
  width: 45%;
  margin: 0 auto;
  padding-top: 44px;
}
#postDetail {
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
}
.louzhu {
  display: flex;
  justify-content: space-between;
}
.louzhu .left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 20%;
  background: pink;
}
.louzhu .left div {
  padding-top: 20px;
}
.louzhu .right {
  width: 75%;
  background: pink;
}
.louzhu .right .post_title {
  margin-top: 20px;
  max-height: 100px;
}
.louzhu .right .post_time {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 14px;
  line-height: 30px;
}
.louzhu .right .post_content {
  display: flex;
  margin-top: 20px;
}
.louzhu .right img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.louzhu .right .post_content .content {
  flex-grow: 1;
  padding-top: 8px;
  max-height: 200px;
}
.louzhu .right .post_content img {
  vertical-align: bottom;
}

.louzhu .right .post_title img {
  vertical-align: bottom;
}
.louzhu .right .post_time img {
  vertical-align: bottom;
}
.louzhu .right .pics {
  display: flex;
  padding-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.louzhu .right .pics img {
  width: 100px;
  height: 100px;
}
.post_headerUrl img {
  width: 48px;
  border-radius: 8px;
}
.louzhu {
  margin-top: 44px;
}
.selectArea li {
  display: inline-block;
  width: 70px;
}
.comment {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.comment .left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 20%;
  background: goldenrod;
}
.comment .left div {
  padding-top: 20px;
}
.comment .right {
  width: 75%;

  background: goldenrod;
}
.comment .right .comment_title {
  margin-top: 20px;
  max-height: 100px;
}
.comment .right .comment_time {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px solid rgb(107, 103, 103);
}
.comment .right .comment_content {
  display: flex;
  margin-top: 20px;
}
.comment .right img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.comment .right .comment_content .content {
  flex-grow: 1;
  padding-top: 8px;
  max-height: 200px;
}
.comment .right .comment_content img {
  vertical-align: bottom;
}

.comment .right .comment_title img {
  vertical-align: bottom;
}
.comment .right .comment_time img {
  vertical-align: bottom;
}
.second_comment {
  background: rgb(127, 202, 202);
}
.second_comment .content {
  padding: 10px 0;
}
.second_comment .time {
  position: relative;
  font-size: 14px;
}
.second_comment .time .time_right {
  position: absolute;
  right: 0;
}
.comment_headerUrl img {
  width: 36px;
  height: 36px;
}
.replyNoTarget {
  margin-top: 40px;
}
.post_time {
  border-bottom: 1px solid rgb(143, 140, 140);
}
</style>