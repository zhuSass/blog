import React, { Component,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Provider,useDispatch } from 'react-redux'

import * as tools from '@/tools/index'
import { actionList } from '@/store/tabBar/action'
import { getStatusBarHeight } from '@/store/systemInfo/action'
import configStore from '@/store/index'

import './app.scss'

const store = configStore()

function RunInt() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionList())
    dispatch(getStatusBarHeight())
  }, [])

  return null
}
class App extends Component {
  componentWillMount () {
    // 自定义导航api判断
    tools.determineWeChatPlatformVersion('2.5.0');
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <RunInt/>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
