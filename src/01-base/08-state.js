/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'

export default class App extends Component {
    a = 1
    // state = {
    //     mytext:"收藏",
    //     myShow:true
    // } 
    constructor(){
        super();
        this.state = {
            mytext:"收藏",
            myShow:true
        }
    }
    render() {
        // var text="收藏"

        return (
            <div>
                <h1>欢迎来到react开发</h1>

                <button onClick={()=>{
                    this.changeHandle();
                }}>{this.state.myShow?'收藏':"取消收藏"}</button>
            </div>
        )
    }

    changeHandle(){
        //this.state.mytext = "取消" //不用直接修改状态
        
         this.setState({
            // mytext:"取消收藏"
            myShow:!this.state.myShow
        }) // 间接修改状态

        if(this.state.myShow){
            console.log("收藏的逻辑")
        }else{
            console.log("取消收藏的逻辑")
        }
    }
}
