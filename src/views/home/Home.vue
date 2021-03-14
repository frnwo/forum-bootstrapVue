<template>
  <div id="post-body">
    <jheader/>
    <div class="post-area"><post-area-select @postAreaClick="postAreaClick"/></div>
    <div class="posts">
      <post-list :posts="posts.list" @titleClick="titleClick" />
      <!-- 分页 开始 -->
      <div class="pagnation">
        <span @click="jumpPage(1)">首页</span>
        <span @click="jumpPage(posts.current - 1)">上页</span>
        <div v-for="n in posts.to" :key="n">
          <span
            @click="jumpPage(n)"
            v-if="n >= posts.from"
            :class="{ active: n == posts.current }"
          >
            {{ n }}
          </span>
        </div>
        <span @click="jumpPage(posts.current + 1)">下页</span>
        <span @click="jumpPage(posts.totalPage)">末页</span>
      </div>
      <!-- 分页结束 -->
    </div>
  </div>
</template>

<script>
import Jheader from "components/Jheader.vue";
import PostAreaSelect from "components/PostAreaSelect.vue";
import PostList from "components/PostList.vue";

import { getDiscussPosts } from "network/home";

export default {
  name: "Home",
  components: {
    Jheader,
    PostAreaSelect,
    PostList,
  },
  data() {
    return {
      posts: { current: 0, list: [], totalPage: 0, from: 0, to: 0 },
      type: "闲聊区",
    };
  },
  created() {
    this.getDiscussPosts(1, 20, this.type);
  },
  methods: {
    getDiscussPosts(current, limit, type) {
      getDiscussPosts(current, limit, type).then((res) => {
        // console.log(res);
        const pageInfo = res.data.pop();
        //总共页数
        this.posts.totalPage = pageInfo.totalPage;
        //获取posts
        this.posts.list = res.data;
        this.posts.current = current;
        this.posts.from = current - 2 <= 0 ? 1 : current - 2;
        this.posts.to =
          current + 2 > this.posts.totalPage
            ? this.posts.totalPage
            : current + 2;
      });
    },
    //分页跳转
    jumpPage(page) {
      if (page > this.posts.totalPage) {
        return;
      }
      if (page == 0) {
        return;
      }
      this.getDiscussPosts(page, 20, this.type);
      //回到顶部
      // this.$nextTick(() => {
      document.documentElement.scrollTop = 0;
      // });
    },
    titleClick(postId) {
      // console.log("postItem",postId)
      this.$router.push("/postDetail/" + postId);
    },
    postAreaClick(index) {
      switch (index) {
        case 0:
          this.type = "闲聊区";
          break;
        case 1:
          this.type = "考研区";
          break;
        case 2:
          this.type = "新生区";
          break;
        case 3:
          this.type = "毕业生区";
          break;
        case 4:
          this.type = "教师区";
          break;
      }
      this.getDiscussPosts(1, 20, this.type);
    },
  },
};
</script>

<style scoped>
#post-body {
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  width: 80%;
}
.post-area {
  position: fixed;
  left: 200px;
  top: 150px;
}
.posts {
  width: 75%;
  margin-top: 150px;
  border-radius: 5px;
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
  background: #a4b0be;
  margin-right: 8px;
  text-align: center;
  border-radius: 10px;
}
.pagnation .active {
  color: #fff;
  background: #ff4757;

}
/* 分页 结束 */

</style>