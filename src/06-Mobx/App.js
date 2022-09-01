import React from 'react'
import { observable, autorun } from 'mobx';
//普通类型监听
let observ_Number = observable.box(10);
let observ_Name = observable.box('tom');
autorun(()=>{
    //初始都会执行一次,之后每次依赖更新(observ_Number，observ_Name)改变都会执行；
    //console.log('observ_Number',observ_Number.get())
    //console.log('observ_Name',observ_Name.get())
})

setTimeout(()=>{
    observ_Number.set(20)
    observ_Name.set('xiaoming')
},1000)

//对象类型监听 
//第一种map写法
// let myobj = observable.map({
//     name:'tom',
//     age:20
// })
// autorun(()=>{
//      console.log('myobj.name',myobj.get('name'))
// })
// setTimeout(()=>{
//     myobj.set('name','xiaoming')
//     myobj.set('age',30)
// },1000)

//第二种不要map写法 简写模式
let myobj = observable({
    name:'tom',
    age:20
})
autorun(()=>{
     console.log('myobj.name',myobj.name)
     console.log('myobj.age',myobj.age)
})
setTimeout(()=>{
    myobj.name='xiaoming'
    myobj.age = 25
},1000)
export default function App() {

  return (
    <div>App</div>
  )
}
