import React, { useContext, useReducer } from 'react'
let GlobalContext = React.createContext();
//reducer触发新的函数渲染
function reducer(prevstate, action) {
    let { type, value } = action;
    let newstate = { ...prevstate };
    switch (type) {
        case 'change-a':
            newstate.a = value;
            return newstate;
        case 'change-b':
            newstate.b = value;
            return newstate;
        default:
            return prevstate
    }
}
const initialState = {
    a: 'aaaa',
    b: 'bbbb'
}
export default function App() {
    let [state, dispatch] = useReducer(reducer, initialState)
    return (
        <GlobalContext.Provider value={
            {
                state, dispatch
            }
        }>
            <div>
                <Child1 />
                <Child2 />
                <Child3 />
            </div>
        </GlobalContext.Provider>
    )
}
function Child1() {
    let { dispatch } = useContext(GlobalContext)
    return (
        <div>
            <button
                onClick={() => {
                    dispatch({
                        type: 'change-a',
                        value: 'AAA'
                    })
                }}>changeA</button>
            <button onClick={() => {
                dispatch({
                    type: 'change-b',
                    value: 'BBB'
                })
            }}>changeB</button>
        </div>
    )
}
function Child2() {
    let { state } = useContext(GlobalContext)
    return (<div>child2-{state.a}</div>)
}

function Child3() {
    let { state } = useContext(GlobalContext)
    return (<div>child3-{state.b}</div>)
}

//状态放在组件之外管理