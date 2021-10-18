import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入store
import store from '@/store/index.js'
// 引入mui组件样式文件
import '@/lib/mui/css/mui.min.css'
import '@/lib/mui/fonts/mui.ttf'
// 引入 Mint 组件
import Mint from 'mint-ui'
// 引入 mint.css 组件
import 'mint-ui/lib/style.css'
// 引入auth
import auth from '@/auth.js'
// 引入axios
import request from '@/request/index.js'
// 引入vue-preview
import VuePreview from 'vue-preview'

Vue.use(VuePreview)

// 将Mint安装为vue的插件
Vue.use(Mint)

// auth.js文件一定要放在axios前面
Vue.use(auth)

// 将axios安装为Vue的插件
Vue.use(request)

Vue.config.productionTip = false

new Vue({
  router,
  // 注册store
  store,
  render: h => h(App)
}).$mount('#app')
