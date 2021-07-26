import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const NotFound = () => {
  const history = useHistory();
  return (
    <div style={{display: 'table', width: '100%', minHeight: '400px'}}>
      <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
        <Row>
          <Col span={8} offset={8} style={{textAlign: 'center'}}>
            <h1 style={{color: '#555', fontSize: '144px', fontWeight: 100, marginBottom: '16px'}}>404</h1>
            <h2 style={{ marginBottom: '24px'}}>Sorry, the page you visited does not exist.</h2>
            <Button type="primary" ghost icon={<HomeOutlined />} onClick={() => history.push('/')} >Home</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(NotFound);