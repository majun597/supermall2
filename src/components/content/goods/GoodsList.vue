<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.index" :goods-item="item" />
  </div>
</template>

<script>
  import GoodsListItem from '../goods/GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    /* 将图片在每一行的占据空间进行均等分 */
    justify-content: space-around;
  }
</style>
