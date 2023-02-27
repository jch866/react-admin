// 手写mobx功能 手写方法
import { autorun, observable } from './../myMobx'
import "./demo"
//使用方法1.传对象形式
let o = observable({ name: 'hello', age: { num: 18 } })
autorun(() => {
    console.log(o.age.num) //o.age.num 取值  会调用get方法
})
o.age.num = 100
console.log(o)
//收集依赖 o.age.num = autorun

// let oarray = observable([])
// autorun(()=>{
//     console.log(oarray.length) 
// })
// oarray.push('123')

 

