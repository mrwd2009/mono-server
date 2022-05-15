import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';

const useRegister = () => {
  const navigate = useNavigate();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.register, showError: true, method: 'post' });
  const { t } = useTranslation();
  const handleRegister = useCallback(
    (params) => {
      request({
        data: params,
      }).then(() => {
        navigate(`${getRouteInfo('login')!.path}?success=${encodeURIComponent(t('auth.sendEmailSuccess'))}`);
      });
    },
    [navigate, request, t],
  );
  return {
    loading,
    handleRegister,
  };
};

export default useRegister;
