import React, { Component } from 'react'
import Products from './components/Products'
import Cart from './components/Cart'
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
