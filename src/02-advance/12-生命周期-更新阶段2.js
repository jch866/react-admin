import React, { Component } from 'react'

export default class App extends Component {
    state = {
        name:'libai'
    }
    
    componentDidMount(){
        //数据请求
        console.log('componentDidMount')
    }
  render() {
    console.log('render')
    return (
      <div>
        <button onClick={()=>{
          this.setState({
            name:'LIBAI'
          })
        }}>click</button>
        <span id="myname">{this.state.name}</span>
      </div>
    )
  } 
  //scu
  shouldComponentUpdate(nextProps,nextState){
    // this.state  老状态
    // nextState 新状态
    // return false // 阻止更新
    // return true //一直更新
    // if(old state != new state) { return true}
    if(JSON.stringify(this.state) !== JSON.stringify(nextState)){ //如果属性多了
        return true;
      }
      return false 
  }
  UNSAFE_componentWillUpdate(){
    console.log('componentWillUpdate')
  }
  componentDidUpdate(prevProps,prevState){
    //更新后，获取DOM节点
    console.log('componentDidUpdate')
  }
}

//生命周期存在于类组件中，函数组件暂无
