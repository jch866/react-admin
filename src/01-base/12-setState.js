/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
 
export default class App extends Component {

    state = {
         
        count: 1,
    }
    
    render() {

        return (
            <div>
                <button onClick={() => { this.handleClick() }}>state异步测试</button>
                <button onClick={() => { this.handleClick2() }}>state异步测试</button>
            </div>)

    }

   
    // setState在一个同步的逻辑中 是个异步更新状态 更新真实DOM
    // setState在一个异步的逻辑中 是个同步更新状态 同步更新真实DOM(axios也是一个异步环境)
    handleClick() { //同步
        this.setState({
            count: this.state.count + 1
        },()=>{
            console.log('更新完成')
        })
        console.log(this.state.count)
        this.setState({
            count: this.state.count + 1
        })
        console.log(this.state.count)
        this.setState({
            count: this.state.count + 1
        })
        console.log(this.state.count)
    }
    handleClick2() { //异步
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            })
            console.log(this.state.count)
            this.setState({
                count: this.state.count + 1
            })
            console.log(this.state.count)
            this.setState({
                count: this.state.count + 1
            })
            console.log(this.state.count)
        }, 0);

    }
}


