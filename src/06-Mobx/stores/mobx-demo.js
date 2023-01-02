import { observable, autorun, makeObservable, computed, configure, runInAction, action, when, reaction } from "mobx";
// https://zhuanlan.zhihu.com/p/77170757
configure({
    // enforceActions:'always',
    enforceActions: 'observed' // todo 针对 直接修改store.num = 100; 好像没生效
})

class StoreDemo {
    @observable num = 0;
    @observable count = 10;
    @observable price = 5;
    @observable foo = 'foo';
    @computed get total() {
        return this.price * this.count;
    }
    @action.bound modify() {
        this.num = 66;
    }
    //action中异步修改数据方法 
    @action.bound asyncChange() {
        setTimeout(() => {
            // this.count = 500; // 严格模式下可能会报错 待验证 不推荐使用这种方式
            // 1.重新定个action,用action来操作要修改的数据  业务比较复杂，推荐第一种
            this.changeCount()
            // 2.直接调用action 函数 立即执行
            action('changeFoo', () => {
                this.foo = 'hello'
            })() // 这里加() 立即调用
            // 3. runInAction 
            runInAction(() => {
                this.foo = 'world'
            })
        }, 500)
    }
    @action.bound changeCount() {
        this.count = 500;
    }
    constructor() {
        //mobx 6版本加了 makeObservable  autorun才有效果
        makeObservable(this);
    }
}
//@observable修饰的值才能被autorun监控到
const store = new StoreDemo();
autorun(() => {
    console.log('StoreDemo autorun num: ', store.num)
})
//runInAction 在不想定义action的时候，使用 自动调用
runInAction(() => {
    store.num = 88;
})
autorun(() => {
    console.log('StoreDemo autorun foo: ', store.foo)
})
store.modify();
store.num = 100;
console.log('computed total: ', store.total)

store.asyncChange();
//当count>100时，只执行一次自定义逻辑 如果刚开始就满足大于100，就会立即执行一次
when(() => {
    return store.count > 100
}, () => {
    console.log('when => store.count', store.count)
})
//reaction只有当被监测的数据发生改变时才会执行；可多次执行
reaction(() => {
    //执行一些业务逻辑，返回数据给下一个函数使用
    return store.count
}, (arg, prev,reaction) => {
    console.log('reaction => data',arg);  // 改变后 count
    console.log('reaction => data',prev); // 改变前 count
    //手动停止监听，实现when的功能
    reaction.dispose();
})