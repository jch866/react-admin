import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import Home from '../views/sandbox/home/Home'
import NewsSandbox from '../views/sandbox/NewsSandbox'
import RightList from '../views/sandbox/right-manage/RightList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import UserList from '../views/sandbox/user-manage/UserList'

export default function index() {
    return (
        <Routes>
            <Route path='/' element={<NewsSandbox />}>
                <Route path='/' element={<Navigate to='/home'/>}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/user-manage/list' element={<UserList />}></Route>
                <Route path='/right-manage/role/list' element={<RoleList />}></Route>
                <Route path='/right-manage/right/list' element={<RightList />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            {/* <Route path='/center' element={<AuthComponent><Center></Center></AuthComponent>}></Route> */}
            {/*  element={isAuth()?<Center/>:<Redirect to='/login'/> 这种写法只会渲染一次，不会自动更新true or false */}
            {/* <Route path='/center' element={isAuth()?<Center/>:<Redirect to='/login'/>}></Route> */}
            {/* <Route path='/center' element={<AuthComponent><Center></Center></AuthComponent>}></Route>
    <Route path='/login' element={<Login/>}></Route> */}
            {/* <Route path='/detail' element={<Detail/>}></Route> */}
            {/* 动态路由传参 */}

            {/* <Route path='/' element={<Navigate to='/film'/>}></Route> */}

        </Routes>
    )
}
//路由拦截组件封装
function AuthComponent(props) {
    const islogin = localStorage.getItem('token');
    return islogin ? props.children : <Navigate to='/home' />
}