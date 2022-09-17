import {  Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState,  forwardRef } from 'react';
const { Option } = Select;
const NewsForm = forwardRef((props, ref) => {
    const [catelist, setCatelist] = useState([])
    useEffect(() => {
      axios.get('/categories').then(res => {
        setCatelist(res.data)
      })
    }, [])
    // const onFinish = () => {}
    // const onFinishFailed = () => {}
    return (<Form
      ref={ref}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="新闻标题"
        name="title"
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="新闻分类"
        name="categoryId"
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Select>
          {
            catelist.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)
          }
        </Select>
      </Form.Item>
    </Form>)
  })
export default NewsForm
