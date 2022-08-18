
import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <div style={{background:'red'}}>
                navbar
                <button onClick={()=>{
                    this.toggle();
                    // this.props.event(); 也可以直接调用
                }}>hide</button>
            </div>
        )
    }
    toggle(){
        this.props.event();
    }
}
class Sidebar extends Component {
    render() {
        return (
            <div style={{background:'yellow',width:'200px',height:'200px'}}>
                <ul>
                    <li>1111111</li>
                    <li>1111111</li>
                    <li>1111111</li>
                </ul>
            </div>
        )
    }
}
export default class App extends Component {
    state={
        isShow:true
    }
    showHandle=()=>{
        //注意arrow function 中的 this
        this.setState({
            isShow:!this.state.isShow
        })
    }
    render() {
        //子组件 中的回调函数   父子通信
        return (
            <div>
                <Navbar event={this.showHandle}/>
               {
                this.state.isShow && <Sidebar />
               } 
            </div>
        )
    }
}
