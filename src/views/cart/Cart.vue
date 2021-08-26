<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list/> 
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>


<script>
import NavBar from '../../components/common/navbar/NavBar'
import scroll from '../../components/common/scroll/scroll'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      scroll,
      CartList,
      CartBottomBar
    },
    computed: {
      //两种语法
      ...mapGetters(['cartLength'])
      //也可以改变名称 例如将cartlength改成length
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: rgb(255, 103, 153);
    color: #ffffff;
    z-index: 999;
  }

</style>
