import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Divider, Typography } from 'antd';
import { AmazonOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';
import brand from '../../assets/images/brand.png';
import useLogin from './hooks/useLogin';

const registerRoute = getRouteInfo('register');
const fogotRoute = getRouteInfo('forgot-password');

const Login: FC = () => {
  const { loading, handleLogin } = useLogin();
  const { t: gT } = useTranslation();
  return (
    <AuthLayout
      header={{
        help: "Don't have an account?",
        title: 'Sign up',
        path: registerRoute!.path,
      }}
    >
      <div className="app-ex-auth">
        <div className="app-ex-auth--logo">
          <img
            alt="Energix Logo"
            src={brand}
          />
          <Typography.Title>{gT('common.projectName')}</Typography.Title>
        </div>
        <Form
          size="large"
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please provide your email',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ marginRight: 4 }} />}
              placeholder="Enter your email address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please provide your password',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ marginRight: 4 }} />}
              type="password"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Log In
            </Button>
          </Form.Item>
          <Divider dashed />
          <Form.Item>
            <Button
              block
              htmlType="button"
              icon={<AmazonOutlined />}
            >
              Sign In with Amazon
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              block
              htmlType="button"
              icon={<GoogleOutlined />}
            >
              Sign In with Google
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              block
              htmlType="button"
              icon={<FacebookOutlined />}
            >
              Sign In with Facebook
            </Button>
          </Form.Item>
          <Form.Item>
            <Link
              to={fogotRoute!.path}
              className="route-link"
            >
              Forgot Password?
            </Link>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(Login);
