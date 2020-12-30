import { setList,setSelectIndex } from './action'

export type TabBarInitState = {
  selectIndex: number,
  list: Array<{
    pagePath: string,
    selectedIconPath: string,
    iconPath: string,
    text: '首页' | '我的',
  }>
}
const tabBarInitState:TabBarInitState = {
  selectIndex: 0,
  list: [],
};
export default function counter(state = tabBarInitState, action) {
  switch (action.type) {
    case setList:
      return {...state, list: action.data}
    case setSelectIndex:
      console.log('3--------', action.data)
      return {...state, selectIndex: action.data}
     default:
       return state
  }
}
