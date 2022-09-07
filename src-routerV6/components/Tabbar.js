import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './tabbar.css'
export default function Tabbar() {
    let activeClass = 'activeStyle';
    let linkmap = [
        {
            path: '/film', name: '电影'
        },
        {
            path: '/cinema', name: '影院'
        },
        {
            path: '/center', name: '我的'
        },
    ]
    return (
        <footer className='tabbar-foot'>
            <ul className='tabbar-ul'>
                {
                    linkmap.map(({ path, name }) => {
                        return (
                            <li key={name}>
                                <NavLink to={path} className={({ isActive }) => isActive ? activeClass : ''}>{name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </footer>
    )
}
