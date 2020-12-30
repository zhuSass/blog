import Taro, {
  getLocation,
} from "@tarojs/taro";

export default {
  /** 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用。开启高精度定位，接口耗时会增加，可指定 highAccuracyExpireTime 作为超时时间。
   *
   * **注意**
   * - 工具中定位模拟使用IP定位，可能会有一定误差。且工具目前仅支持 gcj02 坐标。
   * - 使用第三方服务进行逆地址解析时，请确认第三方服务默认的坐标系，正确进行坐标转换。
   * @supported weapp
   * @example
   *  ```tsx
   * Taro.getLocation({
   *  type: 'wgs84',
   *  success: function (res) {
   *    const latitude = res.latitude
   *    const longitude = res.longitude
   *    const speed = res.speed
   *    const accuracy = res.accuracy
   *  }
   * })
   * ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html
   */
  getLocation: function (option:getLocation.Option):Promise<getLocation.SuccessCallbackResult> {
    if (process.env.TARO_ENV === 'h5') {
      try {
        return window.androidNativeFun.getLocation(option)
      }catch (e) {
        console.log(e)
        return e;
      }
    } else {
      return Taro.getLocation(option);
    }
  }
}
