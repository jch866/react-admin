
import React, { Component } from 'react'
class Child extends Component{
    render (){
        console.log(this.props);
        return (
            <div>
                {/* 类似具名插槽 this.props.children*/}
                { this.props.children[0] }
                { this.props.children[1] }
                { this.props.children[2] }
            </div>
        )
    }
}
export default class App extends Component {
  render() {
    return (
      <div>App
        <Child>
            <div>child slot1</div>
            <div>child slot2</div>
            <div>child slot3</div>
            {
                //chilren
            }
        </Child>
      </div>
    )
  }
}

// 利用复用
// 减少一定的父子通信
