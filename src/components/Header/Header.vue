<template>
  <div>
    <!-- 顶部区域 -->
    <van-nav-bar
      v-if="showBack"
      fixed
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-nav-bar
      v-else
      fixed
      :title="$route.meta.title"
    >
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // 控制返回按钮的显示与隐藏
      showBack: true
    }
  },
  created () {
    // 判断页面初始化时，如果当前是首页那么隐藏返回按钮，否则显示返回按钮
    this.showBack = this.$route.path !== '/home'
  },
  watch: {
    // 监听路由变化，判断是否显示返回按钮
    '$route.path' () {
      if (this.$route.path === '/home') {
        this.showBack = false
      } else if (this.$route.path === '/sort') {
        this.showBack = true
      } else if (this.$route.path === '/cart') {
        this.showBack = true
      } else if (this.$route.path === '/user') {
        this.showBack = true
      } else {
        this.showBack = true
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
