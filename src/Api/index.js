// 封装获取数据接口
import axios from 'axios'
import config from './config.js'

// 暴露
export default {
  install: function (vue) {
    var auth = vue.prototype.$auth
    const obj = axios.create({
      baseURL: config.baseURL
    })
    // 将保存的session_id放入到下次请求的header中
    obj.interceptors.request.use(function (conf) {
      conf.headers.Authorization = auth.getAuthorization()
      return conf
    })
    vue.prototype.$http = obj
  }
}
