import React, { Component } from 'react'

export default class App extends Component {
    state = {
        name: 'libai',
        age: 22
    }
    //替代componentWillMount and  UNSAFE_componentWillReceiveProps 
    //getDerivedStateFromProps初始化和更新都触发
    static getDerivedStateFromProps(nextProps, nextState) {
        // console.log(this) //静态的方法this -> undefined
        console.log('getDerivedStateFromProps');
        console.log(nextState)
        // 不能在当前方法中写异步
        // return 出的对象和当前的state合并 
        return {
            name: nextState.name.toUpperCase()
        }
    }
    render() {
        return (
            <div>App
                <button onClick={() => {
                    this.setState({
                        name: 'dufu'
                    })
                }}>click</button>
                {this.state.name} - {this.state.age}
            </div>
        )
    }
}

//getDerivedStateFromProps 新生命周期
