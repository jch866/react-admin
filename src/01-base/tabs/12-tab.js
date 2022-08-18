/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import './02-maizou.css';
import Center from './Center';
import Film from './Film';
import Cinema from './Cinema';
export default class App extends Component {

    state = {
        list: [{
            id: 1,
            text: '电影'
        }, {
            id: 2,
            text: '影院'
        }, {
            id: 3,
            text: '个人中心'
        }],
        current: 1,
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
               
                {/* {current === 0 && <Film></Film>}
                {current === 1 && <Cinema></Cinema>}
                {current === 2 && <Center></Center>} */}
                {
                    this.which()
                }
                <ul className='bottom-tab'>
                    {
                        list.map((item, index) => {
                            return (<li key={item.id} className={current === index ? 'active' : ''}
                                onClick={() => { this.tabChange(index) }}>{item.text}</li>)
                        })
                    }
                </ul>
            </div>)

    }

    tabChange(index) {
        this.setState({
            current: index
        })
    }
    
}


