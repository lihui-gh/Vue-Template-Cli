'use strict';

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  lintOnSave: process.env.NODE_ENV === 'development',
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '^/api/': {
        // target: 'http://127.0.0.1:8088/',
        // target: 'http://192.168.3.67:8088/',
        target: 'http://10.1.62.19:8085/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
      // before: require('./mock/mock-server.js'),
      // proxy: 'http://localhost:8088/'
      // proxy: 'http://127.0.0.1:8088/' // egg
      // proxy: 'http://10.4.7.86:7001/' // egg
      // proxy: 'http://10.1.62.19:9501/'
      // proxy: 'http://10.4.7.82:9501/'

      // after: require('./mock/mock-server.js')
    }
  }
};