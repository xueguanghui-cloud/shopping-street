<template>
  <div class="shopcart-container">
    <!-- 收货地址区域 -->
    <div
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
        <h3><span class="name">{{ order.address_name }}</span><span class="tel">{{ order.address_tel }}</span></h3>
        <p>{{ order.address_area }} {{ order.address_detail }}</p>
      </div>
      <van-icon name="arrow" />
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <van-card
        v-for="item in order.user_order_goods"
        :key="item.id"
        :num="item.count"
        price="2.00"
        :title="item.goods_goods.name"
        :thumb="item.goods_goods.image"
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
        <span class="red">¥{{ order.price }}</span>
      </li>
      <li class="fare-price flex">
        <span>运费</span>
        <span class="red">¥0.00</span>
      </li>
      <li class="fare-price flex">
        <span><strong>总价</strong></span>
        <span class="red">¥{{ order.price }}</span>
      </li>
      <!-- 创建订单按钮 -->
      <div class="flex">
        <van-button
          type="danger"
          block
          :disabled="Boolean(order.is_cancel)"
          @click="payment"
        >立即支付</van-button>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderShow',
  props: ['id'],
  data () {
    return {
      order: {},
      note: '选填,给商家留言'
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      var params = { id: this.id }
      this.$http.get('order/show', { params: params }).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.order = res.data.data
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    },
    // 创建订单
    payment () {
      this.$toast('支付成功，花费了' + this.order.price + '元')
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
