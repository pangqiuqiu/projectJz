module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV == 'production' ? './' : '/',
  productionSourceMap: false,
  outputDir: 'manage',
  configureWebpack: {
    externals: {
      BMap: 'BMap'
    }
  }
}
