import React, { useEffect, useState } from 'react'
import { Table,Tag,Space,Button,Modal,Popover,Switch } from 'antd';
import axios from 'axios';
import {
 DeleteOutlined,EditOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
const {confirm} = Modal;
export default function RightList() {
  let [dataSource,setDataSource] = useState([])
  useEffect(()=>{
    axios.get('/rights?_embed=children').then(res=>{
      // console.log(res.data);
      let lists = res.data.map(item=>{
        if(item.children?.length===0){
          delete item.children
        }
        return item
      })
      setDataSource(lists)
    })
  },[])
 
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id', // dataIndex对应的要和后端匹配上
      // key: 'id',
      render: (id) => <b>{id}</b>,
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      // key: 'age',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      // key: 'address',
      render:(key)=>{
        return (
          <Tag color='orange'>
            {key.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: '操作',
      render:(obj,row,index)=>{
        return (
          <>
            <Space>
              <Button danger  shape="circle" onClick={()=>{
                confirmHandle(row)
              }} icon={<DeleteOutlined/>}/>
              <Popover content={
                <>
                <Switch defaultChecked={row.pagepermisson} 
                onChange={(checked)=>{switchHandle(row,checked)}}>
                  </Switch>
                </>
              } title="配置项" trigger={row.pagepermisson === undefined?'':"click"}>
              <Button type="primary" shape="circle" icon={<EditOutlined/>} disabled = {row.pagepermisson === undefined}/>
              </Popover>
             
            </Space>
          </>
        );
      }
    },
  ];
  const switchHandle=(row,checked)=>{
    row.pagepermisson = checked?1:0;
    // row.pagepermisson = row.pagepermisson?0:1
    console.log(row);
    setDataSource([...dataSource])
    if(row.grade == 1){
      
      axios.patch(`/rights/${row.id}`,{
        pagepermisson:row.pagepermisson
      })
    }else{
      axios.patch(`/children/${row.id}`,{
        pagepermisson:row.pagepermisson
      })
    }
  }
  const confirmHandle = (row)=>{
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除吗?',
      okText: '确认',
      cancelText: '取消',
      onCancel:()=>{
        console.log('cancel')
      },
      onOk:()=>{
        console.log('onOk')
        confirmDel(row)
      }
    })
  }
  const confirmDel = (row)=>{
    if(row.grade == 1){
      setDataSource(dataSource.filter(data=>data.id!==row.id));
      axios.delete(`/rights/${row.id}`)
    }else{
      //根据rightid 确定父级
      let list = dataSource.filter(data=>data.id === row.rightId);
      //过滤父级对应子元素
      list[0].children =  list[0].children.filter(item=>item.id !== row.id);
      console.log(list,dataSource)
      setDataSource([...dataSource])
      axios.delete(`/children/${row.id}`)
    }
  }
  return <Table dataSource={dataSource} columns={columns} pagination={{
    pageSize:5}}/>;
  
}
