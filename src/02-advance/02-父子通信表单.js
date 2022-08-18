import React, { Component } from 'react'

//完全受控 组件
class Field extends Component {
    render() {
        let { label, type } = this.props;
        return (
            <div>
                <label htmlFor="">{label}</label>
                <input type={type} onChange={(e) => {
                    this.props.onChangeEvent(e.target.value)
                }} value={this.props.value}/>
                {/* value={this.props.value} 这里不得写死否则达不到完全受控的目的 如value={'123'} P37*/}
            </div>
        )
    }
}

export default class App extends Component {
    state = {
        user: '123',
        pwd: ''
    }
    render() {
        return (
            <div>
                <h3>登录页</h3>
                <Field label='用户名' type='text' onChangeEvent={(val) => {
                    this.setState({
                        user: val
                    })
                }} value={this.state.user}/>
                <Field label='密码' type='password' onChangeEvent={(val) => {
                    this.setState({
                        pwd: val
                    })
                }} value={this.state.pwd}/>
                <button onClick={()=>{
                    let {user,pwd} = this.state;
                    console.log(user,pwd)
                }}>登录</button>
                <button onClick={()=>{
                    this.setState({
                        pwd: '',
                        user: ''
                    })
                }}>取消</button>
            </div>
        )
    }
}
//通过props调用父级方法
