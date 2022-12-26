
import { observable,action,makeAutoObservable } from "mobx";

import * as shop from './../api/shop'
class ProductsStore {
    @observable all = [];
    @observable foo = 'bar';
    // 方便访问全局的store
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this)
    }
    @action.bound getAllProducts(){
        shop.getAllProducts(products=>{
            this.setAll(products)
        })
    }
    @action.bound setAll(products){
        //action.bound保证'this' 永远都是正确的
        //注意: action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定
        this.all = products;
    }
    @action.bound decrementInventory(product){
        const prod = this.all.find(item=>item.id===product.id);
        prod.inventory--;
    }
}

export default ProductsStore;