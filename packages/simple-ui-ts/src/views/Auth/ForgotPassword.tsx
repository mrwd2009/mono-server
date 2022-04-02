import { FC, memo } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';
import brand from '../../assets/images/brand.png';
import useForgotPassword from './hooks/useForgotPassword';

const registerRoute = getRouteInfo('register');

const ForgotPassword: FC = () => {
  const { loading, handleForgotPassword } = useForgotPassword();
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
          <Typography.Title>{t('forgotTitle')}</Typography.Title>
        </div>
        <p className="text-secondary">{t('forgotHelp')}</p>
        <Form
          layout="vertical"
          size="large"
          onFinish={handleForgotPassword}
        >
          <Form.Item
            label={t('email')}
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
              name="username"
              autoComplete="off"
              maxLength={50}
              placeholder={t('inputEmail')}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              {t('requestForgot')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(ForgotPassword);
