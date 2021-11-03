<template>
  <div>
    <van-overlay :show="show" v-model="show">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" />
      </div>
    </van-overlay>
    <Swiper :images="imgList"></Swiper>
    <van-row>
      <van-col span="8">
        <router-link to="/home/new">
          <img src="@/assets/images/menu1.png" alt />
          <span>新闻中心</span>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to="/home/pic">
          <img src="@/assets/images/menu2.png" alt />
          <span>图片分享</span>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to>
          <img src="@/assets/images/menu3.png" alt />
          <span>视频购买</span>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to>
          <img src="@/assets/images/menu4.png" alt />
          <span>留言反馈</span>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to>
          <img src="@/assets/images/menu5.png" alt />
          <span>视频专区</span>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to>
          <img src="@/assets/images/menu6.png" alt />
          <span>联系我们</span>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// 导入Swiper
import Swiper from '@/components/Swiper/Swiper.vue'
// import { Popup } from 'vant'
export default {
  name: 'Home',
  data () {
    return {
      show: false,
      imgList: []
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    getImgList () {
      // 当需要显示加载提示框时,设置show为true
      this.show = true
      // 调用$http方法获取轮播图数据
      this.$http.get('imgList').then((res) => {
        // 数据获取成功后，调设置show为false，关闭加载框
        this.show = false
        this.imgList = res.data.data
      })
    }
  },
  components: {
    Swiper
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-row {
  box-shadow: 10px 10px 10px #efeff4;
}
.van-col {
  padding: 11px 15px;
  text-align: center;
}
.van-col img {
  width: 60px;
  height: 60px;
}
.van-col span {
  display: block;
  color: initial;
}
</style>
