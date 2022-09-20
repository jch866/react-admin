import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, List, Layout, Avatar, Drawer } from 'antd';
import axios from 'axios';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as Echarts from 'echarts'
import _ from 'lodash'
const { Meta } = Card;
const { Header, Sider, Content } = Layout;
const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'));
export default function Home() {
  const [starList, setStarList] = useState([])
  const [allList, setAllList] = useState([])
  const [viewList, setViewList] = useState([])
  const [visible, setVisible] = useState(false)
  const [pieChart, setPieChart] = useState(null)
  const barRef = useRef();
  const pieRef = useRef();
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`)
      .then(res => {
        setViewList(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`)
      .then(res => {
        setStarList(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category`)
      .then(res => {
        // console.log(res.data);
        let datas = _.groupBy(res.data, item => item.category.title);
        renderBar(datas)
        setAllList(res.data)
      })
    return () => {
      window.resize = null
    }

  }, [])
  const renderBar = (obj) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = Echarts.init(barRef.current)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: '50',
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = () => {
      myChart.resize();
    }
  }
  const renderPie = (obj) => {
    let currentlist = allList.filter(item=>item.author===username);
    let groupObj = _.groupBy(currentlist,item=>item.category.title);
    console.log(groupObj);
    let list = [];
    for(let i in groupObj){
      list.push({
        name:i,
        value:groupObj[i].length
      })
    }
    console.log(list)
    var myChart;
    if (!pieChart) {
      myChart = Echarts.init(pieRef.current);
      setPieChart(myChart)
    } else {
      myChart = pieChart
    }
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: '当前用户新闻分类图示',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              // bordered
              dataSource={viewList}
              renderItem={(item) => (<List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              dataSource={starList}
              renderItem={(item) => (<List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={() => {
                setVisible(true)
                setTimeout(() => {
                  //dom渲染异步问题
                  renderPie()
                }, 0)
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={<div><b>{region || '全球'}</b><span>{roleName}</span></div>}
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="个人新闻分类" closable={true} placement="right"
        onClose={() => {
          setVisible(false)
        }} width='500px' open={visible}>
        <div ref={pieRef} style={{
          height: '400px',
          width: '100%',
          marginTop: "30px"
        }}></div>
      </Drawer>

      <div ref={barRef} style={{
        height: '400px',
        width: '100%',
        marginTop: "30px"
      }}></div>
    </>
  )
}
