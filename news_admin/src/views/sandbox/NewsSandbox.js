import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Layout ,Spin} from 'antd'
import {connect} from 'react-redux'
import NProgress from "nprogress"; // 导入 nprogress模块
import "nprogress/nprogress.css"; // 导入样式，否则看不到效果
NProgress.configure({ showSpinner: true }); // 显示右上角螺旋加载提示 默认为
 
const { Header, Sider, Content } = Layout;
function NewsSandbox(props) {
  NProgress.start();
  useEffect(()=>{
    NProgress.done(); //useEffect 中的依赖[]要删除，否则done()无效
  })
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow:'auto'
          }}
        >
          <Spin size='large' spinning={props.isLoading}>
             <Outlet></Outlet>
          </Spin>
         
        </Content>
      </Layout>
    </Layout>
  )
}
const mapStateToProps = (state)=>{
  return {
    isLoading:state.LoadingReducer.isLoading
  }
}
export default connect(mapStateToProps)(NewsSandbox)