import React, { Component } from 'react'

export default class App extends Component {
    state = {
        isShow : true
    }
  render() {
    let {isShow} = this.state;
    return (
      <div>App
        <button onClick={()=>{
            this.setState({
                isShow:!isShow
            })
        }}>toggle</button>
        {/* {isShow?<Child/>:''} */}
        {isShow && <Child/>}
      </div>
    )
  }
}
class Child extends Component {
    render() {
      return (
        <div>Child</div>
      )
    }
    componentDidMount(){
        console.log('componentDidMount')
        window.onresize = ()=>{
            console.log('resize')
        }
        //放在state中的数据一般跟视图有关联
        //timer 没必要放在state中，直接挂在实例上，componentWillUnmount可以访问到
        this.timer = setInterval(()=>{
            console.log('setInterval')
        },1000)
    }
    // 销毁生命周期 清理工作 定时器和事件监听等
    componentWillUnmount(){
        console.log('componentWillUnmount')
        window.onresize = null;
        clearInterval(this.timer)
    }
  }
//will M RP U
// componentWillMount、
// componentWillReceiveProps、
// componentWillUpdate，
// 三个方法都废弃，用getDerivedStateFromProps来替代