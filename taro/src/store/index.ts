import { createStore, applyMiddleware,combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import systemInfo,{SystemInfo} from './systemInfo/reducer'
import tabBar,{TabBarInitState} from './tabBar/reducer'

const  rootReducer = combineReducers({
  systemInfo,
  tabBar,
})
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)
const store = createStore(rootReducer, enhancer)


export default function configStore() {
  return store
}

export type AppStore = {
  systemInfo: SystemInfo
  tabBar: TabBarInitState
}

