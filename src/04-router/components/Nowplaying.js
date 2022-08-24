import React, { useEffect,useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import request from "./../../request";
const {getFilms} = request;
//Nowplaying 是写在路由中的，它的父级是路由组件 非Films组件
export default function Nowplaying(props) {

  let [list,setList] = useState([])
  useEffect(()=>{
    getFilms(1).then(res=>{
      setList(res.data.films)
    })
  },[])
  const Uhistory = useHistory();// hooks写法
  const handleChangePage = (id)=>{
    // window.location.href = `#/detail/${id}`;
    //props.history.push(`/detail/${id}`)
    // 1.动态路由传参 
    Uhistory.push(`/detail/${id}`);
    // 2.query传参过去
    // Uhistory.push({pathname:'/detail',query:{id}})
    //3.state 传参  query  state 也可以改成abc之类的，但后面要接受也要用props.location.abc
    //Uhistory.push({pathname:'/detail',state:{id}})
  }
  return (
    <div>
      <ul>
      {
        list.map((item,index)=>{
            return <li key={item.filmId} onClick={()=>{handleChangePage(item.filmId)}}>
              {/* <NavLink to={'/detail/'+item.filmId}>{item.name}</NavLink> */}
               {item.name} 
              </li>
        })
      }
      </ul>
    </div>
  )
}

//动态路由复制连接给其它人不会报错 
//query传参会报错，拿不到ID

// console.dir(props) props是路由组件传过来的属性
// {
//   "history": {
//       "length": 44,
//       "action": "POP",
//       "location": {
//           "pathname": "/films/nowplaying",
//           "search": "",
//           "hash": ""
//       }
//   },
//   "location": {
//       "pathname": "/films/nowplaying",
//       "search": "",
//       "hash": ""
//   },
//   "match": {
//       "path": "/films/nowplaying",
//       "url": "/films/nowplaying",
//       "isExact": true,
//       "params": {}
//   }
// }