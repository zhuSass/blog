import React, { useEffect,useState, } from 'react'
import Taro from '@tarojs/taro'
import { View,Input,Navigator,Button,BaseEventOrig,BaseEventOrigFunction,
  Form,Image,Text, } from '@tarojs/components'

import NavBar from '@/components/navBar'
import Tabbar from '@/components/tabBar'
import Font from '@/components/font'

import {removeToken} from '@/tools/yishoufa'
import NativeFun from '@/tools/nativeFun'
import https from '@/https/index'

import config from '@/config/index'

import './index.scss'

type FormModel = {
  userName: string, // 用户名称
  password: string, // 用户密码
  imageCaptcha: string, // 验证码
}
function Index() {
  const [inoutType, setInoutType] = useState('')
  const [isShowData, setIsShowData] = useState(false)
  const [isShowCap, setIsShowCap] = useState(false)
  const [codeUrl, setCodeUrl] = useState('')
  const [formModel, setFormModel] = useState<FormModel>({
    userName: '', // 用户名称
    password: '', // 用户密码
    imageCaptcha: '', // 验证码
  })

  useEffect(() => {

  }, [])
  const formSubmit = function(e:BaseEventOrig<{value:FormModel}>) {
    let params = e.detail.value;
    if (params.userName == '' || params.password == '') {
      Taro.showToast({
        title: `${params.userName == '' ? '请输入账号' : '请输入密码'}`,
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.isShowCap && params.imageCaptcha.length != 4) {
      Taro.showToast({
        title: `请输入四位图形验证码'}`,
        icon: 'none',
        duration: 2000
      });
      return;
    }
    removeToken();
    https.authLogin({
      params,
      loadding: true,
    }).then(res => {
      console.log('3-----------', res)
    })
  }
  const inputFocus = function(keyType) {
    setInoutType(keyType)
  }
  const captchaImage = function() {

  }
  const findPassword = function() {

  }
  const handleInputChange = function(e:BaseEventOrig<any>, key:string) {
    setFormModel((old) => {
      return {
        ...old,
        ...{[key]: e.detail.value}
      }
    })
  }
  const toggleSsShowData = function () {
    setIsShowData(!isShowData)
  }
  const handleSetFormModel = function (key, value) {
    setFormModel((oldState) => {
      return {
        ...oldState,
        ...{[key]: value},
      }
    })
  }
  return (
    <View className="login-wrap">
      <NavBar position='realtive' centerItem='用户登录'/>
      <Image className="image-banner" mode="scaleToFill" src={`${config.staticPath}/image/%E6%98%93%E6%94%B6%E5%8F%91PC%E7%99%BB%E5%BD%95.jpg`}/>
      <Form onSubmit={formSubmit}>
        <View className="form-group">
          <View className={`uni-column ${inoutType === 'userName' ? 'solid-orang-bottom' : 'solid-transparent-bottom'}`}>
            <View className={inoutType === 'userName' ? 'text-orange' : 'text-gray'}>账号</View>
            <View  className={`flex align-center ${formModel.userName == '' ? 'padding-tb-sm' : ''}`}>
              <Input value={formModel.userName} adjust-position={false} type="text" maxlength={15} onFocus={()=>inputFocus('userName')}
                onInput={(e)=>handleInputChange(e, 'userName')} cursor-spacing="50" focus className="uni-input flex-sub" placeholder-className="form-input-pla" name="userName"
                placeholder="请输入用户账号" />
              {formModel.userName != '' ? <View  className="padding-tb-sm padding-lr" onClick={() => handleSetFormModel('userName', '')}>
                <Text className="cuIcon-roundclose text-gray"/>
              </View>:null}
            </View>
          </View>
      <View  className={`uni-column margin-top ${inoutType == 'password' ? 'solid-orang-bottom' : 'solid-transparent-bottom'}`}>
      <View className={inoutType == 'password' ? 'text-orange' : 'text-gray'}>密码</View>
      <View className="flex align-center">
        <Input value={formModel.password} adjust-position={false} maxlength={16} onFocus={()=>inputFocus('password')}
               onInput={(e)=>handleInputChange(e, 'password')}
            cursor-spacing="50" password={isShowData ? false : true} className="uni-input flex-sub" placeholder-className="form-input-pla"
            name="password" placeholder="请输入密码" />
        <View className="padding-tb-sm padding-lr" onClick={toggleSsShowData}>
          <Font fontName={`iconfont text-gray ${isShowData ? 'iconpassword-invisible': 'iconpassword-visible'}`} />
        </View>
      </View>
    </View>
      {isShowCap ? <View  className={`uni-column margin-top ${inoutType == 'imageCaptcha' ? 'solid-orang-bottom' : 'solid-bottom'}`}>
        <View className={`form-title ${inoutType == 'imageCaptcha' ? 'text-orange' : ''}`}>图形验证码</View>
        <View className="from-flex">
          <Input value={formModel.imageCaptcha} maxlength={4}  data-id={3} cursor-spacing="50" className="uni-input"
             onInput={(e)=>handleInputChange(e, 'imageCaptcha')} onFocus={()=>inputFocus('imageCaptcha')}
              placeholder-className="form-input-pla" name="imageCaptcha" placeholder="请输入右侧图形验证码" />
          <Image className="ver-image" onClick={captchaImage} src={codeUrl} />
        </View>
      </View>:null}
      <View className="justify-between padding-tb flex">
        <Text className="theme-color" onClick={findPassword}>忘记密码？</Text>
          <Navigator url="/pages/index/register" open-type="navigate">
            <View className="text-blue">注册申请?</View>
          </Navigator>
      </View>
    </View>
      <View className="cu-tabbar-height"/>
      <View className="padding-lr cu-bar foot padding-tb-sm submit-but">
        <Button form-type="submit" className="flex-sub bg-theme cu-btn round lg">登录</Button>
      </View>
    </Form>
    </View>
  )
}

export default Index

