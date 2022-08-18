/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        list:["1111","2222","3333"]
    }

    render() {

        // var newlist = this.state.list.map(item=><li>{item}</li>)
        return (
            <div>
                <ul>
                    {
                        this.state.list.map(item=>
                            <li key={item}>{item}</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
/*
 原生js - map
*/

var list= ["aa","bb","cc"]

var newlist = list.map(item=>`<li>${item}</li>`)

console.log(newlist.join(""))

