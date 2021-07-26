import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // componentDidCatch(error, info)
  // send error to server
  componentDidCatch() {
    this.setState(state => ({
      ...state,
      hasError: true,
    }));
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (hasError) {
      return (
        <div style={{display: 'table', width: '100%', minHeight: 'calc(100vh - 63px)'}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <Row>
              <Col span={8} offset={8} style={{textAlign: 'center'}}>
                <h1 style={{color: '#555', fontSize: '144px', fontWeight: 100, marginBottom: '16px'}}>500</h1>
                <h2 style={{ marginBottom: '24px'}}>Something's wrong here, we're fixing it.</h2>
                <Button type="primary" href="/" ghost><HomeOutlined /> Home</Button>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return children;
  }
}
