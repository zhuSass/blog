export const setList = 'setList'
export const setSelectIndex = 'setSelectIndex'
  
export const handlerList = (list) => {
    return {
        type: setList,
        data: list,
    }
}
export const handlerSelectIndex  = (selectIndex) => {
    return {
        type: setSelectIndex,
        data: selectIndex,
    }
}

export function actionList() {
    return dispatch => {
        let list = [
            {
                "pagePath": "/pages/index/index",
                "iconPath": 'iconicon_home',
                "text": "首232"
            },
            {
                "pagePath": "/pages/home/index",
                "iconPath": 'iconuser',
                "text": "我的32"
            },
          ];
        dispatch(handlerList(list))
    }
}
export function actionSelectIndex(index) {
    return dispatch => {
        dispatch(handlerSelectIndex(index))

    }
}
  