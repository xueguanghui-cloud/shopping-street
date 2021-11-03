/* eslint-disable no-dupe-keys */
<template>
  <ul class="cart-container">
    <li
      class="goods"
      v-for="(item, i) in goodslist"
      :key="item.id"
    >
      <van-swipe-cell>
        <van-cell :border="false">
          <!-- 左侧图片 -->
          <div class="thumb">
            <div class="custom-control custom-checkbox">
              <!-- 复选框 -->
              <input
                type="checkbox"
                class="custom-control-input"
                v-model="getGoodsSelected[item.id]"
                :id="'cb' + item.id"
                :disabled="item.num == 0"
                @change="selectedChange(item.id,getGoodsSelected[item.id])"
              />
              <label
                class="custom-control-label"
                :for="'cb' + item.id"
              >
                <!-- 商品的缩略图 -->
                <img
                  :src="item.image"
                  alt
                />
              </label>
            </div>
          </div>
          <!-- 右侧信息区域 -->
          <div class="goods-info">
            <!-- 商品标题 -->
            <h6 class="goods-title">{{ item.name }}</h6>
            <div class="goods-info-bottom">
              <!-- 商品价格 -->
              <span class="goods-price">￥{{ item.price }}</span>
              <!-- 商品的数量 -->
              <slot>
                <Numbox
                  v-if="item.num"
                  :initcount="getGoodsCount[item.id]"
                  @count="countChange"
                  :max="item.num"
                  :goodsid="item.id"
                ></Numbox>
                <span
                  v-else
                  style="margin-right:20px;"
                >该商品暂时无货</span>
              </slot>
            </div>
          </div>
        </van-cell>
        <template #right>
          <van-button
            square
            type="danger"
            @click="remove(item.id, i)"
            text="删除"
          />
        </template>
      </van-swipe-cell>
    </li>
    <van-submit-bar
      @submit="onSubmit"
      :price="getSelectedAmount"
      button-text="提交订单"
    >
      <input
        type="checkbox"
        id="fullSelect"
        :checked="fullState"
        @change="fullChange"
      />
      <label for="fullSelect">全选</label>
    </van-submit-bar>
  </ul>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Numbox from '@/components/Numbox/Numbox.vue'
export default {
  name: 'Cart',
  data () {
    return {
      goodslist: []
    }
  },
  computed: {
    ...mapState('shopcart', ['car']),
    // 通过…mapGetters()方法获取商品购买数量
    ...mapGetters('shopcart', ['getGoodsCount', 'getGoodsSelected', 'getSelectedCount', 'getSelectedGoods']),
    getSelectedAmount () {
      var goods = this.getSelectedGoods
      var amount = 0
      this.goodslist.forEach(item => {
        if (goods[item.id]) {
          amount += item.price * goods[item.id].count * 100
        }
      })
      return amount
    },
    // 动态计算出全选的状态是 true 还是 false
    fullState () {
      return this.car.every((item) => item.selected)
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      // 存放加入购物车的商品的id
      var idArr = []
      // 通过forEach遍历car数组，将遍历出来的商品id追加到idArr中
      this.car.forEach(item => {
        idArr.push(item.id)
      })
      // 如果idArr为空，则return出去
      if (idArr.length <= 0) {
        return false
      }
      // 根据id值获取商品
      var params = { ids: idArr }
      this.$http.get('shopcart', { params: params }).then(res => {
        if (res.data.code === 1) {
          this.goodslist = res.data.data
          // 遍历goodslist，如果该商品的数量值为0，则调用selectedChange方法，设置该商品选中状态为false
          this.goodslist.forEach(item => {
            if (item.num === 0) {
              this.selectedChange(item.id, false)
            }
          })
        }
      })
    },
    countChange (val) {
      this.$store.commit('shopcart/updateGoodsInfo', val)
    },
    selectedChange (id, val) {
      // 接收id作为第1个参数，接收val作为第2个参数，然后调用this.$store.commit()方法，
      // 方法接收第1个参数为“shopcart/updateGoodsSelected”表示调用指定路径下的事件处理函数，
      // 第2个参数为配置对象，对象包括商品的id值和商品的选中状态
      this.$store.commit('shopcart/updateGoodsSelected', { id: id, selected: val })
    },
    // 删除
    remove (id, index) {
      // 从goodlist删除指定商品
      this.goodslist.splice(index, 1)
      // 调用shopcart中的removeCar方法，从购物车数据中删除商品
      this.$store.commit('shopcart/removeCar', id)
    },
    // 设置全选
    fullChange (e) {
      this.car.forEach(item => {
        this.$store.commit('shopcart/updateGoodsSelected', { id: item.id, selected: e.target.checked })
      })
    },
    // 提交订单
    onSubmit () {
      if (this.goodslist.length === 0) {
        this.$toast('您的购物车为0')
      }
      // setBuy用来将购物车中用户选中的商品设为要购买的商品
      this.$store.commit('shopcart/setBuy')
      // 跳转到订单页面
      this.$router.push({ name: 'order_create' })
    }
  },
  components: {
    Numbox
  }
}
</script>

<style lang="less" scoped>
.cart-container {
  padding-bottom: 50px;
  .goods {
    + .goods {
      border-top: 1px solid #efefef;
    }
    padding: 10px;
    .van-button {
      height: 100%;
    }
    .van-cell__value {
      display: flex;
    }
    .thumb {
      display: flex;
      align-items: center;
      .custom-control {
        display: flex;
        align-items: center;
      }
      img {
        width: 100px;
        height: 100px;
        margin: 0 10px;
        border-radius: 10px;
      }
    }

    .goods-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .goods-title {
        font-weight: bold;
        font-size: 12px;
      }
      .goods-info-bottom {
        display: flex;
        justify-content: space-between;
        .goods-price {
          font-weight: bold;
          color: red;
          font-size: 13px;
        }
      }
    }
  }
  .van-submit-bar {
    box-shadow: 10px -10px 10px #efeff4;
    bottom: 50px;
  }
}
</style>
