import {combineReducers} from 'redux'

function xxx(state=0,action) {
    switch(action.type){

        default:
            return state
    }
}
function yyy(state=[],action) {
    switch(action.type){

        default:
            return state
    }
}
//向外暴露一个整合后产生的reducer
export default combineReducers({
    xxx,
    yyy
})
//整合后reducer管理的状态：｛xxx：0，yyy：[]｝