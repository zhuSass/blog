import React, { useEffect,useState, } from 'react'

import Taro, { Component,usePullDownRefresh } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.scss';

function Index() {
  usePullDownRefresh(() => {
    console.log('onPullDownRefresh')
  })
  return (
    <View className="mod">
      
    </View>
  );
}
export default Index;
