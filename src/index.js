/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
// console.log("hello world kerwin")
import React from 'react'
import ReactDOM from 'react-dom'
import App from './06-Mobx/App';
import RootStore from './06-Mobx/stores';
import { Provider } from 'mobx-react';
// import App from "./04-router/App"
import { configure } from "mobx"
configure({enforceActions: true})
ReactDOM.render(
    <Provider {...new RootStore()}>
            <App/>
    </Provider>
    ,document.getElementById("root"))



/*
 jsx == js+xml
*/


