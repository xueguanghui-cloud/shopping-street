<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      show-delete
      :address-info="AddressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
export default {
  name: 'AddressEdit',
  props: ['id'],
  data () {
    return {
      areaList,
      searchResult: [],
      form: {
        id: '',
        name: '',
        tel: '',
        area: '',
        detail: ''
      },
      AddressInfo: { // 收货人信息初始值
        name: '', // 姓名
        tel: '', // 电话
        province: '', // 省份
        city: '', // 城市
        country: '', // 区县
        addressDetail: '' // 详细地址
      }
    }
  },
  created () {
    this.getAddress()
  },
  methods: {
    // 修改后保存
    onSave (content) {
      this.form.id = this.id
      this.form.name = content.name
      this.form.tel = content.tel
      this.form.area = content.province + '-' + content.city + '-' + content.county
      this.form.detail = content.addressDetail
      this.$http.post('address/save', this.form).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.$toast(res.data.msg)
          this.$router.back()
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    },
    getAddress () {
      var params = { id: this.id }
      if (!this.id) {
        return
      }
      this.$http.get('address/edit', { params: params }).then(res => {
        this.AddressInfo.name = res.data.data.name
        this.AddressInfo.tel = res.data.data.tel
        this.AddressInfo.addressDetail = res.data.data.detail
      })
    },
    // 删除
    onDelete () {
      // this.$toast('delete')
      this.form.id = this.id
      this.$http.post('address/del', this.form).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else if (res.data.code === 1) {
          this.$toast(res.data.msg)
          this.$router.go(-1)
        } else if (res.data.code === 2) {
          this.$router.push({ name: 'login' })
        }
      })
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style>
</style>
