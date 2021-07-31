<template>
<!-- // 配置好之后，需要在哪里用到就去哪里引用就OK -->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>



<script>
  export default {
    name: "NavBar",
    components: {
    }
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    /* height: 44px; */
    line-height: 44px;
    text-align: center;
    /* 加阴影 */
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    /* position: fixed; */
  }

  .left, .right {
    width: 60px;

  }

  .center {
    flex: 1;
    
  }
</style>