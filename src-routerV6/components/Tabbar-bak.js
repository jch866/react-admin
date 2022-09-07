import React from 'react'
import { Link ,NavLink} from 'react-router-dom'
import './tabbar.css'
export default function Tabbar() {
    return (
        <footer>
            <ul>
                {/* <li>
                    <Link to="/film">电影</Link>
                </li>
                <li>
                    <Link to="/cinema">影院</Link>
                </li>
                <li>
                    <Link to="/center">我的</Link>
                </li> */}
                <li>
                    <NavLink to="/film" className={({isActive})=>isActive?'activeStyle':''}>电影</NavLink>
                </li>
                <li>
                    <NavLink to="/cinema" className={({isActive})=>isActive?'activeStyle':''}>影院</NavLink>
                </li>
                <li>
                    <NavLink to="/center" className={({isActive})=>isActive?'activeStyle':''}>我的</NavLink>
                </li>
            </ul>
        </footer>
    )
}
