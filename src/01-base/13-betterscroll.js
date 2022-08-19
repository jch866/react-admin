/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import BScroll from 'better-scroll'
export default class App extends Component {

    state = {

        list: [],
    }

    render() {

        return (
            <div>
                <button onClick={() => { this.getData1() }}> click</button>
                <div className="wrap" style={{height:'200px',background:'yellow',overflow:'hidden'}}>
                    <ul className='content' >
                        {
                            this.state.list.map((item) => {
                                return (<li key={item}>{item}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>)

    }
    getData() {
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17];
        this.setState({//同步变异步
            list
        },()=>{
            new BScroll(".wrap")
        })
        console.log(this.state.list);
        console.log(document.querySelectorAll('li'));
        // new BScroll(".wrap")  list为空 li节点也为空
        //  componentDidMount 中 DOM元素上树后可以使用 new BScroll
        //  componentDidUpdate 中 DOM元素上树后可以使用 new BScroll 但会执行多次
    }
    getData1() {
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17];
        setTimeout(()=>{//异步变同步
            this.setState({
                list
            })
            console.log(this.state.list);
            console.log(document.querySelectorAll('li'));
            new BScroll(".wrap") // list不为空 li节点也不为空 
        },0)
        
    }
}


