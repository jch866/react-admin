
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
const { Header, Sider, Content } = Layout;
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (<span>超级管理员</span>),
      },
      {
        key: '2',
        label: (<span>退出</span>)
      }
    ]}
  />
);
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
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
        <span className='ant-header-mywelcome'>欢迎admin回来!</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>

  )
}
