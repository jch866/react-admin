import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Descriptions, PageHeader, Row, Statistic, Tag } from 'antd';
import moment from 'moment';
import {
  HeartTwoTone} from '@ant-design/icons';
export default function Detail(props) {
    const { id } = useParams();
    const [detail, setDetail] = useState(null)
    useEffect(() => {
        axios(`/news/${id}?_expand=category&_expand=role`).then(res => {
            console.log(res.data);
            setDetail({
              ...res.data,
              view:res.data.view+1
            });
            return res.data;
        }).then(res=>{
          axios.patch(`/news/${id}`,{
            view:res.view+1
          })
        })
    }, [id])
    const handleStar = ()=>{
      setDetail({
        ...detail,
        star:detail.star+1
      });
      axios.patch(`/news/${id}`,{
        star:detail.star+1
      })
    }
    // const auditList = ['未审核', '审核中', '已通过', '未通过']
    // const publishList = ['未发布', '待发布', '已上线', '已下线']
    // const colorlist = ['black','orange','green','red']
    //detail为null会报错  容错处理 detail || {}
    const { author, title, region, view, star, publishState, auditState, category, createTime, publishTime, content } = detail || {};
    return (
        <div>
            {
                detail && (
                    <>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => window.history.back()}
                            title={title}
                            subTitle={
                              <div>category.title<HeartTwoTone twoToneColor="#eb2f96" onClick={()=>{
                                handleStar()
                              }}/>
                              </div>
                            }
                        >
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="创建者">{author}</Descriptions.Item>
                                {/* <Descriptions.Item label="创建时间">{moment(createTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item> */}
                                <Descriptions.Item label="发布时间">
                                    {publishTime ? moment(publishTime).format("YYYY-MM-DD HH:mm:ss") : '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label="区域">{region}</Descriptions.Item>
                                {/* <Descriptions.Item label="审核状态">
                                    <span style={{ color: colorlist[auditState] }}>
                                        {auditList[auditState]}
                                    </span>
                                </Descriptions.Item>
                                <Descriptions.Item label="发布状态">
                                    <span style={{ color: colorlist[publishState] }}>
                                        {publishList[publishState]}
                                    </span>
                                </Descriptions.Item> */}
                                <Descriptions.Item label="访问数量">{view}</Descriptions.Item>
                                <Descriptions.Item label="点赞数量">{star}</Descriptions.Item>
                                <Descriptions.Item label="评论数量">0</Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                        <div dangerouslySetInnerHTML={{
                            __html: content
                        }} style={{ border: '1px solid #333', margin: '0 24px' }}>
                        </div>
                    </>
                )
            }
        </div>

    )
}
