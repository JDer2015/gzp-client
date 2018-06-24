import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER} from './action-types'


import {getRedirectToPath} from '../utils/index'

const initUser = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
function user(state=initUser,action) {
    switch(action.type){
        case AUTH_SUCCESS:
            const user = action.data
            return {...action.data,redirectTo:getRedirectToPath(user.type,user.header)}
        case ERR_MSG:
            return {...state,msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }
}

//向外暴露一个整合后产生的reducer
export default combineReducers({
    user
})
//整合后reducer管理的状态：｛xxx：0｝