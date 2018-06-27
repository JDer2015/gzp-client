import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/userlist/userlist'
import {getUserList} from '../../redux/actions'

class DaShen extends Component{

    componentDidMount(){
        this.props.getUserList('laoban')
    }
    render(){
        return <UserList userList={this.props.userList}/>
    }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(DaShen)