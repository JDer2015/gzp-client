/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon} from 'antd-mobile'
import {connect}from 'react-redux'

import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
        content:''
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    // 更新后, 自动滚动到底部
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    sendMsg = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content
        this.props.sendMsg({from,to,content})
        this.setState({content:''})
    }

    render() {
        const userid = this.props.user._id
        const targetId = this.props.match.params.userid
        const meId = userid
        const chat_id = [meId,targetId].sort().join('_')
        const {users,chatMsgs} = this.props.chat
        // debugger
        if(chatMsgs.length === 0){
            return null
        }

        console.log(users,chatMsgs)

        const currentMsgs = chatMsgs.filter(chat => chat.chat_id === chat_id)
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type='left'/>} onClick={()=>{this.props.history.goBack()}}>{users[targetId].username}</NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    {
                        currentMsgs.map((msg,index) => {
                            if(msg.to === meId){
                                return (
                                    <Item
                                        key={index}
                                        thumb={require(`../../assets/imgs/${users[targetId].header}.png`)}
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }else{
                                return (
                                    <Item
                                        key={index}
                                        className='chat-me'
                                        extra='我'
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }

                    })
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        onChange = {(val) => {this.setState({content:val})}}
                        placeholder="请输入"
                        value={this.state.content}
                        extra={
                            <span onClick={this.sendMsg}>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg}
)(Chat)
