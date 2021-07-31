<template>
  <div class="tab-control">
    <!-- 根据传入的数组来决定需要几个div  动态绑定class -->
    <div v-for="(item, index) in titles" 
      :key="item.index" class="tab-control-item" 
      :class="{active: index === currentIndex}" 
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      //使用时只需要传进文字来就行
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    //实现当点击文字时变颜色且加下划线
    data () {
      return {
        //记录当前哪个文字被选中
        currentIndex:0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        // 用自定义事件将点击传送到外部使用emit  如果是外部往内部则用props
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
.tab-control {
  display: flex;
  flex: 1;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item {
  display: flex;
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding-left: 45px;
}

.active {
  color: rgb(255, 129, 152);
  /* border-bottom:3px solid rgb(255, 129, 152); */
}
.active span {
  border-bottom:3px solid rgb(255, 129, 152);
}
</style>
