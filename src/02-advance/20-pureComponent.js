import React, { Component, PureComponent } from 'react'

export default class App extends PureComponent {
    state = {
        name: 'libai'
    }
    componentDidMount() {
        //数据请求
        console.log('componentDidMount')
    }
    UNSAFE_componentWillUpdate() {
        console.log('UNSAFE_componentWillUpdate')
    }
    componentDidUpdate(prevProps, prevState) {
        //更新后，获取DOM节点
        console.log('componentDidUpdate')
    }
    render() {
        console.log('render')
        return (
            <div>
                <button onClick={() => { 
                    this.setState({
                        name: 'LIBAI'
                    })
                }}>click</button>
                <span id="myname">{this.state.name}</span>
            </div>
        )
    }
}

//PureComponent
// PureComponent会帮你 比较新props 跟 旧的props， 新的state和老的state（值相等,或者
// 对象含有相同的属性、且属性值相等 ），决定shouldcomponentUpdate 返回true 或者
// false， 从而决定要不要呼叫 render function。

//onClick 在Component中点一次更新一次，PureComponent却可以节省多余的性能开销