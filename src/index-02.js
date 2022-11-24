/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
// console.log("hello world kerwin")
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import  storeObj from "./04-router/redux/store"
import App from './04-router/App'
import { PersistGate } from 'redux-persist/integration/react'
import './index2.less'
import './index1.scss'
const {store,persistor} = storeObj;
 
ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
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


