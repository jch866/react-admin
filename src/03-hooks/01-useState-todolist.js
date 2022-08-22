//hooks 主要是函数式组件
import React, { useState } from 'react'

export default function App() {
    let [text,setText] = useState('');
    let [list,setList] = useState([]); 
    const addHandle = ()=>{
        if(!text)return
        setList([...list,text]);
        setText('')
    }
    const delHandle = (idx)=>{
        let newList = [...list];
        newList.splice(idx,1)
        setList(newList); 
    }
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
