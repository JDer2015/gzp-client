import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,WingBlank, WhiteSpace,List,InputItem,Button,Radio} from 'antd-mobile'

import Logo from '../../components/logo/logo'



const ListItem = List.Item;
class Register extends Component{
    state = {
        userName:'',
        passWord:'',
        passWord2:'',
        type:'laoban'
    }

    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    goLogin=()=>{
        this.props.history.replace('/login')
    }
    render(){
        const {type}=this.state
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
                        <WhiteSpace/>
                        <InputItem placeholder='请再次输入密码' onChange={(val)=>{this.handleChange('passWord2',val)}}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio className="my-radio" onChange={()=>{this.handleChange('type','dashen')}} checked={type==='dashen'}>大神</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio className="my-radio" onChange={()=>{this.handleChange('type','laoban')}} checked={type==='laoban'}>老板</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary'>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(

)(Register)