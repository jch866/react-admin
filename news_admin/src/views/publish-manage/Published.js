import React,{useState,useEffect} from 'react'
import {  Button } from 'antd';
 
import NewsPublish from '../../components/publish-manage/NewsPublish';
import axios from 'axios';
import usePublish from '../../components/publish-manage/usePublish';
export default function Unpublished() {
  //2 已发布
  const {dataSource,handleSunset} = usePublish(2);
  return (
    <NewsPublish dataSource = {dataSource}  button={(id)=><Button danger onClick={()=>{handleSunset(id)}}>下线</Button>}></NewsPublish>
  )
}
