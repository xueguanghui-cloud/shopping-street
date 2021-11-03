<template>
  <div>
    <router-link
      :to="{ name: 'goods_info', params: {id: good.id} }"
      v-for="good in goodslist"
      :key="good.id"
    >
      <van-card
        :num="good.num"
        tag="11:11"
        :price="good.price"
        :desc="good.content"
        :title="good.name"
        :thumb="good.image"
      />
    </router-link>
    <van-button
      type="default"
      size="large"
      icon="ellipsis"
      v-if="goodslist.length !== 0"
      @click="getMore"
    >加载更多</van-button>
  </div>
</template>

<script>
export default {
  name: 'Goodlist',
  data () {
    return {
      // 搜索关键词
      value: '',
      goodslist: [],
      last_id: 0
    }
  },
  props: ['category_id'],
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      const params = { last_id: this.last_id, category_id: this.category_id }
      this.$http.get('goodslist', { params: params }).then(res => {
        if (res.data.code === 1) {
          // 判断最新一次的获取商品的数量是否为大于0，
          // 如果大于零则将此数据添加到goodslist中，
          // 否则就提示用户列表为空
          if (res.data.data.length > 0) {
            this.goodslist = this.goodslist.concat(res.data.data)
            this.last_id = res.data.data[res.data.data.length - 1].id
          } else if (this.goodslist.length > 0) {
            this.$toast('已经到达底部了')
          } else {
            this.$toast('列表为空')
          }
        }
      })
    },
    getMore () {
      this.getGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>
.van-card {
  .van-card__price {
    span {
      color: #f00;
    }
  }
}
</style>
