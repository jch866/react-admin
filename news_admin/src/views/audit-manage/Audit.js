import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { Table, Space, Button, Modal, notification, Tag, message } from 'antd';
const rolemap = {
  '1':'superadmin',
  '2':'admin',
  '3':'editor'
}
const userinfo = JSON.parse(localStorage.getItem('token')) || { roleId:'',region:'',username:'' };
const { roleId,region,username } = userinfo;
export default function Audit() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(()=>{
    axios.get(`/news?auditState=1&_expand=category`).then(res=>{
      const list =  res.data;
      //下面的逻辑是后端逻辑，根据权限不同看到的列表也不同
      const filterlist = rolemap[roleId] ==='superadmin'?list:
      [...list.filter(item=>item.region===region&&rolemap[roleId] ==='editor'),
      ...list.filter(item=>item.author===username)]
      setDataSource(filterlist)
    })
  },[])
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
      title: '操作',
      render: (obj, row, index) => {
        return (
          <>
            <Space>
               <Button type='primary' onClick={()=>{
                handleAudit(row,2,1);
               }}>通过</Button>
               <Button danger onClick={()=>{
                handleAudit(row,3,0);
               }}>驳回</Button>
            </Space>
          </>
        );
      }
    },
  ];
  const handleAudit = (row,auditState,publishState)=>{
    setDataSource(dataSource.filter(item=>item.id != row.id))
    axios.patch(`/news/${row.id}`,{
      auditState,publishState
    }).them(res=>{
      notification.info({
        message: `通知`,
        description: `[审核管理-审核列表]中查看`,
        placement: 'bottomRight',
      });
    })
  }
  return (
    <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{
      pageSize: 5
    }} />
  )
}
