import Taro from '@tarojs/taro'

import baseConfig from '@/config/index'
import {
  getToken,
} from '@/tools/yewu'

type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
type NetworkType = 'request' | 'RequestTask'
  | 'addInterceptor' | 'addInterceptor' | 'DownloadTask' | 'uploadFile' | 'UploadTask'
/**
 * 请求参数
 *
 * @param url 请求url
 * @param method 请求接口方式
 * @param baseURL 请求基础host
 * @param headers 请求头
 * @param params 请求参数
 * @param networkType 请求类型：默认 普通请求；uploadFile 上传文件；
 * @param networkTypeParams networkType 设置为非普通请求方式 之外时要传的额外参数
 * @param parameterType 传参方式，默认为空；urlParameter 在url? 待参数；url 拼在url上;body 放在body上
 * @param dataType 请求参数容器格式
 * @param loadding 是否显示请求加载状态
 * @param loaddingTitle 请求加载状态的title
 * @param responseType 后端返回过来的请求格式
 */
export interface RequestConfig {
    url?: string;
    method?: Method;
    baseURL?: string;
    header?: any;
    headers?: any;
    params?: object; // 要传的参数
    networkType?: NetworkType;
    networkTypeParams?: any; // 上传文件时要传的参数
    parameterType?:  string; // 传参方式，默认为空；urlParameter 在url? 待参数；url 拼在url上;body 放在body上
    dataType?: 'json' | '其他';
    loadding?: boolean; // 是否显示加载状态
    loaddingTitle?: string; // 加载组件的title
    responseType?: 'text' | 'arraybuffer';
}

const urlLists = {
}
function request<T>(parameter: RequestConfig):Promise<T> {
    let initParameter:RequestConfig = {
        baseURL: baseConfig.baseURL,
        method: 'POST',
        params: {},
        networkType: 'request',
        dataType: 'json',
        responseType: 'text',
        loadding: false,
        loaddingTitle: '加载中',
        parameterType: '',
        header: {
            'content-Type': 'multipart/form-data' // 默认值
        }
    }
    const token = getToken()
    if (token) {
      initParameter.headers['authorization'] = token;
    }
    if (!parameter.baseURL && parameter.baseURL !== undefined) {
        parameter.baseURL = parameter.baseURL
    }
    const mergeParameter:RequestConfig = Object.assign(initParameter, parameter)

    if (Object.keys((mergeParameter.params || {})).length && (mergeParameter.method === 'GET' && mergeParameter.parameterType === undefined
      && mergeParameter.parameterType !== 'body') || mergeParameter.parameterType === 'urlParameter') {
        let dataStr = '';
        let keys = Object.keys(mergeParameter.params as object)
        keys.map((key, index) => {
            dataStr += `${key}=${(mergeParameter.params as object)[key]}`
            if (index !== (keys.length - 1)) {
                dataStr += '&';
            }
        })
        // 将参数置空
        mergeParameter.params = undefined;
        mergeParameter.url = mergeParameter.url + `?${dataStr}`;
    }
    function hideLoading(value:boolean) {
      if (!value) {
        Taro.hideLoading()
      }
    }
    return new Promise((resolve, reject) => {
        if (mergeParameter.loadding) {
            Taro.showLoading({
              title: mergeParameter.loaddingTitle as string,
            })
        }
        if (mergeParameter.networkType === 'request') {
            Taro.request({
                url: (mergeParameter.baseURL as string) + (mergeParameter.url as string),
                data: mergeParameter.params,
                method: mergeParameter.method,
                header: mergeParameter.header,
                dataType: mergeParameter.dataType,
                responseType: mergeParameter.responseType,
                success: function (res:any) {
                  hideLoading((mergeParameter.loadding || false));
                  publicResResulte(res.data, mergeParameter)
                  resolve(res.data)
                },
                fail: function (res:any) {
                  hideLoading((mergeParameter.loadding || false));
                  publicResResulte(res.data, mergeParameter)
                  reject(res.data);
                  if (res.statusCode === 500) {
                    Taro.showToast({
                        title: '网络异常，紧急修复中~',
                        icon: 'none',
                        duration: 2000
                    })
                  }
                },
              })
        }
        if (mergeParameter.networkType === 'uploadFile') {
            Taro.uploadFile({
                url: (mergeParameter.baseURL as string) + (mergeParameter.url as string),
                formData: mergeParameter.params,
                header: mergeParameter.header,
                success: function (res:any) {
                  hideLoading((mergeParameter.loadding || false));
                  publicResResulte(res.data, mergeParameter);
                  resolve(res.data)
                },
                fail: function (res:any) {
                  hideLoading((mergeParameter.loadding || false));
                  publicResResulte(res.data, mergeParameter);
                    reject(res.data);
                    if (res.statusCode === 500) {
                      Taro.showToast({
                          title: '网络异常，紧急修复中~',
                          icon: 'none',
                          duration: 2000
                      })
                    }
                },
                ...mergeParameter.networkTypeParams,
              })
        }
    })

}
// 接口返回之后处理方法
function publicResResulte(res:any = {}, mergeParameter: RequestConfig) {
    if (mergeParameter.loadding) {
        Taro.hideLoading()
    }
    if (res.code && res.code !== 200) {
        Taro.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
        })
    }
}

type HttpsResulte = {
    [key in keyof typeof urlLists]: typeof request
}
// 组装api
const https: HttpsResulte = {} as HttpsResulte;

Object.keys(urlLists).forEach(key => {
    https[key] = <T>(parameter: RequestConfig) => request<T>(
                Object.assign(parameter, {...urlLists[key]})
            )
})

export default https
