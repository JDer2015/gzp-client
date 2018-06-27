import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_CHAT_MSG,RECEIVE_CHAT} from './action-types'


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

const initUserList = []
function userList(state=initUserList,action) {
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users:{},
    chatMsgs:[]
}
function chat(state=initChat,action) {
    switch (action.type){
        case RECEIVE_CHAT_MSG:
            return {users:state.users,chatMsgs:[...state.chatMsgs,action.data]}
        case RECEIVE_CHAT:
            return action.data
        default:
            return state
    }
}

//向外暴露一个整合后产生的reducer
export default combineReducers({
    user,userList,chat
})
//整合后reducer管理的状态：｛xxx：0｝