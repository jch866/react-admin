import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import request from '../../request'
import FilmItem from './FilmItem';
const { getFilms } = request;

export default function Nowplaying(props) {
    const navigate = useNavigate();//hooks 跳转路由
    let [list, setList] = useState([])
    useEffect(() => {
        getFilms(1).then(res => {
            setList(res.data.films)
        })
    }, [])
    let before =  (
        <>
            {
                list.map((item) => <li key={item.filmId} onClick={()=>{
                    // query传参 detail?id=xx
                    // navigate(`/detail?id=${item.filmId}`) 
                    // 路由传参  detail/id
                    navigate(`/detail/${item.filmId}`)
                }}>{item.name}</li>)
            }
        </>
    )

    let after = (
        <>
            {
                list.map((item) =><FilmItem key={item.filmId} {...item}/>  )
            }
        </>
    )

    return after;
}
