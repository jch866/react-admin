import { Steps, PageHeader, Button, Form, Input, Select, message,notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import style from './News.module.css'
import NewsEditor from '../../components/news-manage/NewsEditor';
import NewsForm from '../../components/news-manage/NewsForm';
import { useNavigate } from 'react-router-dom';
const { Step } = Steps;



export default function NewsAdd() {
  const [current, setCurrent] = useState(0)
  const myformref = useRef(null);
  const [formInfo, setFormInfo] = useState({});
  const [content, setContent] = useState('');
  const User = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const handleNext = () => {
    if (current === 0) {
      let form = myformref.current;
      console.dir(form)
      form.validateFields().then(res => {
        // console.log(res);
        setFormInfo(res)
        setCurrent(current + 1)
      }).catch(e => { console.log(e) })
    } else {
      if (content === '' || content.trim() === '<p></p>') {
        message.error('新闻内容不能为空!')
      } else {
        console.log(formInfo, content)
        setCurrent(current + 1)
      }

    }
  }
  const handlePrev = () => {
    setCurrent(current - 1)
  }
  const handleSave = (auditState) => {
    axios.post('/news', {
      ...formInfo,
      "content": content,
      "region": User.region || "全球",
      "author": User.usename,
      "roleId": User.roleId,
      "auditState": auditState, //0草稿 1 待审核 2审核通过 3审核被拒绝
      "publishState": 0,//0 未发布 
      "createTime": Date.now(),
      "star": 0,
      "view": 0,
      "publishTime": 0
    }).then(res => {
      console.log(res);
      navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list');
      notification.info({
        message: `通知`,
        description: `${auditState === 0 ? '新闻列表' : "审核列表"}中查看`,
        placement: 'bottomRight',
      });

    }).catch(e => {
      console.log(e)
    })
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title="撰写新闻"
        subTitle="This is a subtitle"
      />
      <Steps current={current}>
        <Step title="基本信息" description="This is a description." />
        <Step title="新闻内容" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="提交审核" description="This is a description." />
      </Steps>

      <div className={style.inputArea}>
        <div className={current === 0 ? '' : style.active}>
          <NewsForm ref={myformref} />
        </div>
        <div className={current === 1 ? '' : style.active}>
          <NewsEditor getContent={(value) => {
            // console.log("getContent:"+value);
            setContent(value);
          }} />
        </div>
        <div className={current === 2 ? '' : style.active}>

        </div>
      </div>

      <div>
        {
          current >= 1 && <Button type='primary' onClick={() => { handlePrev() }}>上一步</Button>
        }
        {
          current === 2 && (<><Button type='primary' onClick={() => { handleSave(0) }}>保存草稿箱</Button>
            <Button danger onClick={() => { handleSave(1) }}>提交审核</Button></>)
        }
        {
          (current >= 0 && current < 2) && <Button type='primary' onClick={() => { handleNext() }}>下一步</Button>
        }

      </div>

    </div>
  )
}
