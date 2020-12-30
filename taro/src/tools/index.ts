import Taro from '@tarojs/taro'

import config from '@/config/index'

/**
 * 版本号对比
 * @param v1 当前运行的小程序基础库版本
 * @param v2 目标小程序基础库版本
 */
export const compareVersion = function(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)
  
    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }
  
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])
  
      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
  
    return 0
}

/**
 * 判断当前小程序基础库版本是否对得上对应api所需要的版本
 * @param targetVersion 目标版本
 */
export const determineWeChatPlatformVersion = function(targetVersion:string):Promise<null>  {
    const version = Taro.getSystemInfoSync().SDKVersion

    return new Promise((resolve, reject) => {
        if (compareVersion(version, targetVersion) >= 0) {
            resolve(null)
        } else {
            Taro.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
            reject(null)
        }
    });
}
/**
 * 跨端运行时的尺寸转换
 * @param size 目标尺寸
 * @param deviceRatio 目标尺寸所在的容器大小
 */
export const pxTransform = function(size, deviceRatio = config.deviceRatio) {
  return Taro.pxTransform(size, deviceRatio);
}