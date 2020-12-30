import { statusBarHeight, } from './action'

export type SystemInfo = {
  statusBarHeight: number,
}
const systemInfoState:SystemInfo = {
  statusBarHeight: 0,
}
export default function systemInfo(state = systemInfoState, action) {
  switch (action.type) {
    case statusBarHeight:
      return {
        ...state,
        statusBarHeight: action.data,
      }
     default:
       return state
  }
}
