import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Divider, Typography, Checkbox } from 'antd';
import Icon, { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { baseURL, apiEndpoints } from '../../config/api-endpoints';
import { ReactComponent as SalesforceIcon } from '../../assets/images/salesforce.svg';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';
import brand from '../../assets/images/brand.png';
import useLogin from './hooks/useLogin';

const { useForm } = Form;
const registerRoute = getRouteInfo('register');
const fogotRoute = getRouteInfo('forgot-password');
const checkedKey = 'app-ex-login-remember';
const savedKey = 'app-ex-login-email';
const Login: FC = () => {
  const { loading, handleLogin } = useLogin();
  const { t: gT } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [form] = useForm();
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
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (values.remember) {
              localStorage.setItem(savedKey, values.email);
              localStorage.setItem(checkedKey, 'true');
            } else {
              localStorage.removeItem(savedKey);
              localStorage.removeItem(checkedKey);
            }
            handleLogin(values);
          }}
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
            initialValue={localStorage.getItem(savedKey)}
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
          <Form.Item
            name="remember"
            noStyle
            valuePropName="checked"
            initialValue={!!localStorage.getItem(checkedKey)}
          >
            <Checkbox
              onChange={(event) => {
                if (!event.target.checked) {
                  localStorage.removeItem(savedKey);
                  localStorage.removeItem(checkedKey);
                } else {
                  localStorage.setItem(savedKey, form.getFieldValue('email'));
                  localStorage.setItem(checkedKey, 'true');
                }
              }}
            >
              Remember me
            </Checkbox>
          </Form.Item>
          <Divider
            className="app-ex-divider-sm"
            dashed
          />
          <Form.Item>
            <Button
              block
              htmlType="button"
              href={`${baseURL}${apiEndpoints.auth.salesforceAuthorize}`}
              icon={<Icon component={SalesforceIcon} />}
            >
              Sign In with Salesforce
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
