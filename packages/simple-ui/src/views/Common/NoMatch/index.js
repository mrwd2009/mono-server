import React from 'react';
import { Button, Icon, Row, Col } from 'antd';

export default () => (
  <div style={{display: 'table', width: '100%', minHeight: 'calc(100vh - 63px)'}}>
    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
      <Row>
        <Col span={8} offset={8} style={{textAlign: 'center'}}>
          <h1 style={{color: '#555', fontSize: '144px', fontWeight: 100, marginBottom: '16px'}}>404</h1>
          <h2 style={{ marginBottom: '24px'}}>We can't find the page you're looking for.Head back to home</h2>
          <Button type="primary" href="/" ghost><Icon type="home" /> Home</Button>
        </Col>
      </Row>
    </div>
  </div>
)
