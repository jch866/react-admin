import React, { Component } from 'react'

//完全受控 组件
class Field extends Component {
    state = {
        value:''
    }
    clear(){
        this.setState({
            value:''
        })
    }
    setValue(v){
        this.setState({
            value:v
        })
    }
    render() {
        let { label, type } = this.props;
        return (
            <div>
                <label htmlFor="">{label}</label>
                <input type={type} onChange={(e) => {
                   this.setState({
                    value:e.target.value
                   })
                }} value={this.state.value}/>
               
            </div>
        )
    }
}

export default class App extends Component {
    state = {
        user: '123',
        pwd: ''
    }
    username  = React.createRef();
    password  = React.createRef();
    render() {
        return (
            <div>
                <h3>登录页</h3>
                <Field label='用户名' type='text' ref={this.username}/>
                <Field label='密码' type='password' ref={this.password}/>
                <button onClick={()=>{
                    console.log(this.username.current.state)
                }}>登录</button>
                <button onClick={()=>{
                    // this.setState({
                    //     pwd: '',
                    //     user: ''
                    // })
                    this.username.current.clear();
                    this.password.current.clear();
                    // this.password.current.setValue();
                }}>取消</button>
            </div>
        )
    }
}
//通过ref调用子组件方法
