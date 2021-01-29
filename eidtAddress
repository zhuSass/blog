import React, { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Taro, { Component, usePullDownRefresh, useRouter } from '@tarojs/taro';
import { View, Image, Text, Picker, Icon, ScrollView, Input, BaseEventOrig, } from '@tarojs/components'
import NavBar from '@/components/navBar';
import Tabbar from '@/components/tabBar';
import {
  AtTabs, AtTabsPane, AtInput,
  AtCard, AtForm, AtList, AtListItem, AtTextarea,
  AtButton, AtSearchBar
} from "taro-ui";
import Font from '@/components/font';
import CascadeRegion from '@/components/cascadeRegion';

import './index.scss';
import App from '@/globalData/index'
import { AppStore } from "@/store/index";
import https from "@/https/index";

type MainType = {
  pageType: number,
}
function Index() {
  const statusBarHeight = useSelector((state: AppStore) => state.systemInfo.statusBarHeight)
  const router = useRouter<{
    pageType: string,
  }>()
  const regionalIdentity = [2,3,4] // 后端对应的标识:1-大区域 2-省 3-市 4-区 5-街道
  useEffect(() => {
    initData()
  }, [])

  usePullDownRefresh(() => {
  })
  const [state, setState] = useState<any>({
    current: 0,
    value: '',
    phone: '',
    mobile: '',
    name: '',
    contact: '',
    selectorChecked: [],
    regionList: [],
    regionIndex: [],
    regionValue: [],
    fullAddress: '',
    smartDetailedAddress: '',
    address: '',
    province: '',
    provinceId: '',
    provinceName: '',
    cityName: '',
    city: '',
    cityId: '',
    countyId: '',
    countyName: '',
    district: '',
    hallTown: '',
    form: {
      receiverProvince: undefined, //省
      receiverCity: undefined, //市
      receiverDistrict: undefined, //区
    },
  })

  const initData = async function () {
    await initRegion()
  }
  const initRegion = async function() {
    let regionValue:Array<any> = []
    let regionIndex:Array<any> = [0,0,0]
    if (state.form.receiverDistrict) {
      regionValue = [
        state.form.receiverProvince,
        state.form.receiverCity,
        state.form.receiverDistrict,
      ]
    } else {
      regionValue = []
    }
    setState(old => {
      (old.regionValue as Array<any>) = regionValue;
      return {
        ...old,
      }
    })
  }


  const systemAddressList = function(level:number, id: (string | undefined) = undefined): Promise<[any]> {
    return new Promise((resolve) => {
      let data
      if (id) {
        data = id
      } else {
        data = -1
      }
      App.https.systemGetByName({ params: data }).then((res: any) => {
        if (res.data && res.data.length) {
          let regionListIndex = level - 2

          setState(old => {
            (old.regionList as any)[regionListIndex] = res.data
            old.regionList = old.regionList.slice(0, regionListIndex + 1)

            return {
              ...old,
            }
          })
          resolve(res.data)
        }
      })
    })

  }
  const onReset = function () {
  }
  const handleChange = function (value: string | number, key: string) {

    setState((old) => {
      return {
        ...old,
        [key]: value,
      }
    })
  }
  const changefullAddress = function () {

  }
  const pickerChange = function (e) {
    setState((old) => {
      return {
        ...old,
        selectorChecked: e.detail.value
      }
    })
  }
  const smartParse = function () {
    App.https.splitAddress({ params: { address: state.smartDetailedAddress } }).then((res: any) => {
      console.log('-------------', res)

    })
  }
  const onSubmit = function () {
    let data = {
      addressType: 0,
      name: state.name,
      mobile: state.mobile,
      phone: state.phone,
      fullAddress: state.fullAddress
    }
    App.https.addressAdd({ params: data }).then((res: any) => {
      console.log('-------------', res)
      setState(old => {
        return {
          ...old,
        }
      })
      Taro.navigateBack();
    })
  }
  const changeRegion = function (list) {
    setState(old => {
      state.regionValue = list;
      old.form.receiverProvince = list[0];
      old.form.receiverCity = list[1];
      old.form.receiverDistrict = list[2];
      return {
        ...old,
      }
    })
  }
  const showColumnRegio = function() {
    initRegion()
  }

  return (
    <View className="eidtAddress-wrap">
      <NavBar centerItem='新增地址簿' />
      <View >
        <AtForm
          className="eidtAddress-wrap-main"
        >
          <AtCard>
            <AtInput
              name='name'
              title='姓名'
              type='text'
              placeholder='请输入姓名'
              value={state.name}
              onChange={(value) => handleChange(value, 'name')}
            />
            <AtInput
              name='mobile'
              title='手机号'
              type='number'
              placeholder='请输入手机号'
              value={state.mobile}
              onChange={(value) => handleChange(value, 'mobile')}
            />
            <AtInput
              name='phone'
              title='固话'
              type='number'
              placeholder='请输入0开头固话'
              value={state.phone}
              onChange={(value) => handleChange(value, 'phone')}
            />
            <CascadeRegion
              regionValue={state.regionValue}
              changeRegion={changeRegion}
            >
              <AtListItem title='地址'
                          extraText={state.regionValue.join('-')} />
            </CascadeRegion>
            <View className={'at-list__item selectorChecked fullAddress'}>
              <View className={'item-content__info-title'}>详细地址</View>
              <AtTextarea
                value={state.fullAddress}
                maxLength={500}
                onChange={(value) => handleChange(value, 'fullAddress')}
                placeholder='街道、小区、门牌号'
              />
            </View>
            <View className={'at-list__item selectorChecked fullAddress smartDetailedAddress'}>
              <View className={'item-content__info-title'}>
                <View className={'item-content__info-title-txt'}>地址智能解析（选填）</View>
                <View>
                  <Font fontSize="42" fontName='iconpaizhao' color={'rgb(141, 138, 138)'} />
                </View>
              </View>
              <AtTextarea
                value={state.smartDetailedAddress}
                maxLength={500}
                onChange={(value) => handleChange(value, 'smartDetailedAddress')}
                placeholder='粘贴完整收货地址(含姓名、手机/电话、地址) 例：小明，15166668888，广东省深圳市南山区XX街道XX号'
              />
              <View className={'smartDetailedAddress-operation'}>
                <View className={'smartDetailedAddress-operation-paste paste'}>
                  <AtButton type='primary' size='small'>一键粘贴</AtButton>
                </View>
                <View className={'smartDetailedAddress-operation-paste parsing'}>
                  <AtButton type='primary' size='small' onClick={smartParse}>智能解析</AtButton>
                </View>
              </View>
            </View>
            <AtButton className="at-button at-button--normal at-button--primary bottom-submit" onClick={onSubmit}
            >提交</AtButton>
          </AtCard>
        </AtForm>
      </View>
    </View>
  );
}
export default Index;
