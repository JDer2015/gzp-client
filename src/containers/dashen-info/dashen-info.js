import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {NavBar,InputItem,Button,TextareaItem} from 'antd-mobile'
import HeaderSelect from '../../components/headerselect/headselect'
import {updateUser} from '../../redux/actions'

class LaoBanInfo extends Component{
    state = {
        header: '',
        post: '',
        info: ''
    }
    handleChange = (name,value) =>{
        this.setState({
            [name] : value
        })
    }
    setHeader = (header) => {
        this.setState({header})
    }
    save = () => {
        this.props.updateUser(this.state)
    }
    render(){
        const {header} = this.props.user
        if(header){
            return <Redirect to='/dashen'/>
        }
        return(
            <div>
                <NavBar>大神完善信息</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem placeholder='求职岗位' onChange = {(value)=>this.handleChange('post',value)}>求职岗位:</InputItem>
                <TextareaItem title='给人介绍:' rows={3} placeholder='给人介绍' onChange = {(value)=>this.handleChange('info',value)}/>
                <Button type='primary' onClick = {this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(LaoBanInfo)