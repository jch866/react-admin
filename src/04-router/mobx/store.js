import { observable,action, autorun,configure, runInAction } from 'mobx';
import request from './../../request';
let {getCinemaList} = request;
let obj = {
    isTabbarShow:true,
    list:[],
    cityname:''
}

let observObj = observable(obj);
// export default observObj

configure({ 
    enforceActions: 'always' 
}) //开启严格模式

class Store {
    @observable isTabbarShow=true
    @observable list=[]
    @action changeShow(){
        this.isTabbarShow = true
    }
    @action changeHide(){
        this.isTabbarShow = false
    }

    @action getList(){
        console.log('getlist')
        getCinemaList().then(res=>{
            runInAction(()=>{
                this.list = res.data.cinemas;
            })
            
        }).catch(e=>{
            console.log(e)
        })
    }
}
const  store = new Store();
export default store
//装饰器和异步mobx处理
//装饰器为什么不能用于函数： 因为存在函数提升， 而类没有。 
//装饰器是在编译时执行的，而不是运行时。 可以理解为装饰器就是一个编译时执行的对类进行修饰的函数。  
//异步处理放在runInAction中