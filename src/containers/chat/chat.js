/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'
import {connect}from 'react-redux'

import {sendMsg,getReadMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
        content:'',
        isShow:false
    }
    componentWillMount () {// 第一次调用render渲染前调用, 调用一次
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(value => ({text: value}))
        // console.log(this.emojis)
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.getReadMsg(from,to)
    }
    componentWillUnmount(){
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.getReadMsg(from,to)
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
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
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
                        onFocus = {() => {this.setState({isShow:false})}}
                        placeholder="请输入"
                        value={this.state.content}
                        extra={
                            <div>
                                <span onClick={this.toggleShow}>😊</span>
                                <span onClick={this.sendMsg} style={{marginLeft:10}}>发送</span>
                            </div>
                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({
                                        content: this.state.content + item.text
                                    })
                                }}
                            />
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg,getReadMsg}
)(Chat)
