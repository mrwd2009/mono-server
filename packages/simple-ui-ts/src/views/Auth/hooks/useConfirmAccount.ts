import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';

const useConfirmAccount = () => {
  const navigate = useNavigate();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.confirmAccount, showError: true, method: 'post' });
  const { t } = useTranslation();
  const [searchParam] = useSearchParams();
  const token = searchParam.get('token');

  const handleConfirmAccount = useCallback(() => {
    request({
      data: {
        token,
      },
    }).then(() => {
      navigate(`${getRouteInfo('login')!.path}?success=${encodeURIComponent(t('auth.confirmSuccess'))}`);
    });
  }, [navigate, request, t, token]);
  return {
    loading,
    handleConfirmAccount,
  };
};

export default useConfirmAccount;
