import React, { Component } from 'react'
 class Child extends Component {
    state = {
        title:''
    }
    render() {
        return (
          <div>
            {this.state.title} - Child
          </div>
        )
      }
    UNSAFE_componentWillReceiveProps(nextProps){
        //最先得到父级组件传来的属性
        console.log('UNSAFE_componentWillReceiveProps',this.props.text,nextProps);
        //把传来的属性转化成子组件自己的状态
        this.setState({
            title:nextProps.text
        })
    }
 }
export default class App extends Component {
    state = {
         text:'11111'
    }
  render() {
    let {text} = this.state;
    return (
      <div>
        {text}
        <button
        onClick={()=>{
            this.setState({
                text:'22222'
            })
        }}>click</button>
        <Child text={text}/>
      </div>
    )
  }
}
//<Child text={text}/> 不加属性也会触发 componentWillReceiveProps 钩子