import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, Space, Button, Modal, notification, Form, Input, message } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined
} from '@ant-design/icons';
const EditableContext = React.createContext(null);
const { confirm } = Modal;
export default function NewsCategory() {
  let [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get(`/categories`).then(res => {
      let lists = res.data
      setDataSource(lists)
    })
  }, [])
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id', // dataIndex对应的要和后端匹配上
      render: (id) => <b>{id}</b>,
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,
      }),
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
            </Space>
          </>
        );
      }
    },
  ];
  const handleSave = (row) => {
    console.log(row)
    setDataSource(dataSource.map(item=>{
      if(item.id === row.id){
        return {
          id:row.id,
          title:row.title,
          value:row.title
        }
      }
      return item;
    }))
    axios.patch(`/categories/${row.id}`,{
        title:row.title,
        value:row.title
    }).then(res=>{
      message.success('更新成功')
    })
  };
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
    axios.delete(`/categories/${row.id}`)
  }
  return <Table dataSource={dataSource} columns={columns}
    rowKey={item => item.id}
    components={{
      body: {
        row: EditableRow,
        cell: EditableCell,
      }
    }}
    pagination={{ pageSize: 5 }} />;
}
