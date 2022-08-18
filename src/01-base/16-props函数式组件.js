/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import Navbar from './15-props-navbar';
import Sidebar from './16-props函数式组件-sidebar';
export default class App extends Component {
  
   
    constructor(){
        super();
        this.state = {
           
        }
    }
    render() {
        let propsobj = {
            title:'测试',
            leftshow : true
        }
        return (
            <div>
                {/* 类组件 */}
                <Navbar title='导航'></Navbar>
                {/* 函数式组件 */}
                <Sidebar bg='red' position="right"></Sidebar>
            </div>
        )
    }

   
}
