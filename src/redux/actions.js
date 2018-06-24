import {AUTH_SUCCESS,ERR_MSG,RECEIVE_USER,RESET_USER} from './action-types'
import {reqLogin,reqRegister,reqSave} from '../api/index'

const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
export const err_msg = (msg) => ({type:ERR_MSG,data:msg})
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
const resetUser = (msg) => ({type:RESET_USER,data:msg})

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