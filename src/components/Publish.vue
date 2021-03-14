<!--  -->
<template>
  <b-modal ref="my-publish" hide-footer @close="close">
    <div>{{tip}}</div>
    <!-- 标题区 -->
    <b-form-input class="title" v-model="title" placeholder="标题"></b-form-input>
    <!-- 内容区 -->
    <b-form-textarea
      class="content"
      v-model="content"
      placeholder="内容"
      rows="3"
      max-rows="8"
    ></b-form-textarea>
    <!-- 帖子图片  -->
    <b-form-file
      v-model="files"
      multiple
      placeholder="最多上传4张图片"
      accept="image/jpeg, image/png"
    ></b-form-file>
    <!-- 发布区域选择 -->
    <span>发帖到:</span>
    <div class="areaSelect">
      <b-form-radio v-model="postArea" name="area" value="闲聊区"
      >闲聊区</b-form-radio
    >
    <b-form-radio v-model="postArea" name="area" value="考研区"
      >考研区</b-form-radio
    >
    <b-form-radio v-model="postArea" name="area" value="新生区"
      >新生区</b-form-radio
    >
    <b-form-radio v-model="postArea" name="area" value="毕业生区"
      >毕业生区</b-form-radio
    >
    <b-form-radio v-model="postArea" name="area" value="教师区"
      >教师区</b-form-radio
    >
    </div>
    
    <!-- 发布按钮 -->
    <b-button class="mt-3" variant="warning"  block @click="publish" >{{btnVal}}</b-button>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">取消</b-button>
  </b-modal>
</template>

<script>
import { publish } from "network/home";

export default {
  data() {
    return {
      title: "",
      content: "",
      postArea: "",
      files: [],
      btnVal:"发布",
      tip:"",
    };
  },
  methods: {
     //发帖
    publish() {
      console.log(this.title,this.content,this.files,this.postArea)
      //检查输入是否有效
      const validation = this.checkInput(this.title,this.content,this.files,this.postArea)
      if(validation!="ok"){
        // 无效则不发起请求
        return
      }
      publish(this.title, this.content, this.postArea, this.files).then(
        (res) => {
          console.log(res)
          //发布成功提示
          this.btnVal = "发布成功！"
          setTimeout(()=>{           
            this.$router.go(0);
          },500)     
        }
      );
    },
    checkInput(title,content,files,postArea){
      if(title == ""){
        this.tip = "标题不能为空！";
        return 
      }
      if(content == ""){
        this.tip = "内容不能为空！";
        return
      }
      if(files.length>4){
        this.tip = "最多四张图片";
        return 
      }
      if(postArea.length==0){
        this.tip = "请选择您要发布的区域";
        return 
      }
      return "ok"
    },
    hideModal(){
      this.$refs['my-publish'].hide();
      this.setNull()
    },
    showModal(){
      this.$refs['my-publish'].show()
    },
    setNull(){
      this.title = "";
      this.content = "";
      this.files = [];
      this.postArea = "";
      this.tip = "";
    },
    close(){
      this.setNull()
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.areaSelect{
  display: flex;
  flex-wrap: wrap;
}
.areaSelect > div{
  padding-right: 10px;
}
.content{
  margin: 10px 0;
}
</style>