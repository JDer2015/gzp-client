/*
用户个人中心路由组件
 */

import React,{Component} from 'react'
import {Result, List, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
    logout = () => {
        Modal.alert('退出', '确定退出?', [
            { text: '取消',style: 'default' },
            { text: '确定',
                onPress: () => {
                    Cookies.remove('userid')
                    this.props.resetUser()

                } },
        ]);
    }

    render() {
        const {user} = this.props
        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/imgs/${user.header}.png`)} style={{width: 50}} alt="header"/>}
                    title={user.username}
                    message={user.company ? user.company : null}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {user.post}</Brief>
                        <Brief>简介: {user.info}</Brief>
                        {user.salary ? <Brief>薪资: {user.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick = {this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)
