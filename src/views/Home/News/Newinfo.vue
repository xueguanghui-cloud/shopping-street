<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{ newinfolist.title }}</h1>
    <!-- 子标题 -->
    <div class="newsinfo-nav">
      <span>发表时间：{{ newinfolist.add_time }}</span>
      <span>点击：{{newinfolist.click}}次</span>
    </div>
    <van-divider />
    <!-- 内容区域 -->
    <div
      class="content"
      v-html="newinfolist.content"
    ></div>
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
  name: 'Newinfo',
  data () {
    return {
      id: this.$route.params.id,
      newinfolist: []
    }
  },
  created () {
    this.getNewsinfo()
  },
  methods: {
    // 获取新闻数据
    getNewsinfo () {
      this.$http.get('news/show', { params: { id: this.id } }).then(res => {
        // 状态0：成功；1代表失败
        if (res.data.status === 0) {
          this.newinfolist = res.data.message[0]
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.newsinfo-container {
  padding: 0 10px;
  .title {
    font-size: 20px;
    font-weight: 600;
    font-family: "PingFangSC-Medium";
    color: #222;
  }
  .newsinfo-nav {
    display: flex;
    justify-content: space-between;
    span {
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .content {
    p {
      color: #828c9b;
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
