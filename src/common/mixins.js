// import {debounce} from './utils';
// import BackTop from "components/content/backTop/BackTop";

// export const itemListListener = {
//   data(){
//     return {
//       itemImgListener:null,
//       newRefresh: null,
//     }
//   },
//   mounted(){
//     //1.监听GoodListItem中图片加载完成 //刷新高度
//     this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
//     this.itemImgListener = () => this.newRefresh();
//     this.$bus.$on("itemImageLoad", this.itemImgListener );
//   }
// }

// export const backTop = {
//   components:{
//     BackTop,
//   },
//   data(){
//    return{
//     isShowBackTop: false,
//    }
//   },
//   methods:{
//     backTop() {
//       this.$refs.scroll.scrollTo(0, 0);
//     },
//   }
// }