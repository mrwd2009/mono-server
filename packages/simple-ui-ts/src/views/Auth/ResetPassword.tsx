import { FC, memo } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';
import brand from '../../assets/images/brand.png';
import useResetPassword from './hooks/useResetPassword';

const loginRoute = getRouteInfo('login');

const ResetPassword: FC = () => {
  const { loading, handleResetPassword } = useResetPassword();
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
          <Typography.Title>{t('resetTitle')}</Typography.Title>
        </div>
        <Form
          layout='vertical'
          size="large"
          onFinish={handleResetPassword}
        >
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
              maxLength={50}
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
              maxLength={50}
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
              {t('resetBtn')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(ResetPassword);
