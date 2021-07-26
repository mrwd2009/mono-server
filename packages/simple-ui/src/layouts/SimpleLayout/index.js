import React, { memo } from 'react';
import { Row, Col } from 'antd';

const SimpleLayout = ({ children }) => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', width: '100%' }}>
      <Col span={24}>
        {children}
      </Col>
    </Row>
  )
};

export default memo(SimpleLayout);