import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入需要的组件
import Home from '@/views/Home/Home.vue'
import Sort from '@/views/Sort/Sort.vue'
import Cart from '@/views/Cart/Cart.vue'
import User from '@/views/User/User.vue'
import Newlist from '@/views/Home/News/Newlist.vue'
import Newsinfo from '@/views/Home/News/Newinfo.vue'
import Photolist from '@/views/Home/Photo/Photolist.vue'
import PhotoInfo from '@/views/Home/Photo/Photoinfo.vue'
import Goodslist from '@/views/Sort/Good/Goodlist.vue'
import Goodsinfo from '@/views/Sort/Good/Goodsinfo.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Address from '@/views/User/Address/Address.vue'
import AddressAdd from '@/views/User/Address/AddressAdd.vue'
import AddressEdit from '@/views/User/Address/AddressEdit.vue'
import OrderCreate from '@/views/Cart/Order/OrderCreate.vue'
import OrderList from '@/views/Cart/Order/OrderList.vue'
import OrderShow from '@/views/Cart/Order/OrderShow.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/sort', component: Sort, name: 'sort', meta: { title: '分类' } },
  { path: '/home', component: Home, name: 'home', meta: { title: '首页' } },
  { path: '/cart', component: Cart, name: 'cart', meta: { title: '购物车' } },
  { path: '/user', component: User, name: 'user', meta: { title: '我的' } },
  { path: '/home/new', component: Newlist, meta: { title: '新闻列表' } },
  { path: '/news/show/:id', component: Newsinfo, props: true, name: 'news_show', meta: { title: '查看新闻资讯' } },
  { path: '/home/pic', component: Photolist, meta: { title: '图片列表' } },
  { path: '/photo/show/:id', component: PhotoInfo, props: true, name: 'photo_show', meta: { title: '查看图片' } },
  { path: '/goodslist/:category_id', component: Goodslist, props: true, name: 'goods_list', meta: { title: '商品列表' } },
  { path: '/goodsinfo/:id', component: Goodsinfo, props: true, name: 'goods_info', meta: { title: '商品详情' } },
  { path: '/login', component: Login, name: 'login', meta: { title: '登录' } },
  { path: '/register', component: Register, name: 'register', meta: { title: '注册' } },
  { path: '/user/address', component: Address, name: 'address', meta: { title: '收货地址' } },
  { path: '/user/address/add', component: AddressAdd, name: 'addressadd', meta: { title: '新增收货地址' } },
  { path: '/user/address/edit/:id', component: AddressEdit, props: true, name: 'address_edit', meta: { title: '编辑收货地址' } },
  { path: '/order/create', component: OrderCreate, name: 'order_create', meta: { title: '订单详情' } },
  { path: '/user/address/select', component: Address, name: 'address_select', meta: { title: '选择收货地址' } },
  { path: '/order/list', component: OrderList, name: 'order_list', meta: { title: '我的订单' } },
  { path: '/order/show/:id', component: OrderShow, props: true, name: 'order_show', meta: { title: '查看订单' } }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // 每次当路由信息发生改变时，获取title信息
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
