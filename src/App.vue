<template>
  <div id="app">
    <!-- 顶部头部区域 -->
    <Header />
    <!-- router-view区域 -->
    <router-view></router-view>
    <!-- tabbar区域 -->
    <Tabbar />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Tabbar from '@/components/Tabbar/Tabbar.vue'
export default {
  name: 'App',
  watch: {
    // 监听路由变化，判断是否显示返回按钮
    '$route.path' () {
      if (this.$route.name === 'goods_list') {
        document.getElementById('app').style.paddingBottom = 0
      }
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      this.$http.get('user').then(res => {
        if (res.data.code === 1) {
          this.$store.commit('user/setUser', res.data.data)
        }
      })
    }
  },
  components: {
    Header,
    Tabbar
  }
}
</script>

<style lang="less">
body {
  background-color: #f7f8fa;
}
* {
  font-size: 15px;
}
#app {
  padding-top: 46px;
  padding-bottom: 50px;
  background-color: #f7f8fa;
}
.van-nav-bar {
  background-color: #008c8c !important;
}
.van-nav-bar__text,
.van-nav-bar .van-icon,
.van-nav-bar__title {
  color: #fff !important;
}
</style>
