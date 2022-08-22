//hooks 主要是函数式组件
import React, { useCallback, useState } from 'react'

export default function App() {
    let [text,setText] = useState('');
    let [list,setList] = useState([]); 
    const addHandle = useCallback(
        ()=>{  
            if(!text)return
            setList([...list,text]);
            setText('')
        },[text]
        // [] 有依赖时才会重新当前这个useCallback
    )
    const delHandle = useCallback(
        (idx)=>{
            let newList = [...list];
            newList.splice(idx,1)
            setList(newList); 
        },[list]
    )
  return (
    <div>
        <input onInput={(e)=>{
            setText(e.target.value)
        }} value={text} />
        <button onClick={()=>{
            addHandle();
        }}>添加事项</button>
        {
            list.map((item,index)=>{
                return (<li key={index}>{item} 
                <button onClick={()=>{
                    delHandle(index)
                }}>del</button>
                </li>)
            })
        }
        {!list.length && <h5>暂无事项</h5>}
    </div>
  )
}
// addHandle delHandle每次执行都会重新渲染当前函数组件，当前组件声明的方法都会被重新创建，消耗性能
// useCallback就可以解决这个问题  useCallback 可以缓存函数 只在和依赖有关的变量变更时才重新创建

//useCallback  useState都有一定的‘记忆’功能，都是由闭包原理来实现的
