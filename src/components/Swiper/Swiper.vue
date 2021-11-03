<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img :src="image.img" alt />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: ['images']
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  height: 200px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>
