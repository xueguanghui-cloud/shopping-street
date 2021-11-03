<template>
  <div class="photoinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{ photoinfo.title }}</h1>
    <!-- 子标题 -->
    <div class="photoinfo-nav">
      <span>发表时间：{{ photoinfo.add_time }}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </div>
    <van-divider />
    <!-- 内容区域 -->
    <div class="content">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          class="photo-item"
        >
          <img
            :src="item.src"
            alt
          />
        </li>
      </ul>
      <!-- 图片内容区域 -->
      <div
        class="cont"
        v-html="photoinfo.content"
      ></div>
    </div>
    <van-field
      center
      clearable
      placeholder="来说两句"
    >
      <template #button>
        <van-button
          size="small"
          type="primary"
        >发布</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: 'Photoinfo',
  data () {
    return {
      current: 0,
      id: this.$route.params.id,
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组
    }
  },
  created () {
    this.getPhotoInfo()
    this.getPhotoList()
  },
  methods: {
    getPhotoInfo () {
      this.$http.get('photo/getimageInfo', { params: { id: this.id } }).then(res => {
        if (res.status === 200) {
          this.photoinfo = res.data.message[0]
        }
      })
    },
    getPhotoList () {
      // 获取缩略图
      this.$http.get('photo/getthumimages', { params: { id: this.id } }).then(res => {
        if (res.status === 200) {
          this.list = res.data.message
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.photoinfo-container {
  padding: 0 10px;
  .title {
    font-size: 20px;
    font-weight: 600;
    font-family: "PingFangSC-Medium";
    color: #222;
  }
  .photoinfo-nav {
    display: flex;
    justify-content: space-between;
    span {
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .content {
    .photo-item {
      text-align: center;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .cont {
      margin: 15px 0;
    }
  }
  /deep/.van-cell {
    .van-field__value {
      border: 1px solid #828c9b;
      border-radius: 20px;
      padding: 0 0 0 1em;
      input {
        color: #878787;
        background: #f6f7f9;
      }
      button {
        padding: 0 15px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
  }
}
</style>
