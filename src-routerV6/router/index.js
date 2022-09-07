import React, { Children } from 'react'
import { Routes , Route, Navigate,useRoutes} from 'react-router-dom'
 import Redirect from '../components/Redirect'
 

export default function Index() {
    const routeConfig = [
        {
            path:'/film',
            element:lazyLoad('Film'),
            // 注意lazyLoad参数中的大小写，避免拿不到正确的路径
            children:[
                {
                    path:'',
                    element:<Redirect to='/Film/Nowplaying'/>
                },
                {
                    path:'Nowplaying',
                    element:lazyLoad('Film/Nowplaying')
                },
                {
                    path:'comingsoon',
                    element:lazyLoad('Film/Comingsoon')
                }
            ]
        },
        {
            path:'/cinema',
            element:lazyLoad('Cinema')
        },
        {
            path:'/cinema/search',
            element:lazyLoad('Search')
        },
        {
            path:'/center',
            element:<AuthComponent>{lazyLoad('Center')}</AuthComponent>
        },
        {
            path:'/login',
            element:lazyLoad('Login')
        },
        {
            path:'/detail/:id',
            element:lazyLoad('Detail')
        },
        {
            path:'/',
            element:<Redirect to='/film'/>
        },
        {
            path:'*',
            element:lazyLoad('Notfound')
        },
    ];
    const element = useRoutes(routeConfig)
  return (
    element
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
        return import(`./../view/${path}`)
    })
    return (
        <React.Suspense fallback={<>loading…………</>}>
            <Comp/>
        </React.Suspense>
    )
}