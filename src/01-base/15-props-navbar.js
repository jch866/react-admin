/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import props from 'prop-types';
console.log(props)//属性验证
export default class Navbar extends Component {
    constructor(){
        super();
        this.state = {
           
        }
    }
    static propTypes = {
        title:props.string,
        leftshow:props.bool
    }
    static defaultProps = {
        leftshow:true
    }
    render() {
        let {leftshow,title,bool} = this.props;
        console.log(leftshow,title,bool)//布尔值要用{}包起来
        return (
            <div>
               {leftshow&&<button>返回</button>}
               navbar-{title}
               <button>home</button>
            </div>
        )
    }
}
//类属性 属性验证
// Navbar.propTypes = {
//     title:props.string,
//     leftshow:props.bool
// }
