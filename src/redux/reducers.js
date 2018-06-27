import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_CHAT_MSG,RECEIVE_CHAT,READ_MSG} from './action-types'


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
    chatMsgs:[],
    unReadCount:0
}
function chat(state=initChat,action) {
    switch (action.type){
        case RECEIVE_CHAT_MSG:
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,action.data.chatMsgs],
                unReadCount:state.unReadCount
                + ((!action.data.chatMsgs.read && action.data.chatMsgs.to === action.data.meId) ? 1 : 0)
            }
        case RECEIVE_CHAT:
            return {
                users:action.data.users,
                chatMsgs:action.data.chatMsgs,
                unReadCount:action.data.chatMsgs.reduce((preTotal,msg) => {
                    return preTotal + ((!msg.read && msg.to === action.data.meId) ? 1 : 0 )
                },0)
            }
        case READ_MSG:
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg => {
                    if(msg.from === action.data.from && msg.to === action.data.to && !msg.read){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                }),
                unReadCount:state.unReadCount - action.data.count
            }
        default:
            return state
    }
}

//向外暴露一个整合后产生的reducer
export default combineReducers({
    user,userList,chat
})
//整合后reducer管理的状态：｛xxx：0｝