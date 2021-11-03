import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// auth.js文件一定要放在axios前面
import auth from '@/auth.js'
// 导入axios
import request from '@/Api/index.js'

// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(auth)
Vue.use(Vant)
// 将axios注册为vue插件
Vue.use(request)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
