// vue.config.js 是vue-cli创建出来的项目的配置文件
// 在 vue.config.js 可以对整个项目的打包，构建进行全局性的配置
// webpack 在进行打包的时候，底层用到了node.js
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#008c8c'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }
      }
    }
  }
}
