<template>
  <div class="login-container">
    <van-form @submit="onRegister">
      <van-field
        v-model="regForm.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="regForm.password"
        type="regForm.password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="regForm.pwdConfirm"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请确认密码' }]"
      />
      <van-field
        v-model="regForm.email"
        type="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
        <div class="link-area">
          <router-link :to="{ name: 'login' }">账号密码登录</router-link>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      regForm: {
        username: '',
        password: '',
        pwdConfirm: '',
        email: ''
      }
    }
  },
  methods: {
    onRegister (values) {
      if (this.regForm.username === '') {
        this.$toast('账号不能为空')
        return
      } else if (this.regForm.password === '') {
        this.$toast('密码不能为空')
        return
      } else if (this.regForm.password !== this.regForm.pwdConfirm) {
        this.$toast('密码两次输入不一致')
        return
      } else if (this.regForm.email === '') {
        this.$toast('邮箱不能为空')
        return
      }
      this.$http.post('register', this.regForm).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else {
          this.$store.commit('user/setUser', res.data.data)
          this.$auth.setAuthorization(res.data.data.session_id)
          this.$toast(res.data.msg)
          this.$router.replace({ name: 'user' })
        }
      }).catch(() => {
        this.$toast('注册失败')
      })
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
