import React, { Component } from 'react'
import Tabbar from './components/Tabbar'
import Mrouter from './router/index'
import store from "./redux/store"
export default class App extends Component {
  state = {
    isShow: true
  }
  componentDidMount() {
    //store.getState(); 获取最新的状态
    store.subscribe(() => { //订阅
      console.log('subscribe');
      let { isTabbarShow } = store.getState();
      //isTabbarShow 转成当前组件的状态
      this.setState({
        isShow: isTabbarShow
      }
      )
    })
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
