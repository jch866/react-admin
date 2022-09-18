import { useEffect, useState } from "react";
import axios from 'axios';
import {notification} from 'antd'
const usePublish = (type) => {
    const [dataSource, setDataSource] = useState([]);
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            let lists = res.data
            setDataSource(lists)
        })
    }, [username,type])

    const handlePublish = (id)=>{
        setDataSource(dataSource.filter(item=>item.id!==id))
        axios.patch(`/news/${id}`,{
            "publishState":2,
            "publishTime":Date.now()
          }).then(res => {
            //请求正常返回后再判断
            // navigate(`/publish-manage/published`);
            notification.info({
              message: `通知`,
              description: `[发布管理-已发布]中查看`,
              placement: 'bottomRight',
            });
          })
    }
    const handleSunset = (id)=>{
        setDataSource(dataSource.filter(item=>item.id!==id))
        axios.patch(`/news/${id}`,{
            "publishState":3,
          }).then(res => {
            //请求正常返回后再判断
            notification.info({
              message: `通知`,
              description: `[发布管理-已下线]中查看`,
              placement: 'bottomRight',
            });
          })
    }
    const handleDel = (id)=>{
        setDataSource(dataSource.filter(item=>item.id!==id))
        axios.delete(`/news/${id}`).then(res => {
            //请求正常返回后再判断
            notification.info({
              message: `通知`,
              description: `你已经删除了新闻`,
              placement: 'bottomRight',
            });
          })
    }
    
    return {
        dataSource,handlePublish,handleDel,handleSunset
    }
}
export default usePublish;