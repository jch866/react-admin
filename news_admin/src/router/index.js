import React, { useEffect, useState } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
import Home from '../views/sandbox/home/Home'
import NewsSandbox from '../views/sandbox/NewsSandbox'
import Nopermission from '../views/sandbox/nopermission/Nopermission'
import RightList from '../views/sandbox/right-manage/RightList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import UserList from '../views/sandbox/user-manage/UserList'
import NewsAdd from '../views/news-manage/NewsAdd'
import NewsCategory from '../views/news-manage/NewsCategory'
import NewsDraft from '../views/news-manage/NewsDraft'
import NewsPreview from '../views/news-manage/NewsPreview'
import Audit from '../views/audit-manage/Audit'
import AuditList from '../views/audit-manage/AuditList'
import Unpublished from '../views/publish-manage/Unpublished'
import Published from '../views/publish-manage/Published'
import Sunset from '../views/publish-manage/Sunset'
import axios from 'axios'
import NewsUpdate from '../views/news-manage/NewsUpdate'
export default function Index() {
    const [backRouteList, setBackRouteList] = useState([])
    const url1 = '/rights';
    const url2 = '/children';
    useEffect(() => {
        Promise.all([axios.get(url1), axios.get(url2)]).then(res => {
            setBackRouteList([...res[0].data, ...res[1].data])
        })
    }, [])
    // const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
    let localRouteMap = {
        "/home": <Home />,
        // "/user-manage": "",
        "/user-manage/add": "",
        "/user-manage/delete": "",
        "/user-manage/update": "",
        // "/right-manage": "",
        "/right-manage/role/list": "",
        "/right-manage/right/list": "",
        "/right-manage/role/update": "",
        "/right-manage/role/delete": "",
        "/right-manage/right/update": "",
        "/right-manage/right/delete": "",
        // "/news-manage": "",
        "/news-manage/list": "",
        "/news-manage/add": "",
        "/news-manage/update/:id": "",
        "/news-manage/preview/:id": "",
        "/news-manage/draft": "",
        // "/audit-manage": "",
        "/audit-manage/audit": "",
        "/audit-manage/list": "",
        // "/publish-manage": "",
        "/publish-manage/unpublished": "",
        "/publish-manage/published": "",
        "/publish-manage/sunset": "",
        "/user-manage/list": ""
    }
    const checkRoute = (item) => {
        return localRouteMap(item.key) && item.pagepermission
    }
    const checkUserPermission = (item) => {}
    const islogin = localStorage.getItem('token');
    const config = [
        {
            path: '/',
            element: islogin?<NewsSandbox />:<Navigate to='/login' />,
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
                },
                {
                    path: '/news-manage/add',
                    element: <NewsAdd />,
                },
                {
                    path: '/news-manage/draft',
                    element: <NewsDraft />,
                },
                {
                    path: '/news-manage/category',
                    element: <NewsCategory />,
                },
                {
                    path: '/news-manage/preview/:id',
                    element: <NewsPreview />,
                },
                {
                    path: '/news-manage/update/:id',
                    element: <NewsUpdate />,
                },
                {
                    path: '/audit-manage/audit',
                    element: <Audit />,
                },
                {
                    path: '/audit-manage/list',
                    element: <AuditList />,
                },
                {
                    path: '/publish-manage/unpublished',
                    element: <Unpublished />,
                },
                {
                    path: '/publish-manage/published',
                    element: <Published />,
                },
                {
                    path: '/publish-manage/sunset',
                    element: <Sunset />,
                },
                {
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
    const elements = useRoutes(config);

    return (elements)
}
//处理路由拦截
function interuptRoute(lists, authFn) {
    return lists.map(item => {
        if (item.children?.length > 0) {
            interuptRoute(item.children, authFn);
            return item;
        } else {
            if (item.path === '/login' || item.path === '/') {
                return item
            }
            item.element = authFn(item.element);
            return item
        }
    })
}
//路由拦截组件封装
function AuthComponent(props) {
    const islogin = localStorage.getItem('token');
    // return islogin ? props.children : <Navigate to='/' />
    return islogin ? props.children : <Navigate to='/login' />
}