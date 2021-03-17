<template>
  <div id="postDetail">
    <!-- 导航头部 -->
    <jheader />
    <!-- 发私信 -->
    <send-message ref="send-message" :toName="toName" />

    <!-- 楼主层 -->
    <div class="louzhu" v-if="Object.keys(post).length != 0">
      <strong class="tag">楼主</strong>
      <!-- 楼主信息 -->
      <div class="left">
        <div class="post_people">
          {{ postUser.username }}
        </div>
        <div class="post_headerUrl" @click="$router.push('/profile/'+postUser.id)"><img :src="postUser.headerUrl" /></div>

        <div>
         
          <b-button variant="light" @click="showSend(postUser.username)"
            >私信</b-button
          >
        </div>
      </div>
      <!-- 帖子信息 -->
      <div class="right">
        <div class="post_title">
          <h3>{{ post.title }}</h3>
        </div>
        <div class="post_time">
          <div class="likeStatus" @click="likePost(1,post.id,post.userId)">
            <span v-if="like.likeStatus != 0">
              <img src="~assets/img/like.png" />
            </span>
            <span v-else>
              <img src="~assets/img/unlike.png" />
            </span>
          </div>
          <div class="likeCount">{{ like.likeCount == 0 ? "" : like.likeCount }}</div>
          评论<span style="color: #b33771; margin-right: 10px">{{
            post.commentCount
          }}</span>
          发布于:{{ post.createTime | calcTime }}
        </div>
        <div class="post_content">
          <div class="content">
            <h4>{{ post.content }}</h4>
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
        <div class="comment_headerUrl" @click="$router.push('/profile/'+c.user.id)"><img :src="c.user.headerUrl" /></div>
        <div>
         
          <b-button variant="light" @click="showSend(c.user.username)"
            >私信</b-button
          >
        </div>
      </div>
      <!-- 评论内容 -->
      <div class="right">
        <div class="comment_content">
          <div class="content">{{ c.comment.content }}</div>
        </div>
        <div class="comment_time">

          <div class="likeStatus" @click="likeComment(2,c.comment.id,c.comment.userId,index)">
            <span v-if="c.likeStatus != 0">
              <img src="~assets/img/like.png" />
            </span>
            <span v-else>
              <img src="~assets/img/unlike.png" />
            </span>
          </div>
          <div class="likeCount">{{ c.likeCount == 0 ? "" : c.likeCount }}</div>

          回复<span style="color: #b33771; margin-right: 10px">{{
            c.replyCount
          }}</span>
          评论于:{{ c.comment.createTime | calcTime }}
        </div>
        <!-- 二级评论 -->
        <div
          style="margin-top: 10px"
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
              ><span
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
          <b-form-input placeholder="回复该评论"></b-form-input>
          <b-button @click="commentToCommentNoTarget($event, c.comment.id)"
            >发送</b-button
          >
          <!-- <input type="text" placeholder="回复该评论" /><button
            @click="commentToCommentNoTarget($event, c.comment.id)"
          >
            回复
          </button> -->
        </div>
      </div>
    </div>
    <!-- 二级评论给特定用户 -->
    <div ref="replyToTarget" class="replyInput" v-show="showReply">
      <b-form-input v-model="cTcTargetContent"></b-form-input>
      <b-button @click="commentToCommentWithTarget">发送</b-button>
    </div>
    <!-- 给帖子的评论 -->
    <b-row class="commentToPost">
      <b-col sm="10">
        <b-form-textarea
          size="lg"
          placeholder="发表您的观点"
          v-model="commentToPostContent"
        ></b-form-textarea>
      </b-col>
      <b-col sm="2">
        <b-button variant="success" @click="commentToPost">回帖</b-button>
      </b-col>
    </b-row>
    <div class="pagnation">
      <b-button variant="outline-primary" @click="prePage">上一页</b-button>
      <b-button variant="outline-primary" @click="nextPage">下一页</b-button>
    </div>
  </div>
</template>

<script>
import { getPostDetail, comment,like } from "network/detail";
import SendMessage from "components/SendMessage";

import Jheader from "components/Jheader.vue";
export default {
  name: "PostDetail",
  components: {
    Jheader,
    SendMessage,
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
      toName: "",
      like: {
        likeStatus: 0,
        likeCount: 0,
      },
    };
  },
  created() {
    this.postId = this.$route.params.postId;
    this.getPostDetail(this.postId, this.page + 1);
  },
  methods: {
    // 给帖子点赞
    likePost(entityType, entityId, entityUserId){
      like(entityType,entityId,entityUserId).then(res=>{
        this.like.likeCount = res.data.likeCount
        this.like.likeStatus = res.data.likeStatus
      })
    },
    //给评论点赞
    likeComment(entityType,entityId, entityUserId,index){
      like(entityType,entityId,entityUserId).then(res=>{
        this.comments[index].likeCount = res.data.likeCount
        this.comments[index].likeStatus = res.data.likeStatus
      })
    },
    //显示发送私信
    showSend(toName) {
      this.toName = toName;
      this.$refs["send-message"].showModal();
    },
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
        this.like.likeStatus = res.data.likeStatus;
        this.like.likeCount = res.data.likeCount;
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
  position: relative;
  display: flex;
  justify-content: space-between;
}
.louzhu .tag {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 18px;
  color: #fc427b;
}
.louzhu .left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 20%;
  background: #63cdda;
  border-radius: 10px;
}
.louzhu .left div {
  padding-top: 20px;
}
.louzhu .left img{
  border-radius: 50%;
}
.louzhu .right {
  width: 75%;
  padding-left: 40px;
  padding-right: 20px;
  background: #63cdda;
  border-radius: 10px;
}
.louzhu .right .post_title {
  margin-top: 20px;
  max-height: 100px;
  text-align: center;
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
  width: 200px;
  height: 200px;
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
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 20%;
  background: #9aecdb;
  border-radius: 10px;
}
.comment .left img{
  border-radius: 50%;
}
.comment .left div {
  padding-top: 20px;
}
.comment .right {
  width: 75%;
  padding-left: 40px;
  padding-right: 20px;
  background: #9aecdb;
  border-radius: 10px;
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
  background: #cad3c8;
  border-radius: 10px;
  padding: 0 10px;
}
.second_comment .content {
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
  width: 48px;
  height: 48px;
}
/* 二级评论指向某人 开始 */
.replyInput {
  display: flex;
}
.replyInput input {
  width: 60%;
  margin-right: 10px;
}
/* 二级评论指向某人 结束 */

/* 二级评论不指向任何人 开始 */

.replyNoTarget {
  display: flex;
  margin-top: 40px;
}
.replyNoTarget input {
  width: 60%;
  margin-right: 10px;
}
/* 二级评论不指向任何人 结束 */

.post_time {
  border-bottom: 1px solid rgb(143, 140, 140);
}
.commentToPost {
  margin-top: 20px;
}
.pagnation {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagnation > button {
  margin-left: 10px;
}
.likeCount{
  margin-right: 10px;
  width: 20px;
}
</style>