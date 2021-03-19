<!--  -->
<template>
  <div class="carouselDiv">
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    indicators
    img-width="400"
    img-height="266"
    interval="2000"
    no-animation
  >
    <b-carousel-slide
      :img-src="url1"
    ></b-carousel-slide>
    <b-carousel-slide
      :img-src="url2"
    ></b-carousel-slide>
    <b-carousel-slide
      :img-src="url3"
    ></b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
import { getCarousel} from "network/home";

  export default {
    name:"Carousel",
    data() {
      return {
        url1:"",
        url2:"",
        url3:"",

      }
    },
    methods:{

    },
//生命周期 - 创建完成（访问当前this实例）
    created() {
      getCarousel().then(res=>{
        this.url1 = res.data.carousel.url1;
        this.url2 = res.data.carousel.url2;
        this.url3 = res.data.carousel.url3;

      })
    },
//生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
  }
</script>
<style scoped>
/* @import url(); 引入css类 */
.carouselDiv{
  width: 400px;
}

</style>