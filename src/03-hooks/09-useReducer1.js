import React, { useReducer } from 'react'
//组件内无状态，把相应的数据放在外面；
const initState= {
    count:0
}
const reducer = (prevState,action)=>{
    let newstate = {...prevState}
    switch(action.type){
        case 'minus':
            newstate.count--;
            return newstate;
        case 'add':
            newstate.count++;
            return newstate;
        default:
            return prevState
    }
}
export default function App() {
    let [state,dispatch] = useReducer(reducer,initState)
  return (
    <div>
        <button
        onClick={()=>{
            dispatch({
                type:'minus'
            })
        }}> minus - </button>
        {state.count}
        <button onClick={()=>{
            dispatch({
                type:'add'
            })
        }}> add + </button>

    </div>
  )
}
