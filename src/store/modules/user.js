// 保存用户信息模块
const state = {
  id: 0,
  username: ''
}
const getters = {
  // 判断用户是否已经登录
  isLogin (state) {
    return state.id !== 0
  }
}
const actions = {}
const mutations = {
  setUser (state, user) {
    state.id = user.id
    state.username = user.username
  },
  logout (state) {
    state.id = 0
    state.username = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
