<template>
  <div>
    <van-tabbar
      route
      v-show="showTabbar"
    >
      <van-tabbar-item
        to="/home"
        icon="home-o"
      >首页</van-tabbar-item>
      <van-tabbar-item
        to="/sort"
        icon="bars"
      >分类</van-tabbar-item>
      <van-tabbar-item
        to="/cart"
        icon="shopping-cart-o"
        :badge="$store.getters['shopcart/getSelectedCount']"
      >购物车</van-tabbar-item>
      <van-tabbar-item
        to="/user"
        icon="user-o"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbaar',
  data () {
    return {
      // 控制底部tabbar导航的显示与隐藏
      showTabbar: false
    }
  },
  created () {
    if (this.$route.path === '/home' || this.$route.path === '/sort' || this.$route.path === '/cart' || this.$route.path === '/user') {
      this.showTabbar = true
    }
  },
  watch: {
    // 监听路由变化，判断是否显示返回按钮
    '$route.path' () {
      if (this.$route.path === '/home') {
        this.showTabbar = true
      } else if (this.$route.path === '/sort') {
        this.showTabbar = true
      } else if (this.$route.path === '/cart') {
        this.showTabbar = true
      } else if (this.$route.path === '/user') {
        this.showTabbar = true
      } else {
        this.showTabbar = false
      }
    }
  }
}
</script>

<style>
</style>
