<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginForm.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
        <div class="link-area">
          <router-link :to="{ name: 'register' }">还没有账号？前往注册</router-link>
        </div>
      </div>
    </van-form>
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
    onSubmit (values) {
      // console.log('submit', values)
      if (this.loginForm.username === '' || this.loginForm.username === '') {
        this.$toast('账号或密码不能为空')
      } else {
        this.$http.post('login', this.loginForm).then(res => {
          if (res.data.code === 0) {
            this.$toast(res.data.msg)
          } else {
            // 登录成功
            // 将用户信息保存到store中
            this.$store.commit('user/setUser', res.data.data)
            // 将请求头保存到auth
            this.$auth.setAuthorization(res.data.data.session_id)
            this.$toast(res.data.msg)
            // 跳转到user页面
            this.$router.replace({ name: 'user' })
          }
        }).catch(() => {
          this.$toast('登录失败')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .link-area {
    text-align: center;
  }
}
</style>
