import React, { Component } from 'react'
import styled from 'styled-components'
export default class App extends Component {
    render() {
        const StyledFooder = styled.footer`
    position:fixed;
    background:yellow;
    left:0;
    bottom:0;
    width:100%;
    height:50px;
    line-height:50px;
    ul{
        padding:0;
        margin:0;
        display: flex;
        li {
            list-style:none;
            flex:1;
            text-align:center;
            &:hover{
                color:red
            }
        }
    }
    `
        return (
            <StyledFooder>
                <ul>
                    <li>影视</li>
                    <li>上映</li>
                    <li>我的</li>
                </ul>
            </StyledFooder>
        )
    }
}
