<template>
  <div class="van-stepper van-sku__stepper">
    <button type="button" class="van-stepper__minus" :disabled="showSubDisabled" @click="sub"></button>
    <input
      type="tel"
      role="spinbutton"
      inputmode="numeric"
      class="van-stepper__input"
      v-model="count"
      @change="setCount"
      ref="num"
    />
    <button type="button" class="van-stepper__plus" :disabled="showAddDisabled" @click="add"></button>
  </div>
</template>

<script>
export default {
  name: 'Numbox',
  data () {
    return {
      count: this.initcount,
      showSubDisabled: false,
      showAddDisabled: false
    }
  },
  props: ['max', 'initcount', 'goodsid'],
  methods: {
    // 增加商品
    add () {
      if (this.count >= this.max) {
        this.showAddDisabled = true
      } else {
        this.showSubDisabled = false
        this.count++
      }
    },
    // 减少商品
    sub () {
      if (this.count <= 1) {
        this.showSubDisabled = true
      } else if (this.count >= 1) {
        this.showAddDisabled = false
        this.count--
      }
    },
    setCount () {
      var num = parseInt(this.$refs.num.value)
      if (num === 0) {
        this.count = 1
      }
    }
  },
  watch: {
    // 当数据发生变化时，将最新商品的id和数量传递给父组件Goodsinfo
    'count' (newVal) {
      var params = { id: this.goodsid, count: newVal }
      this.$emit('count', params)
    }
  }
}
</script>

<style>
</style>
