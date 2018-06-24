import React,{Component} from 'react'
import {List, Grid} from 'antd-mobile'

export default class HeaderSelect extends Component{
    state = {
        icon : null
    }
    handleSelectHeader =({text,icon}) =>{
        this.setState({icon})
        this.props.setHeader(text)
    }

    render(){
        const {icon} = this.state
        const header = !icon ? '请选择头像:' : <p>已选择头像:<img src={icon} alt='头像'/></p>
        const headers = []
        for(let i=0;i<20;i++){
            const text = '头像' + (i+1)
            const icon = require(`./imgs/${text}.png`)
            headers.push({text,icon})
        }
        return(
            <List renderHeader={() => header}>
                <Grid data={headers} columnNum={5} onClick={this.handleSelectHeader}/>
            </List>
        )
    }
}