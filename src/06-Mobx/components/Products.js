import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
@inject('productsStore', 'cartStore') // RootStore中this上的productsStore;映射到props上
@observer //@observer要放在类的最里层 componentDidMount 触发后才能重新render
class Products extends Component {
  componentDidMount = () => {
    // console.log('componentDidMount')
    //获取数据;
    //直接这样写偶尔不能重新触发render函数，已解决
    this.props.productsStore.getAllProducts();
  }

  render() {
    // console.log('render')
    const { cartStore } = this.props;
    // console.log(cartStore)
    const { all } = this.props.productsStore;
    return (
      <>
        <div>Products</div>
        <ul>
          {
            all.length > 0 ? all.map((item, index) => <li key={item.id}>
              <b>{item.title}</b> --- {item.price} * {item.inventory}
              <br />
              <button
                disabled={!item.inventory}
                onClick={() => { cartStore.addToCart(item) }}>
                {item.inventory ? 'add to cart' : "Sold Out"}
              </button>
            </li>)
              : <span>Have't any products!</span>
          }
        </ul>
      </>
    )
  }
}
//装饰器就是个语法糖……实际上用装饰器和 observer(component) 是一样的效果
const Demo = observer(
  class Demo extends Component {
    render() {
      return (
        <button onClick={() => console.log('onclick')}>Demo click</button>
      );
    }
  }
);
export default Products 