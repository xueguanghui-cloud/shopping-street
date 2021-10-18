// 登录成功以后，将用户信息通过store保存
const state = {
  id: 0,
  username: ''
}

const getters = {
  // isLogin()方法判断是否已经登录
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
