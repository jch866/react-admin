import Reaction from './reaction'
//深度代理 
function deepProxy(val, handler) {
    if (typeof val !== 'object') return val;
    //{name:'hello',age:{num:18}} 嵌套对象 
    for (let key in val) { //1.先遍历内部  从后往前依次代理 后序
        val[key] = deepProxy(val[key], handler)
    }
    return new Proxy(val, handler()) // 2.再代理最外层
}
//创建代理
function createObservable(val) {
    let handler = () => {
        let reaction = new Reaction();
        return {
            get(target, key) {
                reaction.collect();
                return Reflect.get(target, key)
            },
            set(target, key, value) {
                // 针对数组的情况
                if(key==='length') return true;
                //1.设置成功之后
                let res =  Reflect.set(target, key, value);
                // 2. 再次调用之前传进去的方法  handler
                reaction.run()
                return res;
            }
        }
    }
    return deepProxy(val, handler)
}

function oberserable(target) {
    return createObservable(target)
}

export default oberserable