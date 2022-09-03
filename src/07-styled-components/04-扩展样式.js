import React, { Component } from 'react'
import styled from 'styled-components'

export default class App extends Component {
  render() {
    const StyleButton = styled.button`
        height:40px;
        width:40px;
        background:yellow;
        outline:none;
    `

    // 类似继承
    const StyleButton2 =styled(StyleButton)`
        background:blue;
    `

    return (
      <div>App
        <StyleButton></StyleButton>
        <StyleButton2></StyleButton2>
      </div>
    )
  }
}
