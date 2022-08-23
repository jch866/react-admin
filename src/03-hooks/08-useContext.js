import React, { Component, useContext, useEffect, useState } from 'react'
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
const GlobalContext = React.createContext();

function FilmItem(props) {
    let value = useContext(GlobalContext);
    //console.log(value);
    let { name, poster, grade, synopsis } = props;
    return (
        <div className='filmitem-wrap' onClick={() => {
            // value.info = synopsis; 这样直接改不会引起视图更新
            value.changeInfo(synopsis);
        }}>
            <img src={poster} alt={name} />
            <div className='filmitem-con'>
                <h5>{name}</h5>
                <span>观众评分 {grade || 0}</span>
            </div>
        </div>)
    // {synopsis} 详情
}
function FilmDetail() {
    // let [info, setInfo] = useState('');
    let value = useContext(GlobalContext);
    return (<div className='filmitem-detail'>
        {value.info}
    </div>)
}
export default function App() {
    let [info, setInfo] = useState('');
    let [list, setList] = useState([]);
    useEffect(() => {
        getData().then(res => {
            setList(res.data.films)
        })
    }, [])
    return (
        <GlobalContext.Provider value={
            {
                info,
                changeInfo: (value) => {//更新视图
                    setInfo(value)
                }
            }
        }>
            <div>
                {
                    list.map((item) => {
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


//hooks 重构当前代码
//changeInfo更新会导致所有FilmItem重新渲染


