import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route,Redirect,Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import LaoBanInfo from '../laoban-info/laoban-info'
import DaShenInfo from '../dashen-info/dashen-info'
import DaShen from '../dashen/dashen'
import LaoBan from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import {getUser} from '../../redux/actions'
import {getRedirectToPath} from '../../utils/index'
import NavFooter from '../../components/navfooter/navfooter'
import NotFound from '../../components/not-found/not-found'

class Main extends Component{
    navList = [
        {
            path: '/laoban', // 路由路径
            component: LaoBan,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: DaShen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount(){
        const userid = Cookies.get('userid')
        const {user} = this.props
        if(userid && !user._id){
            this.props.getUser()
        }
    }

    render(){
        const {navList} = this
        const userid = Cookies.get('userid')
        if(!userid){
            return <Redirect to='/login'/>
        }
        const {user} = this.props
        if(!user._id){
            return null
        }
        const path = this.props.location.pathname
        if(path ==='/'){
            return <Redirect to={getRedirectToPath(user.type,user.header)}/>
        }
        if(user.type ==='laoban'){
           navList[1].hide = true
        }else{
            navList[0].hide = true
        }
        const currentList = navList.find(nav => nav.path === path)
        return (

            <div>
                {currentList ? <NavBar>{currentList.title}</NavBar> : null}
                <Switch>
                <Route path='/laobaninfo' component={LaoBanInfo}/>
                <Route path='/dasheninfo' component={DaShenInfo}/>
                <Route path='/dashen' component={DaShen}/>
                <Route path='/laoban' component={LaoBan}/>
                <Route path='/message' component={Message}/>
                <Route path='/personal' component={Personal}/>
                <Route path='/chat/:userid' component={Chat}/>
                <Route component={NotFound}/>
                </Switch>

                {currentList ? <NavFooter navList={navList} unReadCount = {this.props.chat.unReadCount}/> : null}

            </div>
        )
    }
}
export default connect(
    state => ({user:state.user,chat:state.chat}),
    {getUser}
)(Main)