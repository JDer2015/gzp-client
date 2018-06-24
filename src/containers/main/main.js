import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'


import LaoBanInfo from '../laoban-info/laoban-info'
import DaShenInfo from '../dashen-info/dashen-info'
class Main extends Component{
    render(){
        return (
            <div>
                <Route path='/laobaninfo' component={LaoBanInfo}/>
                <Route path='/dasheninfo' component={DaShenInfo}/>
            </div>
        )
    }
}
export default connect(

)(Main)