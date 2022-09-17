import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Button, Modal, Input, Switch, Form, Select } from 'antd';
import {
  DeleteOutlined, EditOutlined, UnorderedListOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import Userform from '../../../components/user-manage/UserForm';
import axios from 'axios';
const { confirm } = Modal;
const { Option } = Select;
export default function UserList() {
  let [dataSource, setDataSource] = useState([]);
  let [regionList, setRegionList] = useState([]);
  let [roleList, setRoleList] = useState([]);
  let [currentRow, setcurrentRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const addRef = useRef(null)
  const updateRef = useRef(null)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const userinfo = JSON.parse(localStorage.getItem('token'));
  const { roleId,region,username } = userinfo;
 
  
  let columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => <b>{region || '全球'}</b>,
      filters: [...regionList.map(item=>({text:item.title,value:item.value})),{text:'全球',value:'全球'}],
      onFilter: (value, record) => {
        if(value == '全球'){
          return record.region === ''
        }else {
          return record.region === value
        }
        },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => role?.roleName
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, row) => {
        return <Switch checked={roleState} onChange={() => { switchChange(row) }} disabled={row.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (obj, row, index) => {
        return (
          <>
            <Space>
              <Button danger shape="circle" onClick={() => {
                confirmHandle(row)
              }} icon={<DeleteOutlined />} disabled={row.default} />
              <Button type="primary" shape="circle" onClick={() => {
                eidtHandle(row);
              }} icon={<EditOutlined />} disabled={row.default} />
            </Space>
          </>
        );
      }
    },
  ];
  const switchChange = (row) => {
    row.roleState = !row.roleState;
    setDataSource([...dataSource]);
    axios.patch(`/users/${row.id}`, {
      roleState: row.roleState
    })
  }
  //多个请求放在一个useEffect中也可以；
  useEffect(() => {
    const rolemap = {
      '1':'superadmin',
      '2':'admin',
      '3':'editor'
    }
    axios.get('/users?_expand=role').then(res => {
      const list =  res.data;
      //下面的逻辑是后端逻辑，根据权限不同看到的列表也不同
   
      const filterlist = rolemap[roleId] ==='superadmin'?list:
      [...list.filter(item=>item.region===region&&rolemap[roleId] ==='editor')]
      // ...list.filter(item=>item.username===username), 这个可能会重复
      setDataSource(filterlist)
    })
    // }, [])
    // useEffect(() => {
    axios.get('/regions').then(res => {
      setRegionList(res.data)
    })
    axios.get('/roles').then(res => {
      setRoleList(res.data)
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
    axios.delete(`/users/${row.id}`)
  }
  const eidtHandle = (row)=>{
    showModal(row)
    setcurrentRow(row);
    //超级管理员
    setIsUpdateDisabled(row.roleId===1?true:false)
    setTimeout(()=>{
      //异步数据回填
      updateRef.current.setFieldsValue({...row})
    },0)
    
  }
  const updateOk = ()=>{
    console.log('onok', updateRef)
          // const [form] = Form.useForm();
          // console.log(form) //form等同于addRef.current; 表单封装后form值要用父子传参的方式
          updateRef.current.validateFields()
            .then((value) => {
              console.log(value);
              
              setIsModalOpen(false);
              setDataSource(dataSource.map(item=>{
                if(item.id === currentRow.id){
                  return {
                    ...item,
                    ...value,
                    role: roleList.filter(data => data.id === value.roleId)[0]
                  }
                }
                return item
              }))
              setIsUpdateDisabled(!isUpdateDisabled)//类似刷新，效果欠佳
              axios.patch(`/users/${currentRow.id}`,value)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
  }
  return (
    <>
      <Button type='primary' onClick={() => {
        setIsModalOpen(true)
      }}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{
        pageSize: 5
      }} />
      {/* 添加 */}
      <Modal
        open={isModalOpen}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={() => {
          console.log('onok', addRef)
          // const [form] = Form.useForm();
          // console.log(form) //form等同于addRef.current; 表单封装后form值要用父子传参的方式
          addRef.current.validateFields()
            .then((values) => {
              // console.log(values);
              setIsModalOpen(false);
              addRef.current.resetFields();
              //post到后端生成ID，方便更新删除操作；
              axios.post('/users', {
                ...values,
                'roleState': true,
                "default": false
              }).then(res => {
                console.log(res.data);
                // setDataSource([...dataSource,res.data])
                // 临时操作为了实时显示相应角色名 与 dataIndex: 'role',联系
                setDataSource([...dataSource, {
                  ...res.data,
                  role: roleList.filter(item => item.id === values.roleId)[0]
                }])
              })
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Userform ref={addRef} regionList={regionList} roleList={roleList}></Userform>
      </Modal>
      {/* 编辑 */}
      <Modal
        open={isModalOpen}
        title="编辑用户"
        okText="完成"
        cancelText="取消"
        onCancel={() => {
          console.log('关闭')
          setIsModalOpen(false)
          //类似于刷新这个状态的操作；后面再重新打开编辑，会更新状态
          //由于多个form共用一个状态    故意取反 调用form 中 useEffect
          setIsUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => {
          updateOk()
        }}
      >
        <Userform ref={updateRef} isUpdate={true} regionList={regionList} roleList={roleList} isUpdateDisabled = {isUpdateDisabled}></Userform>
      </Modal>
    </>
  );
}
