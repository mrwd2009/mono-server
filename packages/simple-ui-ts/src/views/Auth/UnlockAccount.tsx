import { FC, memo, useEffect } from 'react';
import { Form, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getRouteInfo } from '../../config/routes-info';
import AuthLayout from '../../layouts/AuthLayout';
import brand from '../../assets/images/brand.png';
import useUnlockAccount from './hooks/useUnlockAccount';

const loginRoute = getRouteInfo('login');

const UnlockAccount: FC = () => {
  const { loading, handleUnlockAccount } = useUnlockAccount();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  useEffect(() => {
    handleUnlockAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <Typography.Title>{t('unlockTitle')}</Typography.Title>
        </div>
        <Form
          layout="vertical"
          size="large"
          onFinish={handleUnlockAccount}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              {t('unlockBtn')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Link
              to={loginRoute!.path}
              className="route-link"
            >
              {t('backToLogin')}
            </Link>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(UnlockAccount);
