import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/userlist/userlist'
import {getUserList} from '../../redux/actions'



class LaoBan extends Component{
    componentDidMount(){
        this.props.getUserList('dashen')
    }
    render(){
        return <UserList userList={this.props.userList}/>
    }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(LaoBan)