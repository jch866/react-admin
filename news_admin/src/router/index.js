import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
import Home from '../views/sandbox/home/Home'
import NewsSandbox from '../views/sandbox/NewsSandbox'
import Nopermission from '../views/sandbox/nopermission/Nopermission'
import RightList from '../views/sandbox/right-manage/RightList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import UserList from '../views/sandbox/user-manage/UserList'

export default function Index() {
    const config = [
        {
            path: '/',
            element: <NewsSandbox />,
            children: [
                {
                    path: '/',
                    element: <Navigate to='/home' />,
                },
                {
                    path: '/home',
                    element: <Home />,
                },
                {
                    path: '/user-manage/list',
                    element: <UserList />,
                },
                {
                    path: '/right-manage/role/list',
                    element: <RoleList />,
                },
                {
                    path: '/right-manage/right/list',
                    element: <RightList />,
                }, {
                    path: '*',
                    element: <Nopermission />,
                }
            ]
        },
        {
            path: '/login',
            element: <Login />,
        }

    ]

    // let newconfig = interuptRoute(config,AuthComponent);
    // // console.log(newconfig);
    const elements = useRoutes(config);
    return (elements)
}
//处理路由拦截
function interuptRoute(lists,authFn){
    return lists.map(item=>{
        if(item.children?.length>0){
            interuptRoute(item.children,authFn);
            return item;
        }else{
            if(item.path === '/login'||item.path === '/'){
                return item
            }
            item.element =  authFn(item.element);
            return item
        }
    })
}


//路由拦截组件封装
function AuthComponent(element) {
    const islogin = localStorage.getItem('token');
    // return islogin ? props.children : <Navigate to='/' />
    return islogin ? element : <Navigate to='/login' />
}