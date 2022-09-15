import React, { forwardRef, useEffect, useState } from 'react'
import { Input,Form, Select } from 'antd';
const { Option } = Select;
//forwardRef   ref透传 主要是为了传值
const Userform = forwardRef((props, ref) => {
    const {regionList,roleList} = props;
    let [isDisabled,setIsDisabled] = useState(false);
    // const [form] = Form.useForm();
    // console.log(form)
    useEffect(()=>{
        console.log('userform effect')
        setIsDisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])
    return (
        <Form
            ref={ref}
            // form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
                modifier: 'public',
            }}
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled?[]:[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={() => { }}
                    allowClear
                    disabled = {isDisabled}
                >{
                        regionList.map(item => {
                            return <Option key={item.id} value={item.value}>{item.title}</Option>
                        })
                    }

                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={(value) => {
                        setIsDisabled(value===1?true:false)
                        if(value===1){
                            ref.current.setFieldsValue({
                                region:''
                            })
                        }
                    }}
                    // allowClear
                >
                    {
                        roleList.map(({ id, roleType, roleName }) => {
                            return <Option key={id} value={roleType}>{roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>

            {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item> */}
        </Form>
    )
})
export default Userform