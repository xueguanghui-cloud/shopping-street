<template>
  <div class="goodsinfo-container">
    <!-- 商品详情图展示 -->
    <Swiper :images="goodsinfo.album"></Swiper>
    <!-- 双十一优惠 -->
    <div class="detail">
      <div class="contont">
        <div class="price">
          ￥
          <strong>{{ goodsinfo.price }}</strong>
        </div>
        <div class="countdown">
          <p class="countdown_text">距结束还剩</p>
          <van-count-down
            :time="time"
            format="DD 天 HH:mm:ss"
          />
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="shop-info">
      <div class="shop">
        <h1 class="shop-name">{{ goodsinfo.name }}</h1>
        <a
          href="#"
          class="collection"
        >
          <van-icon name="like-o" />
        </a>
      </div>
    </div>
    <!-- 提示信息 -->
    <van-notice-bar
      color="#e93b3d"
      background="rgba(174, 101, 162, 0.3)"
      left-icon="info-o"
    >{{ goodsinfo.content }}</van-notice-bar>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <!-- 购买数量 -->
    <div class="shop-num">
      <p>购买数量</p>
      <!-- max表示用户所能购买的最大值；initcount表示numbox的初始值；goodsid商品的id -->
      <Numbox
        @count="countChanged"
        :max="goodsinfo.num"
        initcount="1"
        :goodsid="goodsinfo.id"
      ></Numbox>
    </div>
    <!-- 底部购买区域 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
      />
      <van-goods-action-icon
        icon="shop-o"
        text="店铺"
      />
      <van-goods-action-button
        :disabled='!Boolean(goodsinfo.num)'
        type="warning"
        @click="addShopcart"
        text="加入购物车"
      />
      <van-goods-action-button
        :disabled='!Boolean(goodsinfo.num)'
        type="danger"
        @click="buy"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper/Swiper.vue'
import Numbox from '@/components/Numbox/Numbox.vue'
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  name: 'Goodsinfo',
  data () {
    return {
      goodsinfo: [],
      time: 30 * 60 * 60 * 1000,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      selectedCount: 1 // 保存商品数量，默认是1
    }
  },
  props: ['id'],
  created  () {
    this.getGoodsinfo()
  },
  methods: {
    // 获取商品信息
    getGoodsinfo () {
      this.$http.get('goodsinfo', { params: { id: this.id } }).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          if (res.data.data) {
            this.goodsinfo = res.data.data
          } else {
            this.$messagebox.alert('商品不存在').then(() => {
              this.$router.back(-1)
            })
          }
        } else {
          this.$toast('加载失败，服务器异常')
        }
      })
    },
    // 优惠卷信息
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange (code) {
      this.coupons.push(coupon)
    },
    // 接收子组件传递过来的最新数量
    countChanged (val) {
      // 保存购买数量
      this.selectedCount = val.count
    },
    // 加入购物车
    addShopcart () {
      // 通过this.$store获取到store实例对象,调用commit()方法实现添加商品到购物车的功能,
      // 参数1：表示在shopcart.js中定义的addCar()函数
      // 参数2：商品的id、商品的数量和商品的选中状态
      this.$store.commit('shopcart/addCar', {
        id: this.id,
        count: this.selectedCount,
        selected: true
      })
    },
    // 立即购买
    buy () {
      this.$store.commit('shopcart/setBuy', { id: this.$props.id, count: this.selectedCount })
      this.$router.push({ name: 'order_create' })
    }
  },
  components: {
    Swiper,
    Numbox
  }
}
</script>

<style lang="less" scoped>
.goodsinfo-container {
  .detail {
    width: 100%;
    height: 50px;
    // padding-top: 13.3333%;
    overflow: hidden;
    background: url("../../../assets/images/price-bck.png");
    background-size: cover;
    position: relative;
    z-index: 5;
    .contont {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .price {
        line-height: 1;
        color: #fff;
        margin: 0 6px 0 54px;
        font-size: 16px;
        font-family: JDZH-Regular;
        strong {
          font-size: 24px;
        }
      }
      .countdown {
        color: #5324b3;
        width: 28.8%;
        background-color: transparent;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        .countdown_text {
          color: #5324b3;
          line-height: 1;
          margin-bottom: 6px;
          font-size: 10px;
        }
      }
    }
  }
  .shop-info {
    padding: 12px 18px;
    .shop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .shop-name {
        font-weight: 700;
        line-height: 21px;
        font-size: 16px;
      }
      .collection {
        font-size: 16px;
        .van-icon {
          font-weight: bolder;
        }
      }
    }
  }
  .shop-num {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 16px 0px 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebedf0;
    p {
      margin: 0;
    }
  }
}
</style>
