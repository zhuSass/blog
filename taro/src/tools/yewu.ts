import Taro,{
  getLocation,
} from '@tarojs/taro'

const TokenKey = '32d3in'

export function getToken() {
  return Taro.getStorageSync(TokenKey);
}
export function setToken(token) {
  return Taro.setStorageSync(TokenKey, token);
}
export function removeToken() {
  return Taro.removeStorageSync(TokenKey)
}

