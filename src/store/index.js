// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
import user from './modules/user.js'
import shopcart from './modules/shopcart.js'

// 将Vuex安装为vue项目的插件
Vue.use(Vuex)

// 将Vuex实例暴露出去
export default new Vuex.Store({
  modules: {
    user,
    shopcart
  }
})
