 <template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <!-- 传入请求到的轮播图数据 -->
        <detail-swiper :top-images="topImages"/>
        <!-- 传入请求到的商品信息数据 -->
        <detail-base-info :goods="goods"/>
        <!-- 传入请求到的店铺信息 -->
        <detail-shop-info :shop="shop"/>
        <!-- 传入请求到的商品详细数据 -->
        <detail-goods-info :detail-info="detailInfo"/>
        <!-- 传入请求到的商品参数数据 -->
        <detail-param-info ref="params" :param-info="paramInfo"/>
        <!-- 传入请求到的商品评论数据 -->
        <detail-comment-info ref="comment" :comment-info="commentInfo" />
        <!-- 传入请求到的推荐数据 -->
        <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native = "backClick" v-show="isShowBack" />
    <detail-bottom-bar @addCart="addToCart"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from '../../components/common/backTop/BackTop'
  import Toast from '../../components/common/toast/Toast'

  import scroll from '../../components/common/scroll/scroll'
  import GoodsList from '../../components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "../../network/detail"

  export default {
    name: "Detail", 
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Toast,
      BackTop,
      scroll,
      GoodsList
    },
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        topY: [],
        currentIndex: 0,
        isShowBack: false,
        message: '',
        show: false
      }
    },
    updated () {
        this.detailImageLoad()
      },
    methods: {
      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0, -(this.topY[index]-44), 100)
      },

      detailImageLoad() {
        //获取参数 评论 推荐到顶部的距离，方便后面进行联通
              this.topY=[]

              this.topY.push(0);
              this.topY.push(this.$refs.params.$el.offsetTop)
              this.topY.push(this.$refs.comment.$el.offsetTop)
              this.topY.push(this.$refs.recommend.$el.offsetTop)
              this.topY.push(Number.MAX_VALUE)

              console.log(this.topY)
      },
      contentScroll(position) {
        //1、获取y值
        const positionY = -(position.y+390-44)

        //2、positionY和主题中的值进行对比
        let length = this.topY.length
        for(let i = 0;i < length; i++){
          if (this.currentIndex !== i && ((i < length-1 && positionY >= this.topY[i] && positionY < this.topY[i+1])  || (i === length-1 && positionY >= this.topY[i]))) {
            this.currentIndex = i
            console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //3. 是否显示回到顶部
        this.isShowBack = (-position.y) > 1000
      },
       backClick() {
         //方法一：此处先是拿到scroll组件 然后拿到scroll属性 然后调用scroll里面的回到顶部的方法  最后一个500代表500ms内返回顶部
         //this.$refs.scroll.scroll.scrollTo(0,0,500)
         //方法二：此处先是拿到scroll组件 然后调用scroll里面的回到顶部的方法 
         this.$refs.scroll.scrollTo(0, 0, 300)
       },
       addToCart() {
         //1.获取购物车需要展示的信息
         const product = {}
         product.image = this.topImages[0];
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.realPrice;
         product.iid = this.iid;

         //2.将商品添加到购物车里（dispatch返回的是promise）
        // this.$store.commit('addCart', product)
         this.$store.dispatch('addCart', product).then(res => {
           this.show = true;
           this.message = res;
           setTimeout(() => {
             this.show = false;
             this.message = ''
           },15000)
         })

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
        //6、获取商品的评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        /*
        //1、第一次获取，值不对
        //原因：this.$refs.params.$el没有渲染
        this.topY=[]

              this.topY.push(0);
              this.topY.push(this.$refs.params.$el.offsetTop)
              this.topY.push(this.$refs.comment.$el.offsetTop)
              this.topY.push(this.$refs.recommend.$el.offsetTop)

              console.log(this.topY)

        //2、第二次获取，值不对
        //原因：图片没有计算在内
        //根据最新的数据，对应的DOM确实已经渲染出来了，但是图片依然没加载完成（目前获取到的offsetTop不包含其中的图片）
        //一般来说 offsetTop值不对时都是因为图片的问题
        this.$nextTick( () => {
           //获取参数 评论 推荐到顶部的距离，方便后面进行联通
              this.topY=[]

              this.topY.push(0);
              this.topY.push(this.$refs.params.$el.offsetTop)
              this.topY.push(this.$refs.comment.$el.offsetTop)
              this.topY.push(this.$refs.recommend.$el.offsetTop)

              console.log(this.topY)
        })
        */
      })

      //3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted () {
      
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
    height: calc(100% - 44px - 49px);
  }
</style>
