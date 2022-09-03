import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  render() {
    const StyledInput = styled.input`
    outline:none;
    border-radius:10px;
    border-bottom:1px solid #333;
    `
    const StyledDiv = styled.div`
    background:${props=>props.bg||'yellow'};
    height:100px;
    width:100px;
    `
    return (
      <div>App
        {/* <input type="text" /> */}
        {/* StyledInput组件不影响原标签上的原生props */}
        <StyledInput type="password" placeholder='input'/>
        {/* 自定义的属性传递，要手工设置${props=>props.bg|| 'yellow'}  没传bg属性默认yellow */}
        <StyledDiv bg='blue'></StyledDiv>

      </div>
    )
  }
}
