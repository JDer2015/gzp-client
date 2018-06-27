/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief
function getLastMsgs(chatMsgs,meId) {
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        if(!msg.read && msg.to === meId){
            msg.unReadCount = 1
        }else{
            msg.unReadCount = 0
        }
        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]
        if(!lastMsg){
            lastMsgObjs[chatId] = msg
        }else{
            if(msg.create_time > lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = lastMsg.unReadCount + msg.unReadCount
        }
    })
    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (a,b) {
        return b.create_time - a.create_time
    })
    return lastMsgs
}
class Message extends Component {

    render() {
        const {users,chatMsgs} = this.props.chat
        const meId = this.props.user._id
        const lastMsgs = getLastMsgs(chatMsgs,meId)
        return (
            <List style={{marginTop: 50, marginBottom: 50}}>
                {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
                <QueueAnim type='scale' delay={100}>
                    {
                        lastMsgs.map((msg,index) =>{
                            const targetId = msg.from === meId ? msg.to : msg.from
                            return (
                                <Item
                                    key = {index}
                                    onClick = {() => {this.props.history.push('/chat/' + targetId)}}
                                    extra={<Badge text={msg.unReadCount}/>}
                                    thumb={require(`../../assets/imgs/${users[targetId].header}.png`)}
                                    arrow='horizontal'
                                >
                                    {msg.content}
                                    <Brief>{users[targetId].username}</Brief>
                                </Item>
                            )
                        })
                    }
                </QueueAnim>
            </List>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat})
)(Message)
