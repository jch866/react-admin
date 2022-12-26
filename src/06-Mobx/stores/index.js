import CartStore from "./cart";
import ProductsStore from "./products";

//1.初始化 mobx 容器仓库
class RootStore {
    constructor (){
        this.productsStore = new ProductsStore(this);
        this.cartStore = new CartStore(this);
    }
}

export default RootStore;