<template>
  <div class="pay-list">
    <div
      class="pay"
      v-for="order in orderlist"
      :key="order.id"
    >
      <div class="pay-header">
        <span class="title">{{ order.create_time }}</span>
        <span
          v-if="order.is_cancel"
          class="state"
        >交易关闭</span>
        <span v-else>
          <span
            class="state"
            v-if="order.is_pay"
          >买家已付款</span>
          <span
            class="state"
            v-else
          >等待买家付款</span>
        </span>

      </div>
      <div class="pay-content">
        <div
          class="cover"
          v-for="item in order.user_order_goods"
          :key="item.id"
        >
          <div class="img">
            <img :src="item.goods_goods.image">
          </div>
          <div class="img-tag">x{{ item.count }}</div>
        </div>
      </div>
      <p class="price">实付金额：<span>¥{{ order.price }}</span></p>
      <div class="pay-btn">
        <van-button
          round
          v-show="!order.is_cancel"
          @click="cancel(order.id)"
        >取消订单</van-button>
        <van-button
          round
          plain
          type="danger"
          @click="show(order.id)"
        >查看订单</van-button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'OrderList',
  data () {
    return {
      orderlist: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.$http.get('order/list').then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          if (res.data.data.length) {
            this.orderlist = res.data.data
          } else {
            this.$toast('订单为空')
          }
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    },
    // 查看订单详情
    show (id) {
      this.$router.push({ name: 'order_show', params: { id: id } })
    },
    // 取消订单
    cancel (id) {
      this.$http.post('order/cancel', { id: id }).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.getOrderList()
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.pay-list {
  .pay {
    margin: 12px;
    padding: 12px;
    border-radius: 8px;
    background-color: #fff;
    .pay-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: bolder;
      }
      .state {
        color: #f40;
        font-weight: 700;
        font-family: "微软雅黑";
      }
    }
    .pay-content {
      display: flex;
      .cover {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        position: relative;
        margin-right: 15px;
        .img {
          width: 70px;
          height: 70px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .img-tag {
          position: absolute;
          right: 0;
          bottom: 0;
          opacity: 0.5;
          background: #000;
          color: #fff;
          text-align: center;
          font-size: 12px;
          padding: 0 5px;
          border-radius: 2px 0;
        }
      }
    }
    .price {
      font-weight: 700;
      text-align: right;
    }
    .pay-btn {
      text-align: right;
    }
  }
}
</style>
