// 在实现购物车功能之前，首先要准备购物车的数据，例如，购物车商品列表、单个商品详细信息等，为了更好的实现购物车功能
// vue的Vuex状态管理插件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 在实现购物车功能的时候，由于每次刷新页面后需要将购物车中的商品保留下来，
// 所以需要保存购物车中的商品信息到localStorage中
function setItem (name, item) {
  // setItem()方法接受name和item形参，在setItem()方法中，通过localStorage本地存储对象的setItem()方法实现本地数据存储功能，
  // 其中参数name表示名称，JSON.stringify(item)表示转换为JSON字符串后的值
  localStorage.setItem(name, JSON.stringify(item))
}

function getItem (name) {
  // getItem()方法接受name形参，在getItem()方法中，返回一个经过JSON.parse()转换后的JSON对象，
  // 其中localStorage.getItem()方法表示获取指定名称的值。
  return JSON.parse(localStorage.getItem(name) || '[]')
}

// state表示购物车初始数据
const state = {
  // { id: 商品id, count: 购买数量，selected: false  }
  // getItem('car')表示获取购物车中商品
  car: getItem('car'),
  // 当前要购买的商品：buy: [{ id: '', count: '' }]
  // 当在购物车里点“去结算”时，就把购物车车中已经选中的商品放进去
  buy: getItem('buy')

}

// getters表示计算后的数据
const getters = {
  // 获取商品数量
  getGoodsCount (state) {
    var goods = {}
    state.car.forEach(item => {
      goods[item.id] = item.count
    })
    return goods
  },
  // 获取商品有没有选中的状态值（selected）
  getGoodsSelected (state) {
    var goods = {}
    state.car.forEach(item => {
      goods[item.id] = item.selected
    })
    return goods
  },
  // 获取选中的商品的件数
  getSelectedCount (state) {
    var count = 0
    state.car.forEach(item => {
      if (item.selected) {
        count += item.count
      }
    })
    return count
  },
  // 获取选中的商品
  getSelectedGoods (state) {
    var goods = {}
    state.car.forEach(item => {
      if (item.selected) {
        goods[item.id] = item
      }
    })
    return goods
  },
  // 获取要购买的商品
  getBuy (state) {
    var goods = {}
    state.buy.forEach(item => {
      goods[item.id] = item
    })
    return goods
  }
}

const actions = {}

// mutations中实现购物车商品的删除和添加功能
const mutations = {
  // 实现思路:定义flag初始值为false,然后在添加商品时,判断商品item是否已经在state.car数组中存在,
  // 如果存在,则直接增加商品数量,并修改flag值为true
  // 如果不存在,则添加商品到state.car数组中
  addCar (state, goodsinfo) {
    // 判断商品item是否已经存在
    let flag = false
    state.car.some(item => {
      if (item.id === goodsinfo.id) {
        item.count += parseInt(goodsinfo.count)
        flag = true
        return true
      }
    })
    if (!flag) {
      state.car.push(goodsinfo)
    }
    // setItem('car',state.car)表示重新设置car的值
    setItem('car', state.car)
  },
  // 在购物车页面中修改商品数量
  updateGoodsInfo  (state, goodsinfo) {
    state.car.some(item => {
      if (item.id === goodsinfo.id) {
        item.count = goodsinfo.count
        return true
      }
    })
    // 重新设置购物车中商品信息
    setItem('car', state.car)
  },
  // 在购物车页面中修改商品选中状态
  updateGoodsSelected (state, info) {
    state.car.some(item => {
      if (item.id === info.id) {
        item.selected = info.selected
      }
    })
    setItem('car', state.car)
  },
  removeCar (state, id) {
    state.car.some((item, i) => {
      if (item.id === id) {
        state.car.splice(i, 1)
        return true
      }
    })
    setItem('car', state.car)
  },
  setBuy (state, goods) {
    state.buy = []
    if (goods) {
      state.buy.push(goods)
    } else {
      state.car.some(item => {
        if (item.selected) {
          state.buy.push(item)
        }
      })
    }
    // 调用setItem设置
    setItem('buy', state.buy)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
