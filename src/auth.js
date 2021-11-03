// 记住登录状态模块
var auth = {
  getAuthorization () {
    // 获取请求头
    return localStorage.getItem('Authorization')
  },
  setAuthorization (Authorization) {
    // 保存请求头
    localStorage.setItem('Authorization', Authorization)
  }
}

export default {
  install: function (vue) {
    vue.prototype.$auth = auth
  }
}
