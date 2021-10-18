<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <swiper :imgList="imgList"></swiper>
    <!-- 快速访问按钮区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <router-link
        :to="{ name: 'news_list' }"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"
      >
        <img src="../../assets/images/menu1.png" />
        <div class="mui-media-body">新闻资讯</div>
      </router-link>
      <router-link
        :to="{ name: 'photo_list' }"
        class="title mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"
      >
        <img src="../../assets/images/menu2.png" />
        <div class="mui-media-body">图片分享</div>
      </router-link>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link :to="{ name: 'category' }" class="title">
          <img src="../../assets/images/menu3.png" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <img src="../../assets/images/menu4.png" />
        <div class="mui-media-body">留言反馈</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <img src="../../assets/images/menu5.png" />
        <div class="mui-media-body">视频专区</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <img src="../../assets/images/menu6.png" />
        <div class="mui-media-body">联系我们</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper/Swiper.vue'
export default {
  name: 'Home',
  data () {
    return {
      imgList: []
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    getImgList () {
      // 当需要显示加载提示框时，调用 open 方法
      this.$indicator.open({
        text: '加载中'
      })
      this.$http.get('imglist').then(res => {
        // 数据获取成功后，调用 close 方法将其关闭
        this.$indicator.close()
        if (res.data.code === 0) {
          // 加载失败时通过提示框提示用户
          this.$toast('加载轮播图失败')
        } else {
          this.imgList = res.data.data
        }
      })
    }
  },
  components: {
    Swiper
  }
}
</script>

<style lang="less" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 img {
  width: 60px;
  height: 60px;
}
.mui-table-view-cell > a.title {
  display: inline;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
.mui-media-body {
  font-size: 14px;
}
</style>
