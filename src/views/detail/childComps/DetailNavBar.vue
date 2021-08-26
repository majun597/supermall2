<template>
  <div class="feature">
    <nav-bar> 
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
            :key="item.index" 
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)"> 
            {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../../components/common/navbar/NavBar'
  import scroll from '../../../components/common/scroll/scroll'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
      scroll
    },
    data () {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      //先监听点击 然后返回上一页
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: red;
  }
  .back img {
    margin-top: 10px;
  }
</style>
