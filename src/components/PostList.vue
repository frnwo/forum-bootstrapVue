<!--  -->
<template>
  <div id="posts-list" >
    <post-list-item v-for="(item,index) in posts" :key="index" :posts-item="item" @titleClick="titleClick"/>
  </div>
</template>

<script>
import PostListItem from "./PostListItem.vue"; 
  export default {
    name:"PostList",
    components:{
      PostListItem,
    },
    props:{
      posts:{
      type:Array,
      default(){
        return []
      }
    },
    },
    data() {
      return {

      }
    },
    methods:{

    },
  }
</script>
<style scoped>

</style>