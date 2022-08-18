
import React, { Component } from 'react'


//利用插槽来改版
class Navbar extends Component {
    render() {
        return (
            <div style={{background:'red'}}>
                navbar
                {this.props.children}  
            </div>
        )
    }
  
}
class Sidebar extends Component {
    render() {
        return (
            <div style={{background:'yellow',width:'200px',height:'200px'}}>
                <ul>
                    <li>1111111</li>
                    <li>1111111</li>
                    <li>1111111</li>
                </ul>
            </div>
        )
    }
}
export default class App extends Component {
    state={
        isShow:true
    }
     
    render() {
        
        return (
            <div>
                <Navbar>
                <button onClick={()=>{
                   this.setState({
                    isShow:!this.state.isShow
                   })
                }}>hide</button>
                </Navbar>
               {
                 this.state.isShow && <Sidebar />
               } 
            </div>
        )
    }
}
