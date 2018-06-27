/*
用户列表的UI组件
 */
import React,{Component} from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    render() {
        const {userList} = this.props
        return (
            <WingBlank>
                <div>
                    {
                        userList.map((user,index) => {
                            return (
                                <div key = {index}>
                                    <WhiteSpace/>
                                    <Card onClick = {() => this.props.history.push('/chat/' + user._id)}>
                                        <Header
                                            thumb={require(`../../assets/imgs/${user.header}.png`)}
                                            extra={user.username}
                                        />
                                        <Body>
                                        <div>职位: {user.post}</div>
                                        {user.company ? <div>公司: {user.company}</div> : null}
                                        {user.salary ? <div>月薪: {user.salary}K</div> : null}
                                        <div>描述: {user.info}</div>
                                        </Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)

