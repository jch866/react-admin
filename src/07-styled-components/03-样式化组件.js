import React, { Component } from 'react'
import styled from 'styled-components'
function Child(props){
    return (<div className={props.className}>
        child
    </div>)
}
export default class App extends Component {
  render() {
    // styled包装子组件生成高阶组件
    const StyledChild = styled(Child)`
    background:red
    `
    return (
      <div>App
        {/* <Child/> */}
        <StyledChild/>
      </div>
    )
  }
}
