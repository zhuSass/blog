import React, { useEffect,useState, } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper,
  SwiperItem,Image,Text, } from '@tarojs/components'

import NavBar from '@/components/navBar';
import Tabbar from '@/components/tabBar';
import Font from '@/components/font'

import config from '@/config/index';

import './index.scss'

function Index() {
  const [bannerList, setBannerList] = useState([
    {
      imageUrl: "/img/swiper/1605527623155.jpg",
    },
    {
      imageUrl: "/img/swiper/1605527992999.jpg",
    },
    {
      imageUrl: "/img/swiper/1605690693841.jpg",
    },
  ])
  const [operationList, setOperationList] = useState([
      {
        imageUrl: "iconhuowudui",
        color: '#fbcf66',
        title: "demo1",
      },
      {
        imageUrl: "iconhuowujilu",
        title: "demo1",
      },
      {
        imageUrl: "iconyifahuodefuben",
        title: "demo1",
      },
      {
        imageUrl: "iconrukuguanli",
        color: '#fbcf66',
        title: "demo1",
      },
      {
        imageUrl: "iconshangjiaguanli",
        title: "demo1",
      },
      {
        imageUrl: "iconchukuguanli",
        title: "demo1",
      },
      {
        imageUrl: "iconhuowuchaxun",
        title: "demo1",
      },
      {
        imageUrl: "iconchaxun",
        title: "demo1",
      },
      {
        imageUrl: "iconsaoma",
        color: '#ffad8d',
        title: "demo1",
      },
      {
        imageUrl: "icontuihuo",
        color: '#ffad8d',
        title: "demo1",
      },
    ])

  useEffect(() => {
  }, [])
  return (
    <View className="index-wrap">
      <NavBar position='realtive' centerItem='测试收发室'/>
      <View className="index-container">
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
            {bannerList.map((item) => {
              return <SwiperItem className="swiper-item">
                <Image mode="aspectFill" src={`${config.staticPath}${item.imageUrl}`} className='swiper-item-img'/>
            </SwiperItem>
            })}
        </Swiper>
        <View className='index-position'>
          <Font fontSize='30' color='#6FADF8' fontName='iconlocation index-position-icon'/>
          <Text className='index-position-text'>广东省东莞市南城街道三源广场</Text>
        </View>
        <View className="index-operation">
          {operationList.map((item) => {
            return <View className='index-operation-item'>
              <Font fontName={`operation-item-img ${item.imageUrl}`}
                color={item.color} fontSize={60}/>
              <Text className='operation-item-text'>{item.title}</Text>
            </View>
          })}
        </View>
      </View>

      <Tabbar />
    </View>
  )
}

export default Index

