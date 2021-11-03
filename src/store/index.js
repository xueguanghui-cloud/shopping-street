import Vue from 'vue'
import Vuex from 'vuex'
// 导入shopcart.js
import shopcart from './modules/shopcart'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    shopcart,
    user
  }
})
