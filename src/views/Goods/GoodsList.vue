<template>
  <div>
    <div class="goods-list">
      <div class="goods-item" v-for="item in goodslist" :key="item.id">
        <!-- 使用<router-link>组件实现导航的跳转，name的值为设置路由时的信息页的name值。 -->
        <router-link :to="{ name: 'goods_info', params: { id: item.id } }">
          <img :src="item.image" />
          <h1 class="title">{{ item.name }}</h1>
          <p class="info">
            <span class="price">¥{{ item.price }}</span>
            <span class="sell">剩余 {{ item.num }} 件</span>
          </p>
        </router-link>
      </div>
      <mt-button class="more" v-if="goodslist.length !== 0" size="large" @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data () {
    return {
      // 存放接口返回数据：商品列表信息
      goodslist: [],
      last_id: 0
    }
  },
  props: ['category_id'],
  created  () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$indicator.open({
        text: '加载中'
      })
      const params = { last_id: this.last_id, category_id: this.category_id }
      this.$http.get('goodslist', { params: params }).then(res => {
        this.$indicator.close()
        if (res.data.code === 1) {
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
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  .goods-item {
    width: calc(calc(100% / 2) - 10px);
    margin: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      color: #333;
      margin: 10px 0;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      .price {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .sell {
        font-size: 13px;
      }
    }
  }
  .more {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
