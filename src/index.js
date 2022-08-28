/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
// console.log("hello world kerwin")
import React from 'react'
import ReactDOM from 'react-dom'
// import App from './04-router/App'
import { Provider } from 'react-redux'
import store from "./04-router/redux/store"
import App from './04-router/App'


ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
    // </React.StrictMode>
    ,document.getElementById("root"))


// ReactDOM.render(React.createElement("div",{
//     id:"aaa",
//     class:"bbb"
// },"111111111"),document.getElementById("root"))

/*
 jsx == js+xml
*/


