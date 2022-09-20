import React from 'react'
import { Layout, Button } from 'antd'
import axios from 'axios';
const { Header, Sider, Content } = Layout;
export default function Home() {
  const getRigths = ()=>{
    axios.get('/rights?_embed=children').then(res=>{
      console.log(res.data)
    })
  }
  const getDate = ()=>{
    // _expand 类似联表查询
    axios.get('/comments?_expand=post').then(res=>{
      console.log(res.data)
    })
    return 
    //_embed 联合查询 并合并数据   向下关联
    axios.get('/posts?_embed=comments').then(res=>{
      console.log(res.data)
    })
    return
    //删除
    axios.delete('/posts/3').then(res=>{
      console.log(res.data)
    })
    return 
    //修改
    axios.patch('/posts/2',{title:'22-修改',author:'22'}).then(res=>{
      console.log(res.data)
    })
    return 
    //增
    axios.post('/posts',{title:'22',author:'22'}).then(res=>{
      console.log(res.data)
    })
    return
    //查
    axios.get('/posts').then(res=>{
      console.log(res.data)
    })
  }
  return (
    <>
      <Button onClick = {()=>{
        getRigths()
      }}>get data</Button>
    </>
  )
}
