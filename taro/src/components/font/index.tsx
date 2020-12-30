import React,{useState, ReactNode,} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'

import {pxTransform} from '@/tools/index'

type Props = {
  fontName: string,
  fontSize?: number,
  color?: string,
  style?: object,
}

function Index(props) { 
  const initProps:Props = {
      fontName: '',
      fontSize: 50,
      style: {},
  }
  let merge = Object.assign(initProps, props)

  return (<Text className={`iconfont ${merge.fontName}`} style={{
        ...merge.style, 
        fontSize: `${pxTransform(merge.fontSize)}`,
        color: merge.color,
    }}></Text>    
  )
}

export default Index

