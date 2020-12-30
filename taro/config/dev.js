module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {
    BUSINESS_ENV: '"development"',
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        "/": "https://127.0.0.1"
      }
    },
  },
  projectConfig: {
    "appid": "demo",
    "projectname": "demo-开发环境",
    "description": "demo-开发环境",
  },
}
