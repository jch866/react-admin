import React from 'react'
import { Route ,Redirect,Switch} from 'react-router-dom';
import Comingsoon from "./../components/Comingsoon"
import Nowplaying from "./../components/Nowplaying"
import './../css/index.css'
export default function Films() {
  return (
    <div>
        <div className='film-swiper'>大轮播</div>
        <div className='film-bar'>导航栏</div>
        {/* 路由配置   嵌套路由 */}
        <Switch>
          <Route path='/films/comingsoon' component={Comingsoon}></Route>
          <Route path='/films/nowplaying' component={Nowplaying}></Route>
          <Redirect from='/films' to="/films/comingsoon"></Redirect>
        </Switch>
    </div>
  )
}
