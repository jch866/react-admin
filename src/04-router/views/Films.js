import React from 'react'
import { Route ,Redirect,Switch,NavLink} from 'react-router-dom';
import Comingsoon from "./../components/Comingsoon"
import Nowplaying from "./../components/Nowplaying"
import './../css/index.css'
export default function Films() {
  return (
    <div>
        <div className='film-swiper'>大轮播</div>
        <div className='film-bar'>导航栏</div>
        <ul className='playing-tab'>
          <li>
            <NavLink to='/films/nowplaying' activeClassName='playactive'>正在上映</NavLink>
          </li>
          <li>
            <NavLink to='/films/comingsoon' activeClassName='playactive'>即将上映</NavLink>
          </li>
        </ul>
        {/* 路由配置   嵌套路由 */}
        <Switch>
          <Route path='/films/comingsoon' component={Comingsoon}></Route>
          <Route path='/films/nowplaying' component={Nowplaying}></Route>
          <Redirect from='/films' to="/films/nowplaying"></Redirect>
        </Switch>
    </div>
  )
}
