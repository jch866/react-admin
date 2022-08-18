import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div className='mai-title'>
        <button>返回</button>
        <span>卖座电影</span>
        <button onClick={()=>{
            this.props.navbarEvent()
        }}>我的</button>
      </div>
    )
  }
}
