import Taro from '@tarojs/taro'

export const statusBarHeight = 'statusBarHeight'
  
export const handlerStatusBarHeight = (num) => {
    return {
        type: statusBarHeight,
        data: num,
    }
}

// 异步的action
export function getStatusBarHeight () {
    return dispatch => {
        const statusBarHeight = Taro.getSystemInfoSync()['statusBarHeight'];

        console.log('statusBarHeight---------', statusBarHeight)

        dispatch(handlerStatusBarHeight(statusBarHeight))
    }
}
  