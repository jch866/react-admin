import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}
//发布订阅   观察者模式
const bus = {
  callbacks: [],
  publish(v) {
    this.callbacks.forEach(item => {
      item && item(v);
    })
  },
  subscribe(cb) {
    this.callbacks.push(cb)
  }
}
bus.subscribe((value)=>{
  console.log(111,value)
})
bus.subscribe((value)=>{
  console.log(222,value)
})
setTimeout(()=>{
  bus.publish('hello');
})