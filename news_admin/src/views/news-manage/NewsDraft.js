import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, notification } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;
export default function NewsDraft() {
  let [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const { username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
      let lists = res.data
      setDataSource(lists)
    })
  }, [username])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id', // dataIndex对应的要和后端匹配上
      render: (id) => <b>{id}</b>,
    },
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
              <Button danger shape="circle" onClick={() => {
                confirmHandle(row)
              }} icon={<DeleteOutlined />} />
              <Button shape="circle" icon={<EditOutlined />} onClick={() => {
                navigate(`/news-manage/update/${row.id}`)
              }} />
              <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={() => {
                handleCheck(row.id)
              }} />
            </Space>
          </>
        );
      }
    },
  ];
  //提交审核
  const handleCheck = (id) => {
    axios.patch(`/news/${id}`, {
      auditState: 1
    }).then(res => {
      navigate(`/audit-manage/list`);
      notification.info({
        message: `通知`,
        description: `审核列表中查看`,
        placement: 'bottomRight',
      });
    })
  }
  const confirmHandle = (row) => {
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除吗?',
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
        console.log('cancel')
      },
      onOk: () => {
        console.log('onOk')
        confirmDel(row)
      }
    })
  }
  const confirmDel = (row) => {
    setDataSource(dataSource.filter(data => data.id !== row.id));
    axios.delete(`/news/${row.id}`)
  }
  return <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{
    pageSize: 5
  }} />;
}
