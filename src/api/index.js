import ajax from './ajax'

//发送登录请求
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

//发送注册请求
export const reqRegister = ({username,password,type}) => ajax('/register',{username,password,type},'POST')

//发送保存请求
export const reqSave = (user) => ajax('/update',user,'POST')
//自动登录
export const reqUser = () => ajax('/user')
//获取用户列表
export const reqUserList = (type) => ajax('/userlist',{type})
//获取聊天信息列表
export const reqChat = () => ajax('/msglist')

//获取已读消息数据
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')