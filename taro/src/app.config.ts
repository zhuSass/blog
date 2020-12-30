export default {
  pages: [
    'pages/home/index',
    'pages/index/index',
    'pages/login/index',
  ],
  tabBar: {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [{
      "pagePath": "pages/index/index",
    }, {
      "pagePath": "pages/home/index",
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
