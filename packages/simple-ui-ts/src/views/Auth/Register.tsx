import { FC, memo } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';
import brand from '../../assets/images/brand.png';
import useRegister from './hooks/useRegister';

const loginRoute = getRouteInfo('login');

const Register: FC = () => {
  const { loading, handleRegister } = useRegister();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  return (
    <AuthLayout
      header={{
        help: t('alreadyHasAccount'),
        title: t('signIn'),
        path: loginRoute!.path,
      }}
    >
      <div className="app-ex-auth">
        <div className="app-ex-auth--logo">
          <img
            alt="Energix Logo"
            src={brand}
          />
          <Typography.Title>{t('registerTitle')}</Typography.Title>
        </div>
        <Form
          layout='vertical'
          size="large"
          onFinish={handleRegister}
        >
          <Form.Item
            label={t('fullName')}
            name="displayName"
            rules={[
              {
                required: true,
                message: t('requiredName'),
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder={t('inputName')}
            />
          </Form.Item>
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
              id="username"
              name="username"
              autoComplete="off"
              placeholder={t('inputEmail')}
            />
          </Form.Item>
          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('requiredPassword'),
              },
              {
                validator: (rule, value, callback) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (value.length >= 11
                    && /[A-Z]+/.test(value)
                    && /[a-z]+/.test(value)
                    && /[0-9]+/.test(value)
                    && /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+/.test(value)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t('passwordHelp'));
                },
              }
            ]}
          >
            <Input.Password
              id="password"
              name="password"
              autoComplete="off"
              type="password"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item
            label={t('passConfirmation')}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: t('requiredPassConfirm'),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t('errorPassConfirm'));
                },
              }),
            ]}
          >
            <Input.Password
              id="confirm"
              name="confirm"
              autoComplete="off"
              type="password"
              placeholder={t('inputConfirmation')}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              {t('signUp')}
            </Button>
          </Form.Item>
          <p className="text-secondary">{t('registerWarn')}</p>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(Register);
