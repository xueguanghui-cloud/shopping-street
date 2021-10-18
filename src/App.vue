<template>
  <div id="app" class="container">
    <mt-header fixed :title="$route.meta.title">
      <!-- 返回按钮 -->
      <span slot="left" @click="goBack" v-show="showBack">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <Tabbar></Tabbar>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// 导入Tabbar组件
import Tabbar from '@/components/Tabbar/Tabber.vue'
export default {
  name: 'App',
  data () {
    return {
      // 判断是否显示 “返回” 按钮
      showBack: false
    }
  },
  methods: {
    // 定义goBack()事件实现单击按钮，返回上一级页面
    goBack () {
      this.$router.back()
    },
    checkLogin () {
      this.$indicator.open({
        text: '加载中'
      })
      this.$http.get('user').then(res => {
        if (res.data.code === 1) {
          this.$store.commit('user/setUser', res.data.data)
        }
        this.$indicator.close()
      })
    }
  },
  watch: {
    // watch监听路由，如果当前是首页那么隐藏返回按钮，否则显示返回按钮
    '$route.path' (newVal) {
      this.showBack = newVal !== '/home'
    }
  },
  created () {
    // 判断页面初始化时，如果当前是首页那么隐藏返回按钮，否则显示返回按钮
    this.showBack = this.$route.path !== '/home'
    this.checkLogin()
  },
  components: {
    Tabbar
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}
.container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
