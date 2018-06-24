import ajax from './ajax'

//发送登录请求
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

//发送注册请求
export const reqRegister = ({username,password,type}) => ajax('/register',{username,password,type},'POST')

//发送保存请求
export const reqSave = (user) => ajax('/update',user,'POST')