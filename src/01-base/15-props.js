/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import Navbar from './15-props-navbar';
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
                <Navbar title='首页' leftshow={false} bool={false}/>
                <Navbar title='列表'  />
                <Navbar title='购物车' />
                {/* <Navbar title='列表' leftshow={true}/>*/}
                <Navbar a ='100' {...propsobj} /> 
            </div>
        )
    }

   
}
