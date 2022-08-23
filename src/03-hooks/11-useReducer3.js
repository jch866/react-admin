import React, { Component, useContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import './css/index.css';
let getData = () => {
    let url = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=641705';
    return axios.get(url, {
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
            'X-Host': 'mall.film-ticket.film.list'
        }
    }).then(res => {
        return res.data;
    }).catch(error => {
        console.log(error)
    })
}
let initialState = {
    list: [],
    info: ''
}
function reducer(prevstate, action) {
    let { type, value } = action;
    let newstate = { ...prevstate };
    switch (type) {
        case 'setlist':
            newstate.list = value;
            return newstate
        case 'showdetail':
            newstate.info = value;
            return newstate
        default:
            return prevstate
    }
}
const GlobalContext = React.createContext();

function FilmItem(props) {
    let { dispatch } = useContext(GlobalContext);
    let { name, poster, grade, synopsis } = props;
    return (
        <div className='filmitem-wrap' onClick={() => {
            dispatch({
                type: 'showdetail',
                value: synopsis
            });
        }}>
            <img src={poster} alt={name} />
            <div className='filmitem-con'>
                <h5>{name}</h5>
                <span>观众评分 {grade || 0}</span>
            </div>
        </div>)
}
function FilmDetail() {
    let {state} = useContext(GlobalContext);
    return (<div className='filmitem-detail'>
        {state.info}
    </div>)
}
export default function App() {
    //利用useReducer hooks管理外部状态 
    let [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        getData().then(res => {
            dispatch({
                type: 'setlist',
                value: res.data.films
            })
        })
    }, [])
    return (
        <GlobalContext.Provider value={
            {
                state, dispatch
            }
        }>
            <div>
                {
                    state.list.map((item) => {
                        return <FilmItem key={item.filmId} {...item} />
                    })
                }
                <FilmDetail />
            </div>
        </GlobalContext.Provider>
    )
}


// 1.定义const GlobalContext = React.createContext();
// 2.App变成供应商 <GlobalContext.Provider value={object}>
// 3.子组件成消费者 <GlobalContext.Consumer>   里面是一个回调函数，同时把值传进来 (value)=>{}


//hooks 重构当前代码  useReducer hooks


