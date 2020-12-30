import React, { ReactNode, useContext,
     useRef,
} from 'react';
import { View, Image, Text } from '@tarojs/components'

import Font from '@/components/font'
import './index.scss';

export type propsType = {
    fallback?: JSX.Element, // 加载中组件
    errorLazy?: JSX.Element, // 加载失败组件
    children: JSX.Element[] | JSX.Element, 
    error: boolean, // 错误状态
    loading: boolean, // 加载状态
    dataLeng: number, // 数据长度
    reloadCall?: Function, // 重新发出请求
}

function Loadding() {
    return <View className='loadding'>
        <Font fontName="iconjiazai moveRotate" color='#fbcf66'/>
        <Text className='text loaddingText'>加载中...</Text>
    </View>
}
function ErrorStatus(props:propsType) {

    const goToPage = function() {
    };
    return <View className='errorStatus'>
        <View className='errorStatusIconWrap'>
            <Font 
                color='#fbcf66'
                fontName='iconpopfailure'
                />
        </View>
        <Text className='text'>似乎出了点问题...</Text>
        <View className='errorStatusLoad' onClick={() => goToPage()}>
            <Text className='errorStatusLoadText'>重新加载</Text>
        </View>
    </View>
}
function NoData() {
    return <View className='keyWordRecommendContentNoData'>
        <Text className='noDataText'>~~暂时没有数据~~</Text>
    </View>
}

export default function LazyLoading(props: propsType) {
    const {fallback, errorLazy, error, reloadCall, children, loading, dataLeng,} = props;

    const LoaddingLazy = fallback !== undefined && React.isValidElement(fallback) ?
        <View>{fallback}</View>:<Loadding/>;    
    const ErrorStatusLazy = errorLazy !== undefined && React.isValidElement(errorLazy) ?
        <View>{errorLazy}</View>:<ErrorStatus {...props}/>;    
    const resulte = dataLeng ? children : <NoData/>;
    const DataLazy = loading ? LoaddingLazy : resulte;

    return <View className='lazyLoadingWrap'>
        {error ? ErrorStatusLazy : DataLazy}
    </View>

};
