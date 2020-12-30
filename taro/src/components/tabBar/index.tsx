import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import Font from '@/components/font'

import { actionSelectIndex } from '@/store/tabBar/action'
import {AppStore} from '@/store/index'


import './index.scss'

function Index() { 
  const tabBar:AppStore['tabBar'] = useSelector((state:AppStore) => state.tabBar)
  const dispatch = useDispatch();

  const changePage = function(index) {
    let current = tabBar.list[index]
    Taro.switchTab({
      url: current.pagePath,
    })
    dispatch(actionSelectIndex(index))
  }

  return (
    <View className='tabBar-wrap'>
      {tabBar.list.map((item, index) => {
        return <View onClick={() => changePage(index)} className={`tabBar-item ${index === tabBar.selectIndex ?
                'tabBar-actionItem' : null}`}>
            <Font fontSize='50' className="tabBar-item-icon" fontName={item.iconPath}/>
            <View className="tabBar-item-title">{item.text}</View>
        </View>   
      })}
    </View>
  )
}

export default Index

