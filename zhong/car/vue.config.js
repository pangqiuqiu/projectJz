module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV == 'production' ? './' : '/',
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      "BMap": "BMap",
      "AMap": "AMap"
    }
  }
}
