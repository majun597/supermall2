<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles= "['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            v-bind:probe-type="3" 
            @scroll="contentScroll" 
            v-bind:pull-up-load="true"
            @pullingUp="loadMore"> 
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control  :titles= "['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" ></tab-control>
      <!-- 从currentType里面取出list放到goods里面 -->
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <!-- 在我们需要监听一个组件的原生时间时，必须给对应的事件加上.native修饰符 才能进行监听 使用v-show绑定一个boolean值，为true时显示为false时隐藏-->
    <back-top @click.native = "backClick" v-show="isShowBack" />
  </div>
  
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodsList'
  import GoodsListItem from '../../components/content/goods/GoodsListItem'
  import scroll from '../../components/common/scroll/scroll'
  import BackTop from '../../components/common/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "../../network/home";

  
  //加大括号的原因：home.js里面没有用export default导出
  
  //import Swiper from '../../components/common/swiper/Swiper'
  //import SwiperItem from '../../components/common/swiper/SwiperItem'
  //也可以写成下面的形式  因为index.js里面export统一导出了这两个文件
  //import { Swiper, SwiperItem } from '../../components/common/swiper';

  export default {
    name: "Home",
    // 进行注册
    components: {
      
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      GoodsListItem,
      scroll,
      BackTop
    },
    //用一个data用于保存请求过来的数据
    data () {
      return {
        banner:[],
        recommends:[],
        //设计数据模型 后面再请求数据
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        // 默认刚开始时显示的是流行的页面
        currentType: 'pop',
        //使用一个变量来判断是否显示回到顶部按钮
        isShowBack: false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY: 0
      }
    },
    activated () {
      //this.$refs.scroll.refresh()
      // this.$refs.scroll.scrollTo(0,this.saveY)
      
    },
    deactivated () {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    //组件创建好之后就可以发送网络请求
    //实现一个生命周期函数
    created () {
      //1、请求多个数据
      this.getHomeMultidata()
      //2\请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //挂载
    // mounted () {

    // },
    methods: {
      //事件监听相关的方法
       tabClick(index) {
         //通过switch case判断是否点击新款和精选
         switch (index) {
           case 0:
            this.currentType = 'pop'
            break
           case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
         }
         //让tabcontrol的currentIndex与最新点击的index保持一致
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
       },
       //在方法里面对backtop的监听使用
       backClick() {
         //方法一：此处先是拿到scroll组件 然后拿到scroll属性 然后调用scroll里面的回到顶部的方法  最后一个500代表500ms内返回顶部
         //this.$refs.scroll.scroll.scrollTo(0,0,500)
         //方法二：此处先是拿到scroll组件 然后调用scroll里面的回到顶部的方法 
         this.$refs.scroll.scrollTo(0,0)
       },
       contentScroll(position) {
         //1.判断滚动位置是否大于1000 若大于则isShowBack为true 即显示返回顶部按钮
         this.isShowBack = (-position.y) > 1000

         //2.判断tabControl是否吸顶（position：fixed）
         this.isTabFixed = (-position.y) > this.tabOffsetTop-10
       },
       loadMore() {
         this.getHomeGoods(this.currentType)
        
        // this.$refs.scroll.scroll.refresh()
       },
       swiperImageLoad(){
          //获取tabControl的offsetTop
          //所有的组件都有一个属性$el：用于获取组件中的元素
          //当轮播图加载完成后打印offsettop的值
          // console.log(this.$refs.tabControl.$el.offsetTop)  
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
       },
      // 网络请求相关的方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type, page).then(res => {
          //把res.data.list里面的数据直接给压入this.goods[type].list中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
      })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 视口高度 */
    height: 100vh;
  }
  .home-nav {
    /* background-color: rgb(255, 87, 119); */
    background-color: var(--color-tint);
    color: #ffffff;
    /* 使顶部导航栏固定定位 滚动屏幕时不动 */
    /* position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .content {
    height: calc(100% - 50px);
    overflow: hidden;
    /* margin-top: 44px; */
  }

</style>
