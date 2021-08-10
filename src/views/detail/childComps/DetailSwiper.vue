<template>

    <swiper class="detail-swiper">
      <swiper-item  v-for="item in topImages" :key="item.index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>

</template>

<script>
  // 导入轮播图
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
