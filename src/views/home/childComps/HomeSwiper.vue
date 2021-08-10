<template>
    <div class="homeswiper">
      <swiper>
      <!-- v-for 遍历banner里面的item -->
      <swiper-item v-for="item in banner" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
    </div>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banner: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      //为了不让homeSwiper多次发送事件
      //可以使用isLoad进行状态的记录
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
       if (!this.isLoad) {
        // console.log("---");
        //将事件发送出去
        //只发送一次
        this.$emit('swiperImageLoad')
        this.isLoad = true
       }
      }
    }
  }
</script>

<style scoped>

</style>
