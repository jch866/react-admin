import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Layout, Menu,Space,Dropdown  } from 'antd';
import React, { useState } from 'react';
import "./css/layout.css"
const { Header, Sider, Content } = Layout;
const menu = (
    <Menu onClick={({ item, key, keyPath, domEvent })=>{
      console.log({ item, key, keyPath, domEvent })
    }}
    // /在 4.20.0 之后推荐通过 items 属性实现  >=4.20.0 可用，推荐的写法 
    // <4.20.0 可用，>=4.20.0 时不推荐<Menu.Item>菜单项一</Menu.Item>
      items={[
        {
          label: (
            <a rel="noopener noreferrer" href="#">
              1st menu item
            </a>
          ),
          key: '0',
        },
        {
          label: (
            <a rel="noopener noreferrer" href="#">
              2nd menu item
            </a>
          ),
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item（disabled）',
          key: '3',
          disabled: true,
        },
      ]}
    />
  );
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                  {/* 下拉菜单 */}
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                                Click me
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;