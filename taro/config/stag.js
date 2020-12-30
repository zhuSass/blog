module.exports = {
    env: {
      NODE_ENV: '"production"',
    },
    defineConstants: {
      BUSINESS_ENV: '"staging"',
    },
    mini: {},
    h5: {
      /**
       * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
       * 参考代码如下：
       * webpackChain (chain) {
       *   chain.plugin('analyzer')
       *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
       * }
       */
    },
    projectConfig: {
      "appid": "demo",
      "projectname": "demo-测试环境",
      "description": "demo-测试环境",
    },
  }
