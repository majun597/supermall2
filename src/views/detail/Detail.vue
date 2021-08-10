<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
        <!-- 传入请求到的轮播图数据 -->
        <detail-swiper :top-images="topImages"/>
        <!-- 传入请求到的商品信息数据 -->
        <detail-base-info :goods="goods"/>
        <!-- 传入请求到的店铺信息 -->
        <detail-shop-info :shop="shop"/>
        <!-- 传入请求到的商品详细数据 -->
        <detail-goods-info :detail-info="detailInfo"/>
        <!-- 传入请求到的商品参数数据 -->
        <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'

  import scroll from '../../components/common/scroll/scroll'

  import {getDetail, Goods, Shop, GoodsParam} from "../../network/detail"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      scroll
    },
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created () {
      //1. 保存传入的iid
      this.iid = this.$route.params.iid

      //2. 根据iid请求详情数据
      getDetail(this.iid).then(res=> {
        //1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods= new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //5.获取商品参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
