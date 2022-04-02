import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';
import { showSuccess } from '../../../util';

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.forgotPassword, showError: true, method: 'post' });
  const { t } = useTranslation();

  const handleForgotPassword = useCallback(
    (params) => {
      request({
        data: params,
      }).then(() => {
        showSuccess(t('auth.sendEmailSuccess'));
        navigate(getRouteInfo('login')!.path);
      });
    },
    [navigate, request, t],
  );
  return {
    loading,
    handleForgotPassword,
  };
};

export default useForgotPassword;
