<template>
  <div
    class="shopcart-container"
    v-show="showAddress"
  >
    <!-- 收货地址区域 -->
    <router-link
      :to="{name: 'address_select'}"
      tag="div"
      class="address-container"
      replace
    >
      <van-icon
        class="address-icon"
        name="location"
        color="#f40"
        size="2rem"
      />
      <div class="address-info">
        <h3><span class="name">{{ address.name }}</span><span class="tel">{{ address.tel }}</span></h3>
        <p>{{ address.area }} {{ address.detail }}</p>
      </div>
      <van-icon name="arrow" />
    </router-link>

    <!-- 商品列表 -->
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <van-card
        v-for="item in goodslist"
        :key="item.id"
        :num="item.count"
        price="2.00"
        :desc="item.content"
        :title="item.name"
        :thumb="item.image"
      />
      <!-- 配送信息 -->
      <div class="process-info">
        <p>
          <strong>配送服务</strong>
          <strong>快递运输</strong>
        </p>
        <p class="msg">
          <span>中小件送货时间</span>
          <span>工作日、双休日与节假日均可送货</span>
        </p>
      </div>
      <!-- 订单备注 -->
      <div class="store-info">
        <strong>订单备注</strong>
        <van-field
          v-model="note"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>

    </div>
    <!-- 运费信息 -->
    <ul class="fare-info">
      <li class="fare-price flex">
        <span>商品金额</span>
        <span class="red">¥{{ amount.toFixed(2) }}</span>
      </li>
      <li class="fare-price flex">
        <span>运费</span>
        <span class="red">¥0.00</span>
      </li>
      <li class="fare-price flex">
        <span><strong>总价</strong></span>
        <span class="red">¥{{ amount.toFixed(2) }}</span>
      </li>
      <!-- 创建订单按钮 -->
      <div class="flex">
        <van-button
          type="danger"
          block
          @click="order"
        >创建订单</van-button>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'OrderCreate',
  data () {
    return {
      showAddress: false,
      goodslist: [],
      amount: 0,
      note: '选填,给商家留言',
      address: {},
      addressId: 0
    }
  },
  computed: {
    ...mapState('shopcart', ['buy']),
    ...mapGetters('shopcart', ['getBuy'])
  },
  created () {
    // 判断路由是否有参数id
    if (this.$route.params.id) {
      this.addressId = this.$route.params.id
    }
    this.getGoodsList()
    this.getAddress()
  },
  methods: {
    getGoodsList () {
      // 定义存放id的数组
      var idArr = []
      this.buy.forEach(item => idArr.push(item.id))
      // 判断是否有加入购物车的商品,如果没有,则return出去
      if (idArr.length <= 0) {
        return
      }
      var params = { ids: idArr }
      this.$http.get('shopcart', { params: params }).then(res => {
        if (res.data.code === 1) {
          this.goodslist = res.data.data
          // 定义总价格
          var amount = 0
          this.goodslist.forEach(item => {
            item.count = this.getBuy[item.id].count
            amount += item.count * item.price
          })
          this.amount = amount
        }
      })
    },
    getAddress () {
      var params = { id: this.addressId }
      this.$http.get('address/def', { params: params }).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          if (res.data.data) {
            this.address = res.data.data
            this.addressId = res.data.data.id
            this.showAddress = true
          } else {
            this.$toast('请先添加收货地址')
            this.$router.replace({ name: 'address_select' })
          }
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    },
    // 创建订单
    order () {
      var form = {
        address: this.addressId,
        goods: this.buy,
        note: this.note
      }
      this.$http.post('order/create', form).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.$toast(res.data.msg)
          this.$router.replace({ name: 'order_list' })
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.shopcart-container {
  padding-bottom: 155px;
  .address-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 12px;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    .address-icon {
      width: 40px;
    }
    .address-info {
      flex: 1;
      h3 {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        margin-bottom: 8px;
        line-height: 22px;
        font-weight: initial;
        .name {
          font-size: 18px;
        }
        .tel {
          padding-left: 10px;
          font-size: 14px;
          color: #969799;
        }
      }
      p {
        color: #323233;
        font-size: 13px;
        line-height: 18px;
      }
    }
  }
  .goods-list {
    .van-card {
      margin: 12px;
      border-radius: 8px;
      background-color: #fff;
    }
    .van-card__title {
      font-weight: bold;
    }
    .van-card__price {
      color: #ff0000;
      font-weight: 700;
    }
    .process-info {
      padding: 12px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      margin: 12px;
      border-radius: 8px;
      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        color: #333;
        margin: 0;
        margin-bottom: 10px;
      }
      p.msg span {
        font-size: 14px;
        color: #999;
      }
    }
    .store-info {
      padding: 10px;
      margin: 12px;
      border-radius: 8px;
      background-color: #fff;
      .van-cell {
        margin-top: 10px;
        border-radius: 5px;
        border: 1px solid #eee;
      }
    }
  }
  .fare-info {
    padding: 10px;
    margin: 10px 0 0 0;
    font-size: 14px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 2px;
    background-color: #fff;
    background-clip: padding-box;
    box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
    .fare-price {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      .red {
        color: #ff0000;
      }
    }
  }
}
</style>
