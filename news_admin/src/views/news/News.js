import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';
import axios from 'axios'
import _ from 'lodash'
export default function News() {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category`)
      .then(res => {
        let datas = _.groupBy(res.data, item => item.category.title);
        let lists = Object.entries(datas);
        console.log(lists);
        setLists(lists)
      })
  }, [])
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="全球大新闻"
        subTitle="查看新闻"
      />
      <Row gutter={[16, 16]}>
        {
          lists.map(item => (
            <Col span={8} key={item[0]}>
              <Card title={item[0]} bordered={true} hoverable>
                <List
                  dataSource={item[1]}
                  pagination={{ pageSize: 3 }}
                  renderItem={(item) => (<List.Item>
                    <a href={`#/detail/${item.id}`}>{item.title}</a>
                  </List.Item>
                  )}
                />
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}
