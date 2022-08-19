import React, { Component } from 'react'

export default class App extends Component {
    state = {
        name:'libai'
    }
    // componentWillMount(){} fiber
    //Warning: componentWillMount has been renamed, and is not recommended for use. 
    UNSAFE_componentWillMount(){
        console.log('componentWillUnmount',this.state.name,document.querySelector('#myname'));
        //最后机会修改state
        // this.setState({
        //     name:"LIBAI"
        // })
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
  UNSAFE_componentWillUpdate(){
    console.log('componentWillUpdate',document.querySelector('#myname').innerHTML)
  }
  componentDidUpdate(prevProps,prevState){
    //更新后，获取DOM节点
    console.log('componentDidUpdate',document.querySelector('#myname').innerHTML)
  }
}

//生命周期存在于类组件中，函数组件暂无
