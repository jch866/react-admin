import React, { Component } from 'react'
import Tabbar from './components/Tabbar'
import Mrouter from './router/index'
import store from "./mobx/store"
// import { observable, autorun } from 'mobx';
import { inject,observer } from 'mobx-react';
@inject('store')
@observer
class App extends Component {
  state = {
    isShow: true
  }
  componentDidMount() {
    console.log(this.props.store);
    // autorun(()=>{
    //   console.log(store.isTabbarShow);
    //   this.setState({
    //     isShow:store.isTabbarShow
    //   })
    // })
  }
  render() {
    return (
      <div>
        <Mrouter>
          {this.state.isShow && <Tabbar></Tabbar>}
        </Mrouter>
        {/* You should not use <NavLink> outside a <Router></Router> */}
      </div>
    )
  }
}
 
export default  App

// 引入Mobx操作