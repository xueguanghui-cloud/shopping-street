<template>
  <div class="menu">
    <!-- 左侧菜单栏 -->
    <div class="menu-left">
      <van-sidebar v-model="activekey">
        <van-sidebar-item
          @click="clickList(index)"
          v-for="(item, index) in menus"
          :key="item.id"
          :title="item.name"
          ref="menuList"
        />
      </van-sidebar>
    </div>
    <!-- 为了获取每个二级分类的高度，需要给右菜单div.menu-right元素添加ref属性 -->
    <div
      class="menu-right"
      ref="itemList"
    >
      <ul>
        <li
          class="cate"
          v-for="(menu, index) in menus"
          :key="index"
        >
          <h4 class="cate-title">{{ menu.name }}</h4>
          <van-row class="cate-item">
            <van-col
              span="8"
              v-for="(item, index1) in menu.sub"
              :key="index1"
            >
              <router-link :to="{ name: 'goods_list', params: {category_id: item.id}}">
                <img
                  :src="item.image"
                  alt
                />
                <span>{{ item.name }}</span>
              </router-link>
            </van-col>
          </van-row>
        </li>
        <!-- 问题：就是当滚动到最后一项的时候，左边永远无法激活 -->
        <!-- 解决办法：在页面中给底部加上一个li，用来撑大底部 -->
        <li class="cate-bottom"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Sort',
  data () {
    return {
      // 右菜单每项的高度
      rightLiTops: [],
      // 左侧菜单项
      menus: [],
      scrollY: 0
    }
  },
  watch: {
    menus () {
      // $nextTick用来在下次DOM更新循环结束之后执行延迟回调
      this.$nextTick(() => {
        this._initBScroll() // 初始化better-scroll
        this._initRightHeight() // 初始化右边菜单的高度
      })
    }
  },
  methods: {
    // 单击左菜单中的某一项后，将右菜单切换到对应项下面
    clickList (index) {
      this.scrollY = this.rightLiTops[index]
      // scrollTo(x, y, time, easing)
      // x 横轴坐标，y 纵轴坐标，time 滚动动画执行的时长，easing 缓动函数，一般不建议修改
      this.rightBscroll.scrollTo(0, -this.scrollY)
    },
    // 初始化better-scroll
    _initBScroll () {
      this.leftBscroll = new BScroll('.menu-left', {
        // click表示是否允许单击
        click: true,
        // mouseWheel表示可以用鼠标滚动进行滚动
        mouseWheel: true,
        probeType: 2
      })
      // 获取类名为cate-bottom的元素
      const bottom = this.$refs.itemList.getElementsByClassName('cate-bottom')[0]
      // 设置这个元素的高度
      bottom.style.minHeight = this.$refs.itemList.clientHeight / 1.2 + 'px'
      this.rightBscroll = new BScroll('.menu-right', {
        click: true,
        mouseWheel: true,
        // 有时候我们需要知道滚动的位置。
        // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
        // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
        probeType: 3 // 实时派发scroll事件
      })
      this.rightBscroll.on('scroll', (pos) => {
        // pos.y取绝对值，然后保存给this.scrollY
        this.scrollY = Math.abs(pos.y)
      })
    },
    // 初始化右边菜单的高度
    _initRightHeight () {
      const itemArray = []
      let top = 0
      itemArray.push(top)
      const allList = this.$refs.itemList.getElementsByClassName('cate')
      // Array.prototype.slice.call(arguments) 将 arguments 转换为普通数组进行遍历，记录每个元素的高度
      Array.prototype.slice.call(allList).forEach(li => {
        // 获取每个元素高度并赋值给top
        top += li.clientHeight
        // 将每个元素的高度记录到itemArray中
        itemArray.push(top)
      })
      this.rightLiTops = itemArray
    },
    // 右菜单滚动时，左菜单联动
    _initLeftScroll (index) {
      const menu = this.$refs.menuList
      const el = menu[index]
      // scrollToElement(el, time, offsetX, offsetY, easing)
      this.leftBscroll.scrollToElement(el, 300, 0, -100)
    }
  },
  computed: {
    activekey: {
      get () {
        // 当 scrollY 发生改变时，修改左菜单的激活项
        const { scrollY, rightLiTops } = this
        // 从右菜单中查找元素，返回元素索引
        // arr.findIndex(() => {})
        return rightLiTops.findIndex((top, index) => {
          // 如果是最后一项，则左边不进行自动滚动
          if (index === rightLiTops.length - 2) {
            return true
          }
          if (scrollY >= top && scrollY < rightLiTops[index + 1]) {
            this._initLeftScroll(index)
            return true
          }
        })
      },
      set () {
        return true
      }
    }
  },
  created () {
    this.$http.get('category').then(res => {
      this.menus = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.menu {
  position: absolute;
  top: 46px;
  bottom: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  .menu-left {
    background-color: #f7f8fa;
    .van-sidebar-item {
      padding: 20px 10px;
    }
    border-right: 1px solid #f7f8fa;
    .van-sidebar-item--select {
      color: #008c8c !important;
    }
    .van-sidebar-item--select::before {
      width: 3px;
      height: 100%;
      background-color: #008c8c;
    }
  }
  .menu-right {
    flex: 1;
    background: #fff;
    .cate {
      .cate-title {
        font-size: 14px;
        color: #333;
        margin: 0;
        padding: 20px 5px 10px 5px;
      }
    }
    .van-row {
      padding: 0 10px;
    }
    .van-col {
      height: 100px;
      padding: 5px 8px;
      text-align: center;
    }
    .van-col img {
      width: 60px;
      height: 60px;
    }
    .van-col span {
      display: block;
      color: initial;
      font-size: 14px;
    }
  }
}
</style>
