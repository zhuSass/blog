const path = require('path')
const fs = require('fs')

const config = {
  projectName: 'demo',
  date: '2020-10-26',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  alias: {
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/tools': path.resolve(__dirname, '..', 'src/tools'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/https': path.resolve(__dirname, '..', 'src/https'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  projectConfig: {
    "miniprogramRoot": "dist/",
    "projectname": "demo",
    "description": "demo小程序",
    "appid": "cvxvxvxzvcx",
    "setting": {
      "urlCheck": true,
      "es6": false,
      "enhance": false,
      "postcss": false,
      "preloadBackgroundData": false,
      "minified": false,
      "newFeature": false,
      "coverView": true,
      "nodeModules": false,
      "autoAudits": false,
      "showShadowRootInWxmlPanel": true,
      "scopeDataCheck": false,
      "uglifyFileName": false,
      "checkInvalidKey": true,
      "checkSiteMap": true,
      "uploadWithSourceMap": true,
      "compileHotReLoad": false,
      "useMultiFrameRuntime": false,
      "useApiHook": true,
      "babelSetting": {
        "ignore": [],
        "disablePlugins": [],
        "outputPath": ""
      },
      "enableEngineNative": false,
      "useIsolateContext": true,
      "useCompilerModule": true,
      "userConfirmedUseCompilerModuleSwitch": false,
      "packNpmManually": false,
      "packNpmRelationList": [],
      "minifyWXSS": true
    },
    "compileType": "miniprogram",
    "simulatorType": "wechat",
    "simulatorPluginLibVersion": {},
    "condition": {}
  }
}

module.exports = function (merge) {
  let environment = {};
  if (process.env.BUSINESS_ENV === 'production') {
    environment =  require('./prod');
  } else if (process.env.BUSINESS_ENV === 'staging') {
    environment =  require('./stag');
  } else {
    environment =  require('./dev');
  }
  let projectConfig = Object.assign({}, config.projectConfig, environment.projectConfig);


  config.projectName = projectConfig.projectname
  config.outputRoot = projectConfig.miniprogramRoot

  delete config.projectConfig
  delete environment.projectConfig
  
  // 根据环境生成project.config.json文件
  fs.writeFileSync('./project.config.json',JSON.stringify(projectConfig),'utf8');


  return merge({}, config, environment)
}
