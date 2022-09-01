import React from 'react'
import { Route ,Redirect,Switch,NavLink} from 'react-router-dom';
import Comingsoon from "./../components/Comingsoon"
import Nowplaying from "./../components/Nowplaying"
import { Tabs, Swiper,Toast } from 'antd-mobile'

 
import style from "./../css/Films.module.css"
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={style.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))
export default function Films(props) {
  return (
    <div>
        
        <Swiper autoplay>{items}</Swiper>
        <Tabs onChange={(key)=>{
          props.history.push(key)
        }} activeKey={props.location.pathname}>
          <Tabs.Tab title='正在上映' key='/films/nowplaying'></Tabs.Tab>
          <Tabs.Tab title='即将上映' key='/films/comingsoon'></Tabs.Tab>
        </Tabs>
        {/* <ul className='playing-tab'>
          <li>
            <NavLink to='/films/nowplaying' activeClassName={style.active}>正在上映</NavLink>
          </li>
          <li>
            <NavLink to='/films/comingsoon' activeClassName={style.active}>即将上映</NavLink>
          </li>
        </ul> */}
        {/* 路由配置   嵌套路由 */}
        <Switch>
          <Route path='/films/comingsoon' component={Comingsoon}></Route>
          <Route path='/films/nowplaying' component={Nowplaying}></Route>
          <Redirect from='/films' to="/films/nowplaying"></Redirect>
        </Switch>
    </div>
  )
}
