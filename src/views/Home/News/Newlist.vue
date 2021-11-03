<template>
  <div>
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in newlist" :key="index">
          <!-- 使用动态命名路由:通过params传参进行获取相应数据 -->
          <router-link :to="{ name: 'news_show', params: { id: item.id } }" tag="div">
            <img :src="item.img_url" alt />
            <div class="newtitle">
              <h3>{{ item.title }}</h3>
              <p>
                <span>发布时间：{{ item.add_time }}</span>
              </p>
            </div>
          </router-link>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'NewList',
  data () {
    return {
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      newlist: [],
      // loading 是否正在加载下一页数据，如果loading为true，则不会反复触发load事件
      loading: false,
      // 所有的数据都加载完毕，如果没有更多数据了，一定要把finished改成true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  created () {
    this.getNewsList(this.page, this.limit)
  },
  methods: {
    // 获取新闻数据
    async getNewsList (isRefresh) {
      var _this = this
      const { data: res } = await this.$http.get('news/list', {
        params: {
          page: _this.page,
          limit: _this.limit
        }
      })
      if (isRefresh) {
        // 证明是下拉刷新，新数据在前，旧数据在后
        // this.newlist = [新数据,旧数据]
        this.newlist = [...res.message, ...this.newlist]
      } else {
        // 证明是上拉加载更过，旧数据在前，新数据在后
        // this.newlist = [旧数据, 新数据]
        this.newlist = [...this.newlist, ...res.message]
        this.loading = false
      }
      // console.log(res.message.length)
      if (res.length === 0) {
        // 证明有下一页数据。直接把finished改为true，表示数据已经请求完毕
        this.finished = true
      }
    },
    onLoad () {
      // 让页码值+1
      this.page++
      // 重新请求接口获取数据
      this.getNewsList()
    },
    onRefresh () {
      // 让页码值+1
      this.page++
      this.getNewsList(true)
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0 !important;
  padding: 0;
}
.van-cell div {
  display: flex;
  flex-direction: row;
}
.van-cell img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  line-height: 60px;
}
.newtitle {
  display: flex;
  flex-direction: column !important;
}
.newtitle h3 {
  width: 100%;
  min-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
}
.newtitle p span {
  font-size: 12px;
  color: rgb(130, 140, 155);
}
</style>
