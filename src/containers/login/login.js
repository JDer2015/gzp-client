import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,WingBlank, WhiteSpace,List,InputItem,Button,Radio} from 'antd-mobile'

import Logo from '../../components/logo/logo'



 class Login extends Component{
     state = {
         userName:'',
         passWord:''
     }

     handleChange=(name,value)=>{
         this.setState({
             [name]:value
         })
     }
     goRegister=()=>{
         this.props.history.replace('/register')
     }
    render(){
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={(val)=>{this.handleChange('userName',val)}}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' onChange={(val)=>{this.handleChange('passWord',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goRegister}>还没有账户</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(

)(Login)