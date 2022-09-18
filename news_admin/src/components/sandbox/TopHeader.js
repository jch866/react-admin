
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export default function TopHeader() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const loginOut = () => {
    localStorage.removeItem('token')
    navigate('/login',{ replace: true });
  }
  const userinfo = JSON.parse(localStorage.getItem('token'));
  const { role: { roleName }, username } = userinfo;
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (<span>{roleName}</span>),
        },
        {
          key: '2',
          label: (<span onClick={() => { loginOut() }}>退出</span>)
        }
      ]}
    />
  );

  return (
    <Header
      className="site-layout-background ant-header-myflex"
      style={{
        padding: 0,
      }}
    >
      {/* 另一个写法 */}
      {
        collapsed ?
          <MenuUnfoldOutlined className='trigger' onClick={() => { setCollapsed(!collapsed) }} /> :
          <MenuFoldOutlined className='trigger' onClick={() => { setCollapsed(!collapsed) }} />
      }
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
      <div className='ant-header-mydrop'>
        <span className='ant-header-mywelcome'>欢迎<b>{username}</b>回来!</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>

  )
}
