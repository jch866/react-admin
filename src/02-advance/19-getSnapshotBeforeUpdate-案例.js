import React, { Component } from 'react'
import BScroll from 'better-scroll';
import "./tabs受控组件通信/02-maizou.css"
export default class App extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
  wraperRef = React.createRef();
  componentDidMount() {
    new BScroll(".wrap")
  }
  // componentWillUpdate(){
  //   console.log('componentWillUpdate')
  // }
  componentDidUpdate(prevProps,prevState,value){
    console.log('componentDidUpdate',value);
    console.log(`getSnapshotBeforeUpdate传过来的值:${value}`);
    // this.wraperRef.current.scrollHeight  更新后最新的scrollHeight,  value是以前的scrollHeight
    this.wraperRef.current.scrollTop += this.wraperRef.current.scrollHeight - value;
  }
  getSnapshotBeforeUpdate(){
    console.log(this.wraperRef.current) //dom
    // A snapshot value (or null) must be returned. 
    console.log('getSnapshotBeforeUpdate')
    return this.wraperRef.current.scrollHeight;
  }
  render() {
    let addEmail = [11, 12, 13, 14, 15, 16];
    return (
      <div>App
        <button onClick={() => {
          this.setState({
            list: [...addEmail, ...this.state.list]
          })
        }}>来了新邮件</button>
        <div className="wrap" ref = {this.wraperRef} style={{ height: '200px', background: 'yellow', overflow: 'auto' }}>
          <ul>

            {
              this.state.list.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul></div>
      </div>
    )
  }
}
//App uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:
//componentWillUpdate
//getSnapshotBeforeUpdate   componentWillUpdate 不能共存
//Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. 

//getSnapshotBeforeUpdate记录update之前的某种状态值