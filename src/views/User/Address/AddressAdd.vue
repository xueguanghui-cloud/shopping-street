<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
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
  name: 'AddressAdd',
  data () {
    return {
      areaList,
      searchResult: [],
      form: {
        name: '',
        tel: '',
        area: '',
        detail: ''
      }
    }
  },
  methods: {
    onSave (content) {
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
    onDelete () {
      this.$toast('delete')
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
