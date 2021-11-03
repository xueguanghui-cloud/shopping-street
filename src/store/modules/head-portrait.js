// 头像存储模块

function setItem (url) {
  localStorage.setItem('elephant', url)
}

function getItem (name) {
  return JSON.parse(localStorage.getItem(name) || '[]')
}

const state = {
  headPortrait: getItem('headPortrait')
}
const getters = {}
const actions = {}
const mutations = {
  addHeadPortrait (state, user) {
    // 判断用户头像是否已经存在
    let flag = false
    state.headPortrait.some(item => {
      if (item.name === user.name) {
        item.url += user.url
        flag = true
        return true
      }
    })
    if (!flag) {
      state.headPortrait.push(user)
    }
    // setItem('car',state.car)表示重新设置car的值
    setItem('car', state.car)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
