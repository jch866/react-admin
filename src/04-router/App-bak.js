import React, { Component } from 'react'
import Tabbar from './components/Tabbar'
import Mrouter from './router/index'
// import store from "./redux/store"/
import {connect} from "react-redux"
class App extends Component {
  // state = {
  //   isShow: true
  // }
  componentDidMount() {
    console.log(this.props);
    //store.getState(); 获取最新的状态
    // store.subscribe(() => { //订阅
    //   console.log('App subscribe');
    //   let { isTabbarShow } = store.getState().TabbarReducer;
    //   //isTabbarShow 转成当前组件的状态
    //   this.setState({
    //     isShow: isTabbarShow
    //   }
    //   )
    // })
  }
  render() {
    return (
      <div>
        <Mrouter>
          {this.props.isShow && <Tabbar></Tabbar>}
        </Mrouter>
        {/* You should not use <NavLink> outside a <Router></Router> */}
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    isShow:state.TabbarReducer.isTabbarShow
  }
}
const mapDispatchToProps = null;
export default  connect(mapStateToProps,mapDispatchToProps)(App)