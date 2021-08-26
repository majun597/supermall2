<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick" />
      <span>全选</span >
    </div>
    <div class="price">
      合计: {{totalprice}}
    </div>
    <div class="calculate" @click="jiesuan">
      去结算:({{cartLength}})
    </div>
    <toast :message="message" :show="show" class="cartToast"/>
  </div>

</template>

<script>
  import CheckButton from '../../../components/content/checkButton/CheckButton'
  import Toast from '../../../components/common/toast/Toast'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
      Toast
    },
    data() {
      return {
        show: false,
        message: ''
      }
    },
    computed: {
      //计算商品总价
      totalprice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      //计算商品总数
      cartLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) {
          return false
        }

        //1、使用filter
        return !(this.$store.state.cartList.filter(item => !item.checked).length)

        //2、使用find
        //return !this.$store.state.cartList.find(item => !item.checked)

        //3、普通遍历
        // for (let item of this.$store.state.cartList) {
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {// 部分选中或全部不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      jiesuan() {
        if (this.$store.state.cartList.length === 0) {
          this.show = true;
          this.message = '请选择至少一个商品';
           setTimeout(() => {
             this.show = false;
             this.message = ''
           },1500)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    background-color: #eeeeee;
    line-height: 40px;
    font-size: 14px;
    /* align-items: center; */
  }
  .check-content {
    display: flex;
    line-height: 40px;
    align-items: center;
    margin-left: 10px;


  }
  .check-button {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 25px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
  }
  .calculate {
    position:absolute;
    right:0px;
    width: 100px;
    float: right;
    /* margin-left: 124px; */
    background-color: rgb(255, 71, 13);
    text-align: center;
  }

  .cartToast {
    line-height: 20px;
  }
</style>
