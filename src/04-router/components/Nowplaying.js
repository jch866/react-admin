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
    Uhistory.push(`/detail/${id}`)
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


// console.dir(props)
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