import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar,WingBlank, WhiteSpace,List,InputItem,Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'
import {login,err_msg} from '../../redux/actions'


 class Login extends Component{
     state = {
         username:'',
         password:''
     }

     handleChange=(name,value)=>{
         this.setState({
             [name]:value
         })
     }
     login = () => {
         const {username,password} = this.state
         this.props.login(username,password)
     }
     goRegister=()=>{
         this.props.history.replace('/register')
         this.props.err_msg('')
     }
    render(){
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
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goRegister}>还没有账户</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login,err_msg}
)(Login)