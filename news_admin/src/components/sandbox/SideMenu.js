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
import {connect} from 'react-redux'
const { Header, Sider, Content } = Layout;

const userinfo = JSON.parse(localStorage.getItem('token'))||{role:{rights:{}}};
const { role: { rights } } = userinfo;
const replaceTitleToLabel = (arr) => {
  let newarr = arr.filter(item => {
    return item.pagepermisson ;
  })
  return newarr.map((item, index) => {
    if (item.rightId) {
      item.rightid = item.rightId;
      delete item.rightId // rightId react会报错
    }
    //权限列表还必须满足在后端返回的数据中
    if (item.pagepermisson && item.pagepermisson === 1 &&  rights.includes(item.key)) {
    // if (item.pagepermisson && item.pagepermisson === 1  ) {
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
function SideMenu(props) {

  const navigate = useNavigate();
  let {pathname} = useLocation();
  let {isCollapsed} = props;
  let openkey = `/${pathname.split('/')[1]}`;
  // console.log(openkey)
  // const [collapsed, setCollapsed] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const itemClickHandle = ({ key }) => {
    navigate(key)
  }
  useEffect(() => {
    axios.get('/rights?_embed=children').then(res => {
      // console.log(res.data);//原始路由数据
      let newItems = replaceTitleToLabel(res.data);
      // console.log(newItems) //处理过的路由数据
      setItemsList(newItems);
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={isCollapsed}>
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

//topheader中操作 isCollapsed  这里来取
const mapStateToProps = (state)=>{
  return {
    isCollapsed:state.CollapsedReducer.isCollapsed
  }
}
export default connect(mapStateToProps)(SideMenu)