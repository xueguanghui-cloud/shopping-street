function setItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item))
}
function getItem(name) {
  return JSON.parse(localStorage.getItem(name) || '[]')
}


// state表示购物车初始数据
const state = {
  // { id: 商品id, count: 购买数量，selected: false  }
  car: getItem('car'),
  // 当前要购买的商品：buy: [{ id: '', count: '' }]
  // 当在购物车里点“去结算”时，就把购物车车中已经选中的商品放进去
  buy: getItem('buy')
}


// getters表示计算后的数据
const getters = {
  // 获取商品数量
  // getGoodsCount 表示获取商品数量，其中定义goods对象存储商品信息，然后通过forEach方法将每一件商品的count保存起来。
  getGoodsCount (state) {
    var goods = {}
    state.car.forEach(item => {
      goods[item.id] = item.count
    })
    return goods
  },
  // 获取商品有没有选中的状态值(selected)
  // getGoodsSelected表示获取商品有没有选中的状态值（selected），即保存每一件商品的选中状态selected
  getGoodsSelected (state) {
    var goods = {}
    state.car.forEach(item => {
      goods[item.id] = item.selected
    })
    return goods
  },
  // 获取选中的商品的件数
  // getSelectedCount表示获取选中的商品的件数，通过对每一件商品的selected值进行判断，如果选中了就让当count的值加等于item.count值得到选中商品的件数。
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
  // getSelectedGoods 表示获取选中的商品，如果item.selected值为true，就保存当前选中的商品。
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
  // getBuy表示获取要购买的商品，就是将state中当前购买的商品中的每一件商品保存起来。
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
  // addCar()方法的第2个参数goodsinfo表示新添加的商品信息，定义flag的初始值为false，然后在添加商品时判断给定的商品item是否已经在state.car数组中存在，如果存在，则增加商品数量，并修改false的值为true。如果不存在，则添加到state.car数组中。添加商品到购物车的基本逻辑代码完成之后，下面在GoodsInfo.vue文件中实现效果。
  addCar (state, goodsinfo) {
    var flag = false
    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count += parseInt(goodsinfo.count)
        flag = true
        return true
      }
    })
    if (!flag) {
      state.car.push(goodsinfo)
    }
    setItem('car', state.car)
  },
  updateGoodsInfo (state, goodsinfo) {
    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count = parseInt(goodsinfo.count)
        return true
      }
    })
    setItem('car', state.car)
  },
  updateGoodsSelected (state, info) {
    state.car.some(item => {
      if (item.id == info.id) {
        item.selected = info.selected
      }
    })
    setItem('car', state.car)
  },
  removeCar (state, id) {
    state.car.some((item, i) => {
      if (item.id == id) {
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
