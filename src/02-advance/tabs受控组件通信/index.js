/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import './02-maizou.css';
import Center from './Center';
import Film from './Film';
import Cinema from './Cinema';
import Tabbar from './Tabbar';
import Navbar from './Navbar';
export default class App extends Component {
    //视频中 讲的非受控，是tabbar组件自己也有current属性，所以不是完全控制
    //受控组件是指 子组件中的行为完全是依赖父级组件的传递来展现的  
    state = {
        current: 0,
        list: [{
            id: 1,
            text: '电影'
        }, {
            id: 2,
            text: '影院'
        }, {
            id: 3,
            text: '个人中心'
        }]
    }
    which() {
        let { current } = this.state;
        switch (current) {
            case 0:
                return <Film></Film>;
            case 1:
                return <Cinema></Cinema>;
            case 2:
                return <Center></Center>;
            default:
                return null;
        }

    }
    render() {
        let { list, current } = this.state;

        return (
            <div>
                <Navbar navbarEvent={() => {
                    this.setState({
                        current: 2
                    })
                }} />
                {/* {current === 0 && <Film></Film>}
                {current === 1 && <Cinema></Cinema>}
                {current === 2 && <Center></Center>} */}
                {
                    this.which()
                }
                <Tabbar list = {list} p_current={current} myevent={(index) => {
                    this.setState({
                        current: index
                    })
                }} />
            </div>)

    }



}


