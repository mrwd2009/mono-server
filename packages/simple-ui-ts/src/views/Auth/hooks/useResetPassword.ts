import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';
import { showSuccess } from '../../../util';

const useResetPassword = () => {
  const navigate = useNavigate();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.resetPassword, showError: true, method: 'post' });
  const { t } = useTranslation();
  const [searchParam] = useSearchParams();
  const token = searchParam.get('token');

  const handleResetPassword = useCallback(
    (params) => {
      request({
        data: {
          ...params,
          token,
        },
      }).then(() => {
        showSuccess(t('auth.resetSuccess'));
        navigate(getRouteInfo('login')!.path);
      });
    },
    [navigate, request, t, token],
  );
  return {
    loading,
    handleResetPassword,
  };
};

export default useResetPassword;
