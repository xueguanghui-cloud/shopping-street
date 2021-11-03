<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <van-tabs>
      <van-tab v-for="item in cates" :title="item.title" :key="item.id">
        <ul class="photo-list">
          <router-link
            :to="{ name: 'photo_show', params: { id: item.id }}"
            tag="li"
            class="list"
            v-for="item in list"
            :key="item.id"
          >
            <p class="title">{{ item.title }}</p>
            <div class="viewer">
              <img :src="item.img_url" alt />
            </div>
            <div class="root-sec">
              <span>星动最娱乐</span>
            </div>
            <van-divider />
          </router-link>
        </ul>
      </van-tab>
    </van-tabs>
    <!-- 图片列表区域 -->
  </div>
</template>

<script>
export default {
  name: 'Photolist',
  data () {
    return {
      cates: [], // 所有分类的列表数组
      list: [], // 图片列表的数组
      cateId: 0
    }
  },
  created () {
    this.getAllCategory()
    this.getPhotoListByCateId(0)
  },
  methods: {
    // 获取图片的分类
    getAllCategory () {
      this.$http.get('photo/getimgcategory').then(res => {
        if (res.status === 200) {
          // 手动拼接出一个最完整的分类列表
          // unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度
          res.data.message.unshift({ id: 0, title: '全部' })
          this.cates = res.data.message
        } else {
          this.$toast('加载失败')
        }
      })
    },
    getPhotoListByCateId (cateId) {
      // 根据分类Id,获取图片列表
      this.cateId = cateId
      this.$http.get('photo/getimages/', { params: { id: cateId } }).then(res => {
        if (res.status === 200) {
          this.list = res.data.message
        } else {
          this.$toast('加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__line {
  background-color: #008c8c;
}
.photo-list {
  margin: 0 16px;
  .list {
    padding: 0.09rem 0px 0.06rem;
    .van-divider {
      margin: 0;
    }
    .title {
      font-size: 18px;
    }
    .viewer {
      max-height: 343px;
      margin-bottom: 0.06rem;
      border-radius: 0.04rem;
      overflow: hidden;
      background-color: rgb(234, 234, 234);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      img {
        width: 100%;
      }
    }
    .root-sec {
      line-height: 1.4em;
      span {
        display: inline-block;
        vertical-align: top;
        font-size: 0.12rem;
        font-weight: 400;
        color: rgb(130, 140, 155);
        margin-right: 0.09rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
    }
  }
}
</style>
