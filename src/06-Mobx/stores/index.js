import CartStore from "./cart";
import ProductsStore from "./products";
// import './mobx-demo' //为了调试 手写的myMobx-demo 暂隐藏
import './myMobx-demo'
//1.初始化 mobx 容器仓库
class RootStore {
    constructor (){
        this.productsStore = new ProductsStore(this);
        this.cartStore = new CartStore(this);
    }
}

export default RootStore;