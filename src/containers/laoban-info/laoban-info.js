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
        company: '',
        salary: '',
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
            return <Redirect to='/laoban'/>
        }
        return(
            <div>
                <NavBar>老板完善信息</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                <InputItem placeholder='招聘职位' onChange = {(value)=>this.handleChange('post',value)}>招聘职位:</InputItem>
                <InputItem placeholder='公司信息' onChange = {(value)=>this.handleChange('company',value)}>公司信息:</InputItem>
                <InputItem placeholder='职位薪水' onChange = {(value)=>this.handleChange('salary',value)}>职位薪水:</InputItem>
                <TextareaItem title='职位要求:' rows={3} placeholder='职位要求' onChange = {(value)=>this.handleChange('info',value)}/>
                <Button type='primary' onClick = {this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(LaoBanInfo)