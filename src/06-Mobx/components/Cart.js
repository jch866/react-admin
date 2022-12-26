import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

@inject('cartStore')
@observer
class Cart extends Component {
  render() {
    console.log('cart render')
    const { cartStore } = this.props;
    console.log(cartStore.cartProducts)
    return (
      <>
        <div>Cart</div>
        <ul>
          {
            cartStore.cartProducts.length > 0 ? cartStore.cartProducts.map((item, index) => <li key={item.id}>
              <b>{item.title}</b> --- {item.price} * {item.quantity}
            </li>)
              : <span>Have't any products!</span>
          }
        </ul>
        <div>total:{cartStore.totalPrice}</div>
        <p>
          <button disabled={!cartStore.items.length}
            onClick={() => {
              cartStore.checkout(cartStore.items)
            }}>CheckOut</button>
        </p>
        {cartStore.checkoutStatus && `Checkout ${cartStore.checkoutStatus}`}
      </>
    )
  }
}
export default Cart