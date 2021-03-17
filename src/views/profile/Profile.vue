<!--  -->
<template>
  <div id="profile">
    <jheader />

    <b-card no-body class="my-tab">
      <b style="text-align: center;padding:10px 0" class="text-success">{{ user.username }}的个人首页</b>
      <div
        class="followBtn"
        v-if="loginId != userId"
        style="text-align: center"
      >
        <b-button
          variant="danger"
          style="margin: 10px"
          v-if="hasFollowed"
          @click="unfollow"
          >取消关注</b-button
        >
        <b-button variant="success" style="margin: 10px" v-else @click="follow"
          >关注Ta</b-button
        >
      </div>
      <b-tabs card>
        <b-tab title="帖子" active>
          <table>
            <thead>
              <th>标题</th>
              <th>时间</th>
              <th>类型</th>
              <th>操作</th>
            </thead>
            <tr
              v-for="(p, index) in posts"
              :key="index"
              :class="{ rowActive: index % 2 == 1 }"
            >
              <td>
                <b
                  @click="postDetail(p.id)"
                  style="cursor: pointer; color: red"
                  >{{ p.title }}</b
                >
              </td>
              <td>{{ p.createTime | caclTime }}</td>
              <td>{{ p.postArea }}</td>
              <td>
                <b-button
                  variant="danger"
                  v-if="p.userId == loginId"
                  @click="del(p.id, index)"
                  >删除</b-button
                >
              </td>
            </tr>
          </table>
        </b-tab>
        <b-tab title="收到的赞" >
          <div>
            共收到<span class="likeCount">{{ likeCount }}</span
            >个赞
          </div>
        </b-tab>
        <b-tab title="关注的人">
          <div v-for="(u, index) in followees" :key="index" class="followee">
            <div class="user">
              <span><img :src="u.user.headerUrl" /></span
              ><span>{{ u.user.username }}</span>
            </div>
            <div class="btn" v-if="loginId != u.user.id">
              <b-button
                variant="danger"
                style="margin: 10px"
                v-if="u.hasFollowed"
                @click="unfollow2(u.user.id, index)"
                >取消关注</b-button
              >
              <b-button
                variant="success"
                style="margin: 10px"
                v-else
                @click="follow2(u.user.id, index)"
                >关注Ta</b-button
              >
            </div>
          </div>
        </b-tab>
        <b-tab title="粉丝">
          <div v-for="(u, index) in followers" :key="index" class="follower">
            <div class="user">
              <span><img :src="u.user.headerUrl" /></span
              ><span>{{ u.user.username }}</span>
            </div>
            <div class="btn" v-if="loginId != u.user.id">
              <b-button
                variant="danger"
                style="margin: 10px"
                v-if="u.hasFollowed"
                @click="unfollow3(u.user.id, index)"
                >取消关注</b-button
              >
              <b-button
                variant="success"
                style="margin: 10px"
                v-else
                @click="follow3(u.user.id, index)"
                >关注Ta</b-button
              >
            </div>
          </div>
        </b-tab>
        
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Jheader from "components/Jheader.vue";
import {
  getProfile,
  getFollowees,
  getFollowers,
  follow,
  unfollow,
  getPosts,
  del,
} from "network/profile.js";
import { handleTime } from "common/utils.js";
export default {
  name: "Profile",
  components: { Jheader },
  data() {
    return {
      user: {},
      userId: undefined,
      likeCount: 0,
      followeeCount: 0,
      followerCount: 0,
      hasFollowed: false,
      followees: [],
      followers: [],
      posts: [],
    };
  },
  methods: {
    del(id, index) {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认删除该贴?", {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "确认",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((res) => {
          if (res) {
            del(id).then((res) => {
              if (res.data.status == "ok") {
                this.posts.splice(index, 1);
              }
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    //关注
    follow() {
      follow(this.userId).then((res) => {
        if (res.data.status == "ok") {
          this.hasFollowed = true;
        }
      });
    },
    unfollow() {
      unfollow(this.userId).then((res) => {
        if (res.data.status == "ok") {
          this.hasFollowed = false;
        }
      });
    },
    unfollow2(userId, index) {
      unfollow(userId).then((res) => {
        if (res.data.status == "ok") {
          this.followees[index].hasFollowed = false;
        }
      });
    },
    follow2(userId, index) {
      follow(userId).then((res) => {
        if (res.data.status == "ok") {
          this.followees[index].hasFollowed = true;
        }
      });
    },
    unfollow3(userId, index) {
      unfollow(userId).then((res) => {
        if (res.data.status == "ok") {
          this.followers[index].hasFollowed = false;
        }
      });
    },
    follow3(userId, index) {
      follow(userId).then((res) => {
        if (res.data.status == "ok") {
          this.followers[index].hasFollowed = true;
        }
      });
    },
    //跳转到帖子详情
    postDetail(id) {
      this.$router.push("/postDetail/" + id);
    },
  },
  filters: {
    caclTime(time) {
      return handleTime(time);
    },
  },
  created() {
    const userId = this.$route.params.userId;
    this.userId = userId;
    //获取点赞数
    getProfile(userId).then((res) => {
      this.likeCount = res.data.likeCount;
      this.followeeCount = res.data.followeeCount;
      this.followerCount = res.data.followerCount;
      this.hasFollowed = res.data.hasFollowed;
      this.user = res.data.user;
    });
    //获取关注的人列表
    getFollowees(userId).then((res) => {
      // console.log(res)
      this.followees = res.data.users;
    });
    //获取粉丝列表
    getFollowers(userId).then((res) => {
      // console.log(res)
      this.followers = res.data.users;
    });
    //获取列表
    getPosts(this.userId).then((res) => {
      // console.log(res.data);
      this.posts = res.data;
    });
  },
  computed: {
    loginId() {
      return localStorage.getItem("userId");
    },
  },
  watch: {
    $route(to, from) {
      // 路由发生变化页面刷新
      this.$router.go(0);
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.my-tab {
  width: 60%;
  margin: 150px auto 0;
}
.likeCount {
  color: red;
}
img {
  width: 64px;
  border-radius: 50%;
  margin-right: 10px;
}
.followee,
.follower {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgb(49, 127, 230);
}
table {
  width: 100%;
}
th,
td {
  padding: 10px 10px;
}
table,
th,
td {
  text-align: center;
}
.rowActive {
  background: #f7f1e3;
}
thead {
  background: #ffda79;
}
</style>