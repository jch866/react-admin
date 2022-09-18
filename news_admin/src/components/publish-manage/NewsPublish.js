import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, notification } from 'antd';
 
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;
export default function NewsPublish(props) {
 const {dataSource,button} = props;
  const navigate = useNavigate();
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
              {button(row.id)}
            </Space>
          </>
        );
      }
    },
  ];
 
  return <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{
    pageSize: 5
  }} />;
}
