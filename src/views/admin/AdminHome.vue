<template>
  <div id="adminHome">
    <admin-nav-bar />

    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="用户管理" active>
            <div class="userManage">
              <label for="username">根据用户名查找用户:</label>
              <b-row>
                <b-col cols="8">
                  <b-form-input  id="username" type="text" v-model="username"></b-form-input
                ></b-col>
                <b-col cols="2"><b-button @click="searchUser">查找</b-button></b-col>
              </b-row>
              <!-- 用户查询结果开始 --> 
              <table class="users">
                <thead class="text-info">
                  <th>ID</th><th>用户名</th><th>操作</th>
                </thead>
                <tbody>
                  <tr v-for="(u,index) in users" :key="index">
                    <td>{{u.id}}</td><td><b>{{u.username}}</b></td><td class="operationBtn"><b-button variant="success" @click="$router.push('/profile/'+u.id)">查看详情</b-button>
                    <b-button v-if="u.status==1" @click="block(u.id,2,index)">拉黑</b-button>
                    <b-button variant="danger" v-else-if="u.status==2" @click="block(u.id,1,index)">取消拉黑</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 用户查询结果结束 --> 
            </div>
          </b-tab>
          <b-tab title="帖子管理">
          <!-- 帖子查询结果开始 -->
          <div class="posts">
            <b-form-group label="查找帖子" >
              <b-row>
                 <b-col cols="1">
                <b-form-radio v-model="searchType" name="type" value="id">ID</b-form-radio>
                 </b-col>
                  <b-col cols="3">
                <b-form-radio v-model="searchType" name="type" value="keyword">帖子标题或内容</b-form-radio>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="8">
                  <b-form-input  type="text" v-model="sp"></b-form-input
                ></b-col>
                <b-col cols="2"><b-button @click="searchPost">查找</b-button></b-col>
              </b-row>
            </b-form-group>
            <table class="posts">
                <thead class="text-info">
                  <th>ID</th><th>标题</th><th>操作</th>
                </thead>
                <tbody>
                  <tr v-for="(p,index) in posts" :key="index">
                    <td>{{p.id}}</td><td><b>{{p.title}}</b></td><td class="operationBtn"><b-button variant="success" @click="$router.push('/postDetail/'+p.id)">查看帖子</b-button>
                    <b-button v-if="p.type==0" variant="danger" @click="top(p.id,1,index)">置顶</b-button>
                    <b-button  v-else-if="p.type==1" @click="top(p.id,0,index)">取消置顶</b-button>
                    <b-button v-if="p.status==0" variant="danger" @click="del(p.id,2,index)">删除</b-button>
                    <b-button v-else-if="p.status==2" @click="del(p.id,0,index)">恢复可见</b-button>    
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 帖子查询结果结束 -->
          </b-tab>
          <b-tab title="轮播图管理">
             <!-- 正在修改提示 -->
            <b-alert show v-show="isLoading"
              ><b-spinner variant="primary" label="Spinning"></b-spinner
              >&nbsp;&nbsp;&nbsp;上传中</b-alert
            >
            <!-- 上传成功提示 -->
            <b-alert variant="success" show v-show="success">上传成功</b-alert>
            <!-- 上传失败提示 -->
            <b-alert variant="danger" show v-show="failed">{{ errMsg }}</b-alert>
            <b-row>
            更新第
            <b-form-radio v-model="num" name="num" value="1">1</b-form-radio>
            <b-form-radio v-model="num" name="num" value="2">2</b-form-radio>
            <b-form-radio v-model="num" name="num" value="3">3</b-form-radio>张轮播图</b-row>
            <div class="photo">
              <b-form-file accept=".jpg, .png, .gif" v-model="photo" placeholder="选择图片"></b-form-file>
              <b-button variant="danger" @click="updatePhoto">确认更新</b-button>
            </div>  
          </b-tab>
          <b-tab title="论坛">
            <router-link to="/home">进入论坛</router-link>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import AdminNavBar from "./AdminNavBar.vue";
import {searchUser,block,searchPost,top,del,updatePhoto} from "network/admin/admin.js"
export default {
  components: { AdminNavBar },
  name: "AdminHome",
  data() {
    return {
      username:"",
      users:[],
      posts:[],
      searchType:"",
      sp:"",

      photo: null,
      isLoading: false,
      success: false,
      failed: false,
      errMsg: "",
      num:undefined
    };
  },
  methods: {
    //修改图片
    updatePhoto() {
      this.failed = false;
      this.errMsg = "";
      if(this.num == undefined){
        this.failed = true;
        this.errMsg = "我不知道您要更新第几张图片,麻烦请选择"
      }else if(this.photo == null){
        this.failed = true;
        this.errMsg = "您没有选择图片"
      }else{
        this.isLoading = true
        updatePhoto(parseInt(this.num),this.photo).then((res) => {
          this.isLoading = false
          if (res.data.status == "ok") {
            this.success = true
            setTimeout(()=>{
              this.success = false
            },1000)
          }else{
            this.failed = true;
            this.errMsg = res.data.err
          }
        })
      }
    },
    searchUser(){
      let str = this.username.replace(/(^\s*)|(\s*$)/g, "");
      if(str!=""){
        searchUser(str).then(res=>{
          if(res.data.users){
            this.users = res.data.users
          }
        })
      }
    },
    block(id,status,index){
      block(id,status).then(res=>{
        if(res.data.status == "ok"){
          this.users[index].status = status
        }
      })
    },
    searchPost(){
      if(this.searchType==""){
        return
      }
      if(this.searchType=="id"){
        searchPost(this.sp,null).then(res=>{
          if(res.data.post){
            this.posts = [];
            this.posts.push(res.data.post)
          }
        })
      }else{
        let str = this.sp.replace(/(^\s*)|(\s*$)/g, "");
        if(str==""){
          return 
        }
        searchPost(null,this.sp).then(res=>{
          if(res.data.posts){
            // console.log(res)
            this.posts = res.data.posts;
          }
        })
      }
    },
    top(id,type,index){
      top(id,type).then(res=>{
        if(res.data.status == "ok"){
          this.posts[index].type = type
        }
      })
    },
    del(id,status,index){
      del(id,status).then(res=>{
        if(res.data.status == "ok"){
          this.posts[index].status = status
        }
      })
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#adminHome {
  width: 80%;
  margin: 100px auto 0;
}
table{
  width:100%;
  margin:10px
}

.users th,td{
  text-align: center;
  padding: 10px 0;
  border:1px solid cornflowerblue
}
.users .operationBtn button{
  margin-right: 10px;
}
.users tr td:nth-child(1){
  width: 100px;
}
.users tr td:nth-child(2){
  width: 400px;
}
.users tr td:nth-child(3){
  width: 300px;
}
.posts th,td{
  text-align: center;
  padding: 10px 0;
  border:1px solid rgb(25, 105, 226)
}
.posts tr td:nth-child(1){
  width: 100px;
}
.posts tr td:nth-child(2){
  width: 500px;
}
.posts tr td:nth-child(3){
  width: 400px;
}
.posts .operationBtn button{
  margin-right: 10px;
}
</style>