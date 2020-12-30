let baseURL = 'http://127.0.0.1' // 后端请求接口host
let staticPath = 'https://127.0.0.1/' // 静态资源host

if (BUSINESS_ENV === 'staging') {
    baseURL = 'https://127.0.0.1'
    staticPath = 'https://127.0.0.1/'
} else if (BUSINESS_ENV === 'production') {
    baseURL = 'https://127.0.0.1'
    staticPath = 'https://127.0.0.1/'
}

console.log('环境变量：'+BUSINESS_ENV)

export default {
    baseURL,
    staticPath,
    deviceRatio: 750,
}
