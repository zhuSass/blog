import React,{useState, ReactNode,} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import Font from '@/components/font'

import { actionSelectIndex } from '@/store/tabBar/action'
import {AppStore} from '@/store/index'
import {pxTransform} from '@/tools/index'

import './index.scss'

type Props = {
  position?: 'fixed' | 'absolve' | 'relative' | 'realtive',
  bgColor?: string,
  isShadow?: boolean,
  leftItem?: ReactNode | Boolean, // 左边显示组件,传组件则代表自定义，Boolean则默认的显示/隐藏
  centerItem?: ReactNode | string, // 中间显示组件,传组件则代表自定义，Boolean则默认的显示/隐藏
  rightItem?: (() => ReactNode) | ReactNode, // 右边显示组件,传组件则代表自定义

}
const initProps:Props = {
  position: 'fixed',
  bgColor: '#fff',
  isShadow: true,
}
function Index(props: Props = {}) { 
  const statusBarHeight = useSelector((state:AppStore) => state.systemInfo.statusBarHeight)

  let merge = Object.assign(initProps, props)

  return (
    <View className='navBar-wrap' style={`position: ${
      merge.position};background-color: ${merge.bgColor};${
        merge.isShadow && `box-shadow: 0px 0 ${pxTransform(6)} 0 #ddd;padding-top:${statusBarHeight}px;`
      }`}>
        <View className='navBar-main'>
          <View className="item">
            {merge.leftItem !== 'false'?
              <Font fontName='return' />:merge.leftItem ? merge.leftItem : null}
          </View>

          {merge.centerItem ? <View className="item item-center">
            {merge.centerItem}
          </View> : null}

          <View className="item">
            {merge.rightItem !== 'false'?
              <Font fontName='return' />:merge.rightItem ? merge.rightItem : null}
          </View>
        </View>

    </View>
  )
}

export default Index

