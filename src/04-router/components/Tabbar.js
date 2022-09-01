import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import "./../css/index.css"
function Tabbar(props) {
    const tabs = [
        {
            key: '/films',
            title: '电影',
            icon: <AppOutline />,
        },
        {
            key: '/cinema',
            title: '影院',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/center',
            title: '我的',
            icon: <UserOutline />,
        },
    ]
    return (
        <>
            <ul className='bottom-tab'>
                <TabBar onChange={(value) => {
                    props.history.push(value);
                }} activeKey={`/${props.location.pathname.split('/')[1]}`}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
                {/* <li>
                    <NavLink to="/films" activeClassName='active' >电影</NavLink>
                </li>
                <li>
                    <NavLink to="/cinema" activeClassName='active'>影院</NavLink>
                </li>
                <li>
                    <NavLink to="/center" activeClassName='active'>我的</NavLink>
                </li> */}
            </ul>
        </>
    )
}
export default withRouter(Tabbar)
//声明式导航  location.hash
//编程式导航  window.location.href
//window.onhashchange
