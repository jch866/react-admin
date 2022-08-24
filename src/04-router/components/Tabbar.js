import React from 'react'
import { NavLink } from 'react-router-dom';
import "./../css/index.css"
export default function Tabbar() {
    return (
        <div>
            <ul className='bottom-tab'>
                {/* <li>
                    <a href="#/films" >电影</a>
                </li>
                <li>
                    <a href="#/cinema">影院</a>
                </li>
                <li>
                    <a href="#/center">我的</a>
                </li> */}
                <li>
                    <NavLink to="/films" activeClassName='active' >电影</NavLink>
                </li>
                <li>
                    <NavLink to="/cinema" activeClassName='active'>影院</NavLink>
                </li>
                <li>
                    <NavLink to="/center" activeClassName='active'>我的</NavLink>
                </li>
            </ul>
        </div>
    )
}
//声明式导航  location.hash
//编程式导航  window.location.href
//window.onhashchange
