import React, { Component } from 'react'
import styled,{keyframes} from 'styled-components'

export default class App extends Component {
  render() {
    const mykeyFrames =  keyframes`
    from{
        transform:rotate(0deg)
    }
    to{
        transform:rotate(360deg)
    }
    `
    const StyledDiv = styled.div`
    background:${props=>props.bg||'yellow'};
    height:100px;
    width:100px;
    animation:${mykeyFrames} 1s infinite;
    `
    return (
      <div>App
        {/* <input type="text" /> */}
        <StyledDiv bg='blue'></StyledDiv>

      </div>
    )
  }
}
