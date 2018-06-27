import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item
class NavFooter extends Component{
    render(){
        const NavList = this.props.navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname
        const unReadCount = this.props.unReadCount
        return (
            <TabBar>
                {
                    NavList.map((nav,index) => {
                    return <Item key={index}
                              title={nav.text}
                              badge = {nav.path === '/message' ? unReadCount : 0}
                              icon={{ uri: require(`./imgs/${nav.icon}.png`)}}
                              selectedIcon={{uri: require(`./imgs/${nav.icon}-selected.png`)}}
                              selected={nav.path===path}
                              onPress={() => this.props.history.replace(nav.path)}
                        />
                    })
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)