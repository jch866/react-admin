import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, Modal,  Tree } from 'antd';
import {
  DeleteOutlined, EditOutlined, UnorderedListOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';

import axios from 'axios';
const { confirm } = Modal;
export default function RoleList() {
  let [dataSource, setDataSource] = useState([]);
  let [rightList, setRightList] = useState([]);
  let [currentId, setcurrentId] = useState(0);
  let [currentRights, setcurrentRights] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    //隐藏弹窗
    setIsModalOpen(false);
    //更新datasource
    setDataSource(dataSource.map(item=>{
      if(item.id === currentId){
        return {
          ...item,
          rights:currentRights
        }
      }
      return item;
    }))
    //后端数据更新
    axios.patch(`http://localhost:8000/roles/${currentId}`,{
      rights:currentRights
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let columns = [
    {
      title: 'ID',
      dataIndex: 'id', // dataIndex对应的要和后端匹配上
      // key: 'id',
      render: (id) => <b>{id}</b>,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName', // dataIndex对应的要和后端匹配上
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

              <Button type="primary" shape="circle" onClick={() => {
                showModal(row)
                setcurrentRights(row.rights)
                setcurrentId(row.id)
              }} icon={<UnorderedListOutlined />} />

            </Space>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    axios.get('http://localhost:8000/roles').then(res => {
      console.log(res.data);
      let lists = res.data;
      setDataSource(lists)
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then(res => {
      setRightList(res.data)
    })
  }, [])
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
    axios.delete(`http://localhost:8000/roles/${row.id}`)
  }
  const onCheck = (checkedKeys) => {
    console.log(checkedKeys)
    setcurrentRights(checkedKeys.checked)
  }
  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{
        pageSize: 5
      }} />
      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
        checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={currentRights}
        checkedKeys={currentRights}
        // onSelect={onSelect}
        checkStrictly = {true}
        onCheck={onCheck}
        treeData={rightList}
      />
      </Modal>
    </>
  );
}
