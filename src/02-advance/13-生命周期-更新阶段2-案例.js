import React, { Component } from 'react';
import './tabs受控组件通信/02-maizou.css';
class Box extends Component {
     //scu
    shouldComponentUpdate(nextProps, nextState) {
        //性能优化
        if (this.props.current === this.props.index||nextProps.current === nextProps.index) {  
            return true;
        }
        return false
    }
    render() {
        console.log('render') //shouldComponentUpdate不控制的话render会出现很多次
        let s = {
            width: '30px',
            height: "30px"
        }
        let redborder = {
            border: '2px solid red',
        }
        let blackborder = {
            border: '1px solid black',
        }
        return (
            <div style={this.props.current === this.props.index ? { ...s, ...redborder } : { ...s, ...blackborder }}>
                {this.props.index}
            </div>
        )
    }
}
export default class App extends Component {
    state = {
        list: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
        current: 0
    }
    render() {

        return (
            <div>
                <input type="number" onInput={(e) => {
                    this.setState({
                        current: Number(e.target.value)
                    })
                }} value={this.state.current}/>
                <button onClick={()=>{
                    this.setState({
                        current:''
                    })
                }}>clear</button>
                <div className='boxwrap'>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <Box key={index} index={index} current={this.state.current} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

