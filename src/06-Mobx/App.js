import React, { Component } from 'react'
import Products from './components/Products'
import Cart from './components/Cart'
import './es6/decorator'
import './es6/decorator-mixin'
export default class App extends Component {
    render() {
        return (
            <>
                <h3>Shopping Cart Example</h3>
                <hr/>
                <Products />
                <hr/>
                <Cart />
            </>
        )
    }
}
