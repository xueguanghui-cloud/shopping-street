安装环境：node vue-cli

## 安装

使用 npm 安装：

```
npm install
```

启动服务

```
npm run serve
```

然后就可以在浏览器中访问

```
- Local: http://localhost:8080
- Network: http://192.168.112.220:8080
```

## 在线手册

- [vue2.0 开发手册](https://cn.vuejs.org/)
- [vant 开发手册](https://vant-contrib.gitee.io/vant/#/zh-CN/home)

## 目录结构

初始的目录结构如下：

```
shopping-demo:
├─public
│      favicon.ico
│      index.html
│
├─src
│   │  App.vue
│   │  auth.js
│   │  main.js
│   │  theme.less
│   │
│   ├─Api
│   │      config.js
│   │      index.js
│   │
│   ├─assets
│   │  │  logo.png
│   │  │
│   │  └─images
│   │          avatar_default.png
│   │          menu1.png
│   │          menu2.png
│   │          menu3.png
│   │          menu4.png
│   │          menu5.png
│   │          menu6.png
│   │          price-bck.png
│   │
│   ├─components
│   │  ├─Header
│   │  │      Header.vue
│   │  │
│   │  ├─Numbox
│   │  │      Numbox.vue
│   │  │
│   │  ├─Swiper
│   │  │      Swiper.vue
│   │  │
│   │  └─Tabbar
│   │          Tabbar.vue
│   │
│   ├─router
│   │      index.js
│   │
│   ├─store
│   │  │  index.js
│   │  │
│   │  └─modules
│   │          head-portrait.js
│   │          shopcart.js
│   │          user.js
│   │
│   └─views
│       ├─Cart
│       │  │  Cart.vue
│       │  │
│       │  └─Order
│       │          OrderCreate.vue
│       │          OrderList.vue
│       │          OrderShow.vue
│       │
│       ├─Home
│       │  │  Home.vue
│       │  │
│       │  ├─News
│       │  │      Newinfo.vue
│       │  │      Newlist.vue
│       │  │
│       │  └─Photo
│       │          Photoinfo.vue
│       │          Photolist.vue
│       │
│       ├─Login
│       │      Login.vue
│       │
│       ├─Register
│       │      Register.vue
│       │
│       ├─Sort
│       │  │  Sort.vue
│       │  │
│       │  └─Good
│       │          Goodlist.vue
│       │          Goodsinfo.vue
│       │
│       └─User
│           │  User.vue
│           │
│           └─Address
│                   Address.vue
│                   AddressAdd.vue
│                   AddressEdit.vue
│                   │  .browserslistrc
├─  .editorconfig
├─  .eslintrc.js
├─  .gitignore
├─  babel.config.js
├─  gettree.bat
├─  package-lock.json
├─  package.json
├─  README.md
├─  vue.config.js
```
