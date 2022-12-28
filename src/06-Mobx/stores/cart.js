import { action, computed, observable, makeObservable, autorun } from "mobx";
import * as shop from './../api/shop'
class CartStore {
    //items数据结构{id,quantity：购物车商品数量 }
    @observable items = [];
    @observable foo = 'baz';
    @observable checkoutStatus = null;
    @action.bound addToCart(product) {
        // console.log('product', product);
        //判断购物车数据中是否有该商品
        const prod = this.items.find(item => item.id === product.id);
        //有，该商品数量 加 1,没有,添加该商品到购物车中
        if (prod) {
            prod.quantity++;
        } else {
            this.items.push({ id: product.id, quantity: 1 })
        }
        // console.log(this.items)
        //加购物车后，商品库存要减去1；
        this.rootStore.productsStore.decrementInventory(product)
    }
    @action.bound checkout(products) {
        console.log('checkout =>', products);
        // 备份购物车数据  
        const savedProducts = [...products];
        // 清空结算状态
        this.setCheckoutStatus(null)
        // 清空购物车
        this.setItems([])
        // 发起结算请求 
        //  成功 将结算状态设置为successful
        //  失败 将结算状态设置为 failed  还原购物车数据
        shop.buyProducts(
            products,
            () => {
                this.setCheckoutStatus('successful')
            }, () => {
                this.setCheckoutStatus('failed');
                this.setItems(savedProducts)
            })
    }

    @action.bound setCheckoutStatus(status) {
        this.checkoutStatus = status;
    }
    @action.bound setItems(items) {
        this.items = items;
    }
    @computed get cartProducts() {
        // console.log('computed')
        const { productsStore } = this.rootStore;
        return this.items.map(citem => {
            const prod = productsStore.all.find(pitem => pitem.id === citem.id);
            return {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                quantity: citem.quantity
            }
        })
    }

    @computed get totalPrice() {
        return this.cartProducts.reduce((total, prod) => {
            return total + prod.price * prod.quantity;
        }, 0)
    }
    constructor(rootStore) {
        this.rootStore = rootStore;
        //mobx在mobx6之后，刷新界面需要设置makeObservable(this);这个函数，这样当数据刷新后，组件的界面才能刷新。
        //cartProducts 计算属性不加makeObservable这个不出效果 困扰许久
        makeObservable(this);
    }
}
//这里的autorun可以在foo值更新时重新调用，为什么StoreDemo 不行？
//因为 StoreDemo 没加 makeObservable
const cart = new CartStore();
autorun(()=>{
    console.log('cart: autorun ', cart.foo)
})
cart.foo = 'hello';
export default CartStore;