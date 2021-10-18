<template>
  <div>
    <div class="menu">
      <!-- 左侧菜单栏 -->
      <div class="menu-left">
        <ul>
          <li
            class="menu-item"
            v-for="(menu,index) in menus"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickList(index)"
            ref="menuList"
          >
            <p class="text">{{ menu.name }}</p>
          </li>
        </ul>
      </div>
      <!-- 为了获取每个二级分类的高度，需要给右菜单div.menu-right元素添加ref属性 -->
      <div class="menu-right" ref="itemList">
        <ul>
          <li class="cate" v-for="(menu, index1) in menus" :key="index1">
            <h4 class="cate-title">{{ menu.name }}</h4>
            <ul class="cate-item">
              <li v-for="(item, index2) in menu.sub" :key="index2">
                <router-link
                  class="cate-item-wrapper"
                  :to="{name: 'goods_list', params: {category_id: item.id}}"
                >
                  <div class="cate-item-img">
                    <img :src="item.image" alt />
                  </div>
                  <span>{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="cate-bottom"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  data () {
    return {
      menus: [],
      // 右菜单每项的高度
      rightLiTops: [],
      // 记住右菜单的滚动距离
      scrollY: 0
    }
  },
  methods: {
    // 单击左菜单中的某一项后，将右菜单切换到对应项下面
    clickList (index) {
      this.scrollY = this.rightLiTops[index]
      // scorllTo(x, y, time, easing)
      this.rightBscroll.scrollTo(0, -this.scrollY)
    },
    // 初始化better-scroll
    _initBScroll () {
      // new BScroll()创建一个实例，第1个参数表示对应的元素，第2个参数表示选项
      this.leftBscroll = new BScroll('.menu-left', {
        // click表示是否允许单击
        click: true,
        // mouseWheel表示可以用鼠标滚动进行滚动
        mouseWheel: true
      })
      this.rightBscroll = new BScroll('.menu-right', {
        click: true,
        mouseWheel: true,
        probeType: 3 // 实时派发scroll事件
      })
      this.rightBscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    // 通过this.$refs.itemList获取该DOM的属性集合并记录下来
    _initRightHeight () {
      const itemArray = []
      let top = 0
      itemArray.push(top)
      const allList = this.$refs.itemList.getElementsByClassName('cate')
      // 将allList转换为普通数组进行遍历，记录每个元素的高度
      Array.prototype.slice.call(allList).forEach(li => {
        top += li.clientHeight
        itemArray.push(top)
      })
      this.rightLiTops = itemArray
      const bottom = this.$refs.itemList.getElementsByClassName('cate-bottom')[0]
      bottom.style.height = this.$refs.itemList.clientHeight / 1.2 + 'px'
      this.rightLiTops = itemArray
    },
    _initLeftScroll (index) {
      const menu = this.$refs.menuList
      const el = menu[index]
      // scrollToElement(el, tiem, offsetX, easing)
      // 将offsetY设为-100的目的，是为了避免左边的菜单频繁发生自动滚动，不然会有卡顿的感觉
      this.leftBscroll.scrollToElement(el, 300, 0, -100)
    }
  },
  computed: {
    currentIndex () {
      // 当scrollY发生改变时，修改左菜单的激活项
      const { scrollY, rightLiTops } = this
      // 从右菜单中查找元素，返回元素索引
      return rightLiTops.findIndex((top, index) => {
        // rightLiTops.length表示右菜单中每项li元素高度的个数
        if (index === rightLiTops.length) {
          return true
        }
        if (scrollY >= top && scrollY < rightLiTops[index + 1]) {
          this._initLeftScroll(index)
          return true
        }
      })
    }
  },
  created () {
    this.$indicator.open({
      text: '加载中'
    })
    this.$http.get('category').then(res => {
      this.$indicator.close()
      this.menus = res.data.data
    })
  },
  // watch监听menu的数据变动，一旦发生变动，则页面也会发生变化。
  watch: {
    menus () {
      // $nextTick 用来下次DOM更新循环结束之后执行延迟回调
      this.$nextTick(() => {
        this._initBScroll() // 初始化better-scroll
        this._initRightHeight() // 初始化右边菜单的高度
      })
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.menu {
  display: flex;
  position: absolute;
  text-align: center;
  top: 40px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
  .menu-left {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      height: 54px;
      width: 100%;
      .text {
        width: 100%;
        line-height: 54px;
        margin-bottom: 0;
      }
    }
    .current {
      width: 100%;
      background: #fff;
      .text {
        color: red;
      }
    }
  }
  .menu-right {
    flex: 1;
    background: #fff;
    .cate {
      height: 100%;
      .cate-title {
        margin: 0;
        text-align: left;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        padding: 10px;
      }
      .cate-item {
        padding: 7px 10px 10px;
        display: flex;
        overflow: hidden;
        flex-flow: row wrap;
        li {
          width: 33.3%;
          .cate-item-wrapper {
            .cate-item-img {
              width: 100%;
              img {
                width: 70px;
                height: 70px;
              }
            }
            span {
              display: inline-block;
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>
