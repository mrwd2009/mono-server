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
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  return (
    <AuthLayout
      header={{
        help: t('notHaveAccount'),
        title: t('signUp'),
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
                message: t('requiredEmail'),
              },
            ]}
          >
            <Input
              id="username"
              name="username"
              type="email"
              autoComplete="on"
              maxLength={50}
              prefix={<UserOutlined style={{ marginRight: 4 }} />}
              placeholder={t('inputEmail')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t('requiredPassword'),
              },
            ]}
          >
            <Input.Password
              id="password"
              name="password"
              autoComplete="on"
              maxLength={50}
              prefix={<LockOutlined style={{ marginRight: 4 }} />}
              type="password"
              placeholder={t('inputPassword')}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              {t('logIn')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Link
              to={fogotRoute!.path}
              className="route-link"
            >
              {t('forgotPassword')}
            </Link>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(Login);
