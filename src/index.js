/*
 * saga练习
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './10-saga/store'
import App from './App_saga'
 
ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>

            <App/>

    </Provider>

    ,document.getElementById("root"))




