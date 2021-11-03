<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="onAdd"
      @edit="onEdit"
      @select="select"
    />
  </div>
</template>

<script>
export default {
  name: 'Address',
  data () {
    return {
      chosenAddressId: '1',
      addressList: [],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    getAddressList () {
      this.$http.get('address').then(res => {
        var obj = {}
        res.data.data.forEach(item => {
          obj = {}
          obj.id = item.id
          obj.name = item.name
          obj.tel = item.tel
          obj.address = item.area + ' - ' + item.detail
          this.addressList.push(obj)
        })
      })
    },
    onAdd () {
      this.$router.push({ name: 'addressadd' })
    },
    onEdit (item) {
      this.$router.push({ name: 'address_edit', params: { id: item.id } })
    },
    select (item) {
      // 判断路由是否是address_select,如果是则就是选择地址,如果不是则返回出去
      if (this.$route.name !== 'address_select') {
        return false
      }
      // 使用$router.replace方法跳转到创建订单页面,并将所选地址id传递过去
      this.$router.replace({ name: 'order_create', params: { id: item.id } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
