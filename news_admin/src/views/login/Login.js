import { Form, Input, Button, message } from 'antd'
import React from 'react'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const {username,password} = values;
    const url = `/users?username=${username}&password=${password}&roleState=true&_expand=role`
    axios.get(url).then(res=>{
      console.log(res.data);
      if(res.data.length === 0 ){
        message.error('登录失败')
      }else{
        localStorage.setItem('token',JSON.stringify(res.data[0]));
        navigate('/')
      }
    })
  };
  return (
    <div className='loginbg'>
      <div className='loginwrap'>
        <div className='logintitle'>全球新闻发布系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
