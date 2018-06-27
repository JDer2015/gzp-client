import io from 'socket.io-client'

import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_CHAT_MSG,RECEIVE_CHAT} from './action-types'
import {reqLogin,reqRegister,reqSave,reqUser,reqUserList,reqChat} from '../api/index'

const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
export const err_msg = (msg) => ({type:ERR_MSG,data:msg})
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
const receiveUserList = (users) => ({type:RECEIVE_USER_LIST,data:users})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
const receiveChatMsg = (chatMsgs) => ({type:RECEIVE_CHAT_MSG,data:chatMsgs})
const receiveChat = (chat) => ({type:RECEIVE_CHAT,data:chat})

//连接服务器得到代表连接的对象
const socket = io('ws://localhost:4000')
//绑定监听获取浏览器发来的消息
function initSocketIO(userid,dispatch) {
    socket.on('receiveMsg',function (chatMsg) {
        // console.log(chatMsg,userid)
        if(chatMsg.from === userid || chatMsg.to === userid){
            // console.log('接收到一条有用的消息~~~')
            dispatch(receiveChatMsg(chatMsg))
        }else{
            console.log('接收到一条没用的消息~~~')
        }
    })
}

//获取当前用户的所有的效力列表
async function getChat(userid,dispatch) {
    initSocketIO(userid,dispatch)
    const response = await reqChat()
    const result = response.data
    if(result.code === 0){
        console.log('获取数据成功!!!')
        dispatch(receiveChat(result.data))
    }
}

//异步发送消息
export const sendMsg = (data) => {
    return dispatch => {
        socket.emit('sendMsg',data)
        // console.log('浏览器端成功向服务器端发送一条消息！！！')
    }
}


export const register = ({username,password,password2,type}) => {
    if(!username){
        return err_msg('请输入用户名')
    }else if(!password){
        return err_msg('请输入密码')
    }
    return dispatch => {
        if(password !== password2){
            return dispatch(err_msg('两次密码输入不一致'))
        }
        reqRegister({username,password,type})
            .then(response => {
                const result = response.data
                if(result.code === 0){
                    const user = result.data
                    getChat(user._id,dispatch)
                    dispatch(authSuccess(user))
                }else{
                    dispatch(err_msg(result.msg))
                }
            })
    }
}

export const login = (username,password) => {
    if(!username){
        return err_msg('请输入用户名')
    }else if(!password){
        return err_msg('请输入密码')
    }
    return dispatch => {
        reqLogin(username,password)
            .then(response => {
                const result = response.data
                if(result.code === 0){
                    const user = result.data
                    getChat(user._id,dispatch)
                    dispatch(authSuccess(user))
                }else{
                    dispatch(err_msg(result.msg))
                }
            })
    }
}

export const updateUser = (user) =>{
    return async dispatch => {
        const response = await reqSave(user)
        const result = response.data
        if(result.code === 0){
            const user = result.data
            dispatch(receiveUser(user))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            const user = result.data
            getChat(user._id,dispatch)
            dispatch(receiveUser(user))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if(result.code === 0){
            const data = result.data.filter(item => item.header)
            dispatch(receiveUserList(data))
        }
    }
}