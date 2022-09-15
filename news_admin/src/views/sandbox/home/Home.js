import React from 'react'
import { Layout, Button } from 'antd'
import axios from 'axios';
const { Header, Sider, Content } = Layout;
export default function Home() {
  const getRigths = ()=>{
    axios.get('http://localhost:8000/rights?_embed=children').then(res=>{
      console.log(res.data)
    })
  }
  const getDate = ()=>{
    // _expand
    axios.get('http://localhost:8000/comments?_expand=post').then(res=>{
      console.log(res.data)
    })
    return 
    //_embed 联合查询 并合并数据   向下关联
    axios.get('http://localhost:8000/posts?_embed=comments').then(res=>{
      console.log(res.data)
    })
    return
    //删除
    axios.delete('http://localhost:8000/posts/3').then(res=>{
      console.log(res.data)
    })
    return 
    //修改
    axios.patch('http://localhost:8000/posts/2',{title:'22-修改',author:'22'}).then(res=>{
      console.log(res.data)
    })
    return 
    //增
    axios.post('http://localhost:8000/posts',{title:'22',author:'22'}).then(res=>{
      console.log(res.data)
    })
    return
    //查
    axios.get('http://localhost:8000/posts').then(res=>{
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
