//库方法
import { autorun,observable,makeObservable } from "mobx";

class Person {
    constructor() {
        //mobx在mobx6之后，刷新界面需要设置makeObservable(this);这个函数，这样当数据刷新后，组件的界面才能刷新。
        //cartProducts 计算属性不加makeObservable这个不出效果 困扰许久
        makeObservable(this);
    }
    @observable name = 'libai'
    @observable age = 10;
    @computed getAll(){
        return `${this.name}-${this.age}`
    }
}

let p = new Person();

autorun(() => {
    console.log(p.name)
})

p.name = 'dufu'


