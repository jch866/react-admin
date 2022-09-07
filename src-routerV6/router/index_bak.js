import React, { Children } from 'react'
import { Routes , Route, Navigate} from 'react-router-dom'
import Film from '../view/Film'
import Center from '../view/Center'
// import Cinema from '../view/Cinema'
import Redirect from '../components/Redirect'
import Notfound from '../view/Notfound'
import Search from '../view/Search'
import Comingsoon from '../view/Film/Comingsoon'
import Nowplaying from '../view/Film/Nowplaying'
import Detail from '../view/Detail'
import Login from '../view/Login'

export default function index() {
  return (
    <Routes>
        {/* <Route path='/' element={<Film/>}></Route> */}
        {/* <Route index element={<Film/>}></Route> */}
        <Route path='/film' element={<Film/>}>
                {/*   path='/film/Nowplaying' 绝对路径 也可  path='' 换成 index  也可*/}
                 {/* <Route index element={<Comingsoon/>}></Route> */}
                 <Route path='' element={<Redirect to='/film/Nowplaying'/>}></Route>
                {/* 嵌套路由  相对路径 配合outlet使用*/}
                <Route path='Comingsoon' element={<Comingsoon/>}></Route>
                <Route path='Nowplaying' element={<Nowplaying/>}></Route>
        </Route>
        {/* <Route path='/cinema' element={<Cinema/>}></Route> */}
        {/* 懒加载 */}
        <Route path='/cinema' element={lazyLoad("Cinema")}></Route>
        <Route path='/cinema/search' element={<Search/>}></Route>
        {/*  element={isAuth()?<Center/>:<Redirect to='/login'/> 这种写法只会渲染一次，不会自动更新true or false */}
        {/* <Route path='/center' element={isAuth()?<Center/>:<Redirect to='/login'/>}></Route> */}
        <Route path='/center' element={<AuthComponent><Center></Center></AuthComponent>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        {/* <Route path='/detail' element={<Detail/>}></Route> */}
        {/* 动态路由传参 */}
        <Route path='/detail/:id' element={<Detail/>}></Route>
        {/* <Route path='/' element={<Navigate to='/film'/>}></Route> */}
        <Route path='/' element={<Redirect to='/film'/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
    </Routes>
  )
}
//路由拦截组件封装
function AuthComponent(props){
    const islogin = localStorage.getItem('token');
    return islogin? props.children: <Redirect to='/login'/>
}
// function isAuth(){
//     return localStorage.getItem('token')
// }
// 1. Navigate重定向
// 2.自定义 Redirect  重定向
//路由懒加载
const lazyLoad = (path)=>{
    const Comp = React.lazy(()=>{
        return import(`../view/${path}`)
    })
    return (
        <React.Suspense fallback={<>loading…………</>}>
            <Comp/>
        </React.Suspense>
    )
}