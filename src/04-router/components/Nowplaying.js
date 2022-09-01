import React, { useEffect, useState,useRef } from 'react'
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import request from "./../../request";
import { List ,Image,InfiniteScroll } from "antd-mobile"
const { getFilms,getFilms_more } = request;
//Nowplaying 是写在路由中的，它的父级是路由组件 非Films组件
export default function Nowplaying(props) {

  let [list, setList] = useState([])
  useEffect(() => {
    //loadMore会触发一次，这里就不用发请求了
    // getFilms(1).then(res => {
    //   setList(res.data.films)
    // })
  }, [])
  const Uhistory = useHistory();// hooks写法
  const handleChangePage = (id) => {
    // window.location.href = `#/detail/${id}`;
    //props.history.push(`/detail/${id}`)
    // 1.动态路由传参 
    Uhistory.push(`/detail/${id}`);
    // 2.query传参过去
    // Uhistory.push({pathname:'/detail',query:{id}})
    //3.state 传参  query  state 也可以改成abc之类的，但后面要接受也要用props.location.abc
    //Uhistory.push({pathname:'/detail',state:{id}})
  }
  let [hasMore,sethasMore] = useState(true);
  const count = useRef(0);
  const loadMore = ()=>{
    count.current++;
    sethasMore(false) // 避免频繁请求
    getFilms_more(count.current).then(res => {
      setList([...list,...res.data.films]);
      sethasMore(res.data.films.length>0)
    })
  }
  return (
    <>
      <List>
        {
          list.map((item, index) => {
            // 没用FilmItem组件前handleChangePage可以得到父传递的路由信息
            // return <li key={item.filmId} onClick={()=>{handleChangePage(item.filmId)}}>
            //  {item.name} 
            // </li>

            // {...props} 这里面包含了路由的相关属性和方法，方便子组件FilmItem 利用
            // WithFilmItem  时 {...props}就不需要传了
            // return <WithFilmItem key={item.filmId} {...item}  />
            //description ReactNode
            return (
              <List.Item key={item.filmId} onClick={()=>{
                props.history.push(`/detail/${item.filmId}`)
              }} prefix={
                <Image
                  src={item.poster}
                  style={{ borderRadius: 0 }}
                  fit='cover'
                  width={40}
                  height={80}
                />
              } arrow={false} description={(
                <>
                  {item.grade?<div>观众评分:{item.grade}</div>:<div style={{visibility:'hidden'}}>观众评分</div>}
                  <div>{item.category}</div>
                  <div>{item.nation}</div>
                </>
              )} clickable>
                {item.name}
              </List.Item>
            )
          })
        }
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}
function FilmItem(props) {
  let { name, filmId } = props;
  return (<li onClick={() => {
    props.history.push(`/detail/${filmId}`)
    //props.history 不存在，可以通过父级传递过来 否则就会报错
    //TypeError: Cannot read properties of undefined (reading 'push') 
  }}>{name}</li>)
}
const WithFilmItem = withRouter(FilmItem);
//动态路由复制连接给其它人不会报错
//query传参会报错，拿不到ID

// console.dir(props) props是路由组件传过来的属性
// {
//   "history": {"length": 44,"action": "POP","location": {"pathname": "/films/nowplaying", "search": "","hash": ""}},
//   "location": {"pathname": "/films/nowplaying","search": "", "hash": ""},
//   "match": {"path": "/films/nowplaying","url": "/films/nowplaying","isExact": true,"params": {}}
// }

//层层传递路由相关属性和方法的案例

// withRouter 高阶组件包装后就不需要一层层传递路由信息了