import React, { useState } from 'react'

export default function App() {
  let [count,setCount] = useState(0);
  //useState 记住了第一次的状态  count 可持续增加  mycount一直是 0 ；
  let mycount = 0 ;
  return (
    <div>
      <button onClick={()=>{
        setCount(count+1);
        // setCount(count++); //效果不一样
        mycount++;
        console.log('add click')
      }}>add click</button>
      {mycount} -- {count}
    </div>
  )
}
//useState 可以让状态记忆下来   useCallback可以让函数记忆下来