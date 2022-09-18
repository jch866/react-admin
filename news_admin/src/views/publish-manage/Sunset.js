import React,{useState,useEffect} from 'react'
import {  Button } from 'antd';
import NewsPublish from '../../components/publish-manage/NewsPublish';
import axios from 'axios';
import usePublish from '../../components/publish-manage/usePublish';
export default function Sunset() {
  //3 已下线
  const {dataSource,handleDel} = usePublish(3);
  return (
    <NewsPublish dataSource = {dataSource} button={(id)=><Button danger onClick={()=>{handleDel(id)}}>删除</Button>}></NewsPublish>
  )
}
