import axios from 'axios'
import config from './config.js'

export default {
  install: function (vue) {
    var auth = vue.prototype.$auth
    var obj = axios.create({
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
