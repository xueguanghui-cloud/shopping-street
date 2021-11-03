<template>
  <!-- 已登录 -->
  <div v-if="isLogin">
    <div class="member">
      <div class="header-con">
        <div class="user-info">
          <div class="avatar-con">
            <div class="item_bock head_p">
              <div
                class="head_img"
                @click.stop="uploadHeadImg"
              >
                <img :src="userInfo.avatar" />
                <!--图片地址动态绑定-->
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleFile"
                class="hiddenInput"
              />
            </div>
          </div>
          <div class="person-con">
            <span>{{ username }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 功能列表区域 -->
    <ul class="table-chevron">
      <li class="navigate">
        <router-link
          :to="{ name: 'order_list' }"
          class="navigate-left"
        >
          <img
            class="mui-media-object mui-pull-left"
            src="../../assets/images/avatar_default.png"
          />
          <div class="mui-media-body">我的订单</div>
        </router-link>
        <van-icon name="arrow" />
      </li>
      <li class="navigate">
        <router-link
          :to="{ name: 'address' }"
          class="navigate-left"
        >
          <img
            class="mui-media-object mui-pull-left"
            src="../../assets/images/avatar_default.png"
          />
          <div class="mui-media-body">收货地址</div>
        </router-link>
        <van-icon name="arrow" />
      </li>
      <li class="navigate">
        <div
          class="navigate-left"
          @click="logout"
        >
          <img
            class="mui-media-object mui-pull-left"
            src="../../assets/images/avatar_default.png"
          />
          <div class="mui-media-body">退出登录</div>
        </div>
        <van-icon name="arrow" />
      </li>
    </ul>
  </div>
  <!-- 未登录 -->
  <div v-else>
    <div class="member">
      <div class="header-con">
        <router-link
          :to="{ name: 'login' }"
          class="mui-navigate-right"
        >
          <div class="user-info">
            <!-- 用户信息 -->
            <div class="avatar-con">
              <div class="avatar">
                <img
                  src="../../assets/images/avatar_default.png"
                  class="image-info"
                />
              </div>
            </div>
            <div class="person-con">
              <span>登录 / 注册</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      userInfo: {
        avatar: 'img/avatar_default.fb13bcfc.png'
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    }),
    ...mapGetters('user', { isLogin: 'isLogin' })
  },
  methods: {
    logout () {
      // 提交退出登录请求
      this.$http.get('logout')
      // 调用退出方法
      this.$store.commit('user/logout')
      // 将头信息设置为空
      this.$auth.setAuthorization('')
      this.$toast('退出成功')
    },
    // 打开图片上传
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function (e) {
      const $target = e.target || e.srcElement
      const file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        const res = data.target || data.srcElement
        this.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="less" scoped>
.item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 94px;
  width: 300px;
  padding: 0px;
  border-bottom: 1px solid #f7f7f7;
}
.head_p {
  height: 132px;
}
.head_img {
  width: 60px;
  height: 60px;
}
.head_img img {
  width: 100%;
  height: 100%;
  border-radius: 50px;
}
.setting_right {
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput {
  display: none;
}
.caption {
  color: #8f8f8f;
  font-size: 26px;
  height: 37px;
}
.member {
  margin-bottom: 15px;
  .header-con {
    padding: 10px;
    background-color: #fff;
    .user-info {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 120px;
      background: linear-gradient(90deg, #28a2ff, #ffd787);
      box-shadow: 0 0.1rem 0.25rem #f8e3c6;
      .avatar-con {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        .avatar {
          width: 60px;
          height: 60px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 15);
          border: 1px solid hsla(0, 0%, 100%, 0.4);
          border-radius: 50% 50%;
          .image-info {
            width: 100%;
            height: 100%;
          }
        }
      }
      .person-con {
        position: absolute;
        left: 90px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
      }
    }
  }
}
.table-chevron {
  border: 1px solid #008c8c;
  box-sizing: border-box;
  .navigate:nth-child(2) {
    border-top: 1px solid #008c8c;
    border-bottom: 1px solid #008c8c;
    box-sizing: border-box;
  }
  .navigate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 42px;
    text-align: left;
    padding: 10px 15px;
    .navigate-left {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        line-height: 42px;
        max-width: 42px;
        height: 42px;
        margin-right: 10px;
      }
    }
  }
}
</style>
