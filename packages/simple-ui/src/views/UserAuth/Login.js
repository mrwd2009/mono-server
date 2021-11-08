import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getRouter } from '../../config/router';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Typography } from 'antd';
import useLogin from './hooks/useLogin';

const { Title } = Typography;

const Login = (props) => {
  const {
    loading,
    handleLogin,
  } = useLogin();
  return (
    <Card style={{ maxWidth: 360, margin: 'auto' }} className="login">
      <div className="login__logo-wrapper" style={{ textAlign: 'center' }}>
        <Logo title="SU Logo" className="login__logo" style={{ maxWidth: 80, margin: '24px auto 12px' }} />
        <Title style={{ fontSize: 16, color: '#7E8083', marginBottom: 32 }}>Simple UI</Title>
      </div>
      <Form onFinish={handleLogin}>
        <Form.Item name="Email" rules={[
          {
            required: true,
            type: 'email',
            message: 'Please provide your email',
          },
        ]}
        >
          <Input prefix={<UserOutlined style={{ marginRight: 4 }} />} placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item name="Password" rules={[
          {
            required: true,
            message: 'Please provide your password',
          },
        ]}>
          <Input.Password prefix={<LockOutlined style={{ marginRight: 4 }} />} type="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item style={{ marginBottom: 12 }}>
          <Button type="primary" htmlType="submit" className="login-form-button" size="large" block loading={loading}>Log in</Button>
        </Form.Item>
        <Link to={getRouter('register').pathname}>Register</Link>
        <Link to={getRouter('forgotPass').pathname} style={{ float: 'right' }}>Forgot password</Link>
      </Form>
    </Card>
  );
}

export default memo(Login);