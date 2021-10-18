<template>
  <div class="login">
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input
            v-model="loginForm.username"
            type="text"
            class="mui-input-clear mui-input"
            placeholder="请输入账号"
          />
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input
            v-model="loginForm.password"
            type="password"
            class="mui-input-clear mui-input"
            placeholder="请输入密码"
          />
        </div>
      </form>
      <div class="mui-content-padded">
        <button @click="login" type="button" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
        <div class="link-area">
          <a @click="register">还没有账号？前往注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // 判断用户输入的账号密码是否为空，如果为空，则提示用户
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$toast('账号或密码不能为空')
      } else {
        this.$http.post('login', this.loginForm).then(res => {
          if (res.data.code === 0) {
            // 登录失败，返回错误信息
            this.$toast(res.data.msg)
          } else {
            // 登录成功
            // 提交数据
            this.$store.commit('user/setUser', res.data.data)
            this.$auth.setAuthorization(res.data.data.session_id)
            // 返回提交成功的信息
            this.$toast(res.data.msg)
            // 跳转到用户页面
            this.$router.replace({ name: 'user' })
          }
        }).catch(() => {
          this.$toast('登录失败')
        })
      }
    },
    register () {
      // 去注册页面
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style lang="less" scoped>
.mui-input-group {
  margin-top: 10px;
  background-color: transparent;
}
.mui-input-group label {
  width: 22%;
}
.mui-input-row:last-child {
  background: #fff;
}
.mui-input-row {
  margin-top: 20px;
  background: #fff;
}
.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 78%;
}
.link-area {
  display: block;
  margin-top: 25px;
  text-align: center;
}
.mui-content-padded {
  margin-top: 30px;
}
</style>
