<!--  -->
<template>
  <div id="search">
    <jheader/>
    <p class="text-danger tip" >{{tip}}</p>
    <post-list-item v-for="(item,index) in posts" :key="index" :posts-item="item" @titleClick="titleClick"/> 
  </div>
</template>

<script>
import {search} from "network/search.js";
import PostListItem from "components/PostListItem.vue";
import Jheader from './Jheader.vue';
  export default {
    name:"Search",
    components:{
      PostListItem,
        Jheader,
    },
    data() {
      return {
        query:"",
        posts:[],
        tip:""
      }
    },
    methods:{
      titleClick(postId) {
        // console.log("postItem",postId)
        this.$router.push("/postDetail/" + postId);
    },
    },
    created(){
      this.query = this.$route.query.query;
      search(this.query).then(res=>{
        const posts = res.data.posts
        if(posts.length!=0){
          this.posts = posts
          this.tip = "搜索结果:"
        }else{
          this.tip = "搜索结果为空"
        }
      })
    },
    watch: {
    $route(to, from) {
      // 路由发生变化页面刷新
      this.$router.go(0);
    },
  },
  }
</script>
<style scoped>
/* @import url(); 引入css类 */
#search{
  width: 60%;
  margin: 0 auto;
}
.tip{
  margin-top: 150px;
}
</style>