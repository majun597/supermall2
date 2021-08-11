<template>
  <div class="goods-item" @click="itemClick">
    <!-- 从goodsItem里面找到img放到这里 -->
    <img :src="showImage" alt="">
    <div class="goods-info">
      <!-- 从goodsItem里面找到title price 收藏 放到这里 -->
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    // 计算属性  判断取哪里的图片  ||为懒运算，如果左边为true就不用管右边
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      itemClick() {
        //进行路由跳转 
        //动态路由
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;

  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    /* 使文字在一行显示 若超出 则显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: rgb(255, 87, 119);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  /* 伪元素 在收藏数前 添加收藏的图标 */
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
