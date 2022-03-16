import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';

const Login: FC = () => {
  return (
    <AuthLayout>
      <div className="app-ex-auth-login">
        <h3 className="app-ex-auth-login--title">Log in to your account</h3>
        <Form size="large">
          <Form.Item name="Email" rules={[
            {
              required: true,
              type: 'email',
              message: 'Please provide your email',
            },
          ]}
          >
            <Input prefix={<UserOutlined style={{ marginRight: 4 }} />} placeholder="Enter your email address" />
          </Form.Item>
          <Form.Item name="Password" rules={[
            {
              required: true,
              message: 'Please provide your password',
            },
          ]}>
            <Input.Password prefix={<LockOutlined style={{ marginRight: 4 }} />} type="password" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Log In</Button>
          </Form.Item>
          <Divider />
          <Form.Item>
          <Button block htmlType="button">Sign In with Google</Button>
          </Form.Item>
          <Form.Item>
          <Button block htmlType="button">Sign In with Facebook</Button>
          </Form.Item>
          <Form.Item>
          <Button block htmlType="button">Sign In with Salesforce</Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default memo(Login);