import React, { Component, useEffect } from 'react'

export default class App extends Component {
    state = {
        isShow: true
    }
    render() {
        let { isShow } = this.state;
        return (
            <div>App
                <button onClick={() => {
                    this.setState({
                        isShow: !isShow
                    })
                }}>toggle</button>
                {/* {isShow?<Child/>:''} */}
                {isShow && <Child />}
            </div>
        )
    }
}
function Child(props) {
    useEffect(() => {
        window.onresize = () => {
            console.log('resize')
        }
        let timer = setInterval(() => {
            console.log('setInterval')
        }, 1000)

        return ()=>{
            console.log('组件销毁');
            window.onresize = null;
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {})//可多次调用
    return (
        <div>Child</div>
    )
}
// useLayoutEffect  useEffect 区别
// 简单来说就是调用时机不同， useLayoutEffect 和原来 componentDidMount & componentDidUpdate 一致，在
// react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而 useEffect 是会在整个页面渲染完才会调用的
// 代码。
// 在实际使用时如果想避免页面抖动（在 useEffect 里修改DOM很有可能出现）的话，可以把需要操作DOM的代码
// 放在 useLayoutEffect 里。在这里做点dom操作，这些dom修改会和 react 做出的更改一起被一次性渲染到屏幕
// 上，只有一次回流、重绘的代价。
 