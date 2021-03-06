import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar,WingBlank, WhiteSpace,List,InputItem,Button,Radio} from 'antd-mobile'


import Logo from '../../components/logo/logo'
import {register,err_msg} from '../../redux/actions'



const ListItem = List.Item;
class Register extends Component{
    state = {
        username:'',
        password:'',
        password2:'',
        type:'laoban'
    }
    register = () =>{
        const {username,password,password2,type} = this.state
        this.props.register({username,password,password2,type})
    }

    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    goLogin=()=>{
        this.props.history.replace('/login')
        this.props.err_msg('')
    }
    render(){
        const {type}=this.state
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        {msg ? <p className='error-msg'>{msg}</p> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={(val)=>{this.handleChange('username',val)}}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' onChange={(val)=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请再次输入密码' onChange={(val)=>{this.handleChange('password2',val)}}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio className="my-radio" onChange={()=>{this.handleChange('type','dashen')}} checked={type==='dashen'}>大神</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio className="my-radio" onChange={()=>{this.handleChange('type','laoban')}} checked={type==='laoban'}>老板</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {register,err_msg}
)(Register)
