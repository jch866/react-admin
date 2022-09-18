import React,{useState,useEffect} from 'react'
import {  Button } from 'antd';
import NewsPublish from '../../components/publish-manage/NewsPublish';
import axios from 'axios';
import usePublish from '../../components/publish-manage/usePublish';
export default function Unpublished() {
  //1 待发布
  const {dataSource,handlePublish} = usePublish(1);
  return (
    <NewsPublish dataSource = {dataSource} button={(id)=><Button type='primary' onClick={()=>{handlePublish(id)}}>发布</Button>}></NewsPublish>
  )
}
