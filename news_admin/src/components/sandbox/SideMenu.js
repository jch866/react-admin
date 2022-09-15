import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import axios from 'axios';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useNavigate ,useLocation} from 'react-router-dom';
const { Header, Sider, Content } = Layout;


const getRigths = () => {
  return axios.get('http://localhost:8000/rights?_embed=children')
}
const replaceTitleToLabel = (arr) => {
  let newarr = arr.filter(item => {
    return item.pagepermisson
  })
  return newarr.map((item, index) => {
    if (item.rightId) {
      item.rightid = item.rightId;
      delete item.rightId // rightId react会报错
    }
    if (item.pagepermisson && item.pagepermisson === 1) {
      if (item.children?.length > 0) {
        item.label = item.title;
        delete item.title;
        item.children = replaceTitleToLabel(item.children);
        return item;
      } else {
        item.label = item.title;
        delete item.children;
        delete item.title;
        return item;
      }
    }
  })


}
export default function SideMenu() {
  const navigate = useNavigate();
  let {pathname} = useLocation();

  let openkey = `/${pathname.split('/')[1]}`;
  // console.log(openkey)
  const [collapsed, setCollapsed] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const itemClickHandle = ({ key }) => {
    navigate(key)
  }
  useEffect(() => {
    getRigths().then(res => {
      // console.log(res.data);//原始路由数据
      let newItems = replaceTitleToLabel(res.data);
      // console.log(newItems) //处理过的路由数据
      setItemsList(newItems);
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='sidemenu-wrap'>
        <div className="logo">全球新闻发布系统</div>
        <div className='sidemenu-menus'>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys = {[openkey]}
            onClick={(obj) => {
              itemClickHandle(obj)
            }}
            items={itemsList}
          />
        </div>

      </div>
    </Sider>
  )
}
