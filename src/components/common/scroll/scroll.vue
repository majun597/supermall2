<template>
  <div class="wrapper" ref="wrapper">
   <div class="content">
     <slot></slot>
   </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll' 
  import ObserveDOM from '@better-scroll/observe-dom'
  BScroll.use(ObserveDOM)

  export default {
    name: "scroll",
    props: {
      //设置probeType属性 默认是0 如果用户想实时监听可以在使用的时候改成3
      probeType: {
        type: Number,
        default: 0
      },
      //设置pullupload属性 即上拉加载更多属性 默认是false 
      pullUpLoad: {
        type: Boolean,
        // default: false,
        default: true
      }
    },
    data () {
      return {
        scroll: null
      }
    },
    //生命周期函数
    mounted () {
      this.$nextTick(() => {
         //ref如果是绑定在组件中的, 那么通过**this.$refs.refname**获取到的是一个组件对象.
         //ref如果是绑定在普通的元素中, 那么通过**this.$refs.refname**获取到的是一个元素对象.
          //1、创建Bscroll对象
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            //解决better-scroll滑动bug问题
            observeDOM: true,
            observeImage: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
            keepAlive:true
          })
          //回到顶部
         // this.scroll.scrollTo(0,0)

          //2、监听滚动的位置(当probetype=2或3时才要监听)
         if (this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll', (position) => {
            //自定义一个事件 然后将事件发送出去 
            this.$emit('scroll', position)
          })
         }
          //3、监听上拉事件
          this.scroll.on('pullingUp', () => {
            // console.log('上拉加载更多');
            //自定义一个事件 然后将事件发送出去 
            this.$emit('pullingUp')
          })
      })
    },
    methods: {
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      scrollTo(x, y, time) {
        // this.scroll.scrollTo(x, y, time)
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      //定义完成上拉操作的方法
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 100%;
  }
</style>
