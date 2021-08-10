import Vue from 'vue'
import VueRouter from 'vue-router'

//进行懒加载  进行完懒加载之后 在APP.vue里面添加router-view
const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')
    //1、安装插件 
Vue.use(VueRouter)

//2、创建router
const routes = [
    //配置对应的映射关系
    { //此处为重定向
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]
const router = new VueRouter({
    //此处传入属性 可以写在里面 也可以抽离出去
    routes,
    mode: 'history'
})

//3、导出router  然后进行第四步：在main.js里面进行挂载
export default router