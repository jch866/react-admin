import React, { useEffect,useState } from 'react'
import { Table, Space, Button, Modal, notification, Tag, message } from 'antd';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
export default function AuditList() {
  const [dataSource, setDataSource] = useState([]);
  const auditList = ['未审核', '审核中', '已通过', '未通过']
  const publishList = ['未发布', '待发布', '已上线', '已下线'];
  const colorlist = ['black','orange','green','red']
  const navigate = useNavigate();
  const { username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    //_ne=0 不等于0  _lte=1 小于等于1
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      let lists = res.data
      setDataSource(lists)
    })
  }, [username])
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => category.title
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        return <Tag color={colorlist[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: '操作',
      render: (obj, row, index) => {
        return (
          <>
            <Space>
              {
                row.auditState===1 && <Button onClick={() => { handleRervert(row) }}> 撤销 </Button>
              }
              {
                row.auditState===2 && <Button danger  onClick={() => { handlePublish(row) }}> 发布 </Button>
              }
              {
                row.auditState===3 && <Button type="primary" onClick={() => { handleUpdate(row)  }}> 更新 </Button>
              }
            </Space>
          </>
        );
      }
    },
  ];
  const handlePublish = (row)=>{
    axios.patch(`/news/${row.id}`,{
      "publishState":2,
      "publishTime":Date.now()
    }).then(res => {
      //请求正常返回后再判断
      navigate(`/publish-manage/published`);
      notification.info({
        message: `通知`,
        description: `[发布管理-已发布]中查看`,
        placement: 'bottomRight',
      });
    })
  }
  const handleUpdate =(row)=>{
    navigate(`/news-manage/update/${row.id}`)
  }
  const handleRervert = (row)=>{
    setDataSource(dataSource.filter(item=>item.id !=row.id))
    axios.patch(`/news/${row.id}`,{
      auditState:0
    }).then(res=>{
      message.success('操作成功')
    })
  }
  return (
    <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{
      pageSize: 5
    }} />
  )
}
