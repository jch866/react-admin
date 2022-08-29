import React, { Component } from 'react'
import { Button, Col, Row } from 'antd';


export default class App extends Component {

    style = {
        background: '#0092ff',
        padding: '8px 0',
      };
    render() {
        return (
            <>
                <Button type="primary" shape="round" onClick={(event) => {
                    console.log(event)
                    alert(11)
                }}>antdButton</Button>
                <Row>
                    <Col span={8} style={this.style}>col-8</Col>
                    {/* 往右移动8个单位  offset={8} */}
                    <Col span={8}  style={this.style} offset={8}>
                        col-8
                    </Col>
                </Row>
            </>
        )
    }
}
