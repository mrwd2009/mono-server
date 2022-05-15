import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo } from '../../../config/routes-info';

const useUnlockAccount = () => {
  const navigate = useNavigate();
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.unlockAccount, showError: true, method: 'post' });
  const { t } = useTranslation();
  const [searchParam] = useSearchParams();
  const token = searchParam.get('token');

  const handleUnlockAccount = useCallback(
    () => {
      request({
        data: {
          token,
        },
      }).then(() => {
        navigate(`${getRouteInfo('login')!.path}?success=${encodeURIComponent(t('auth.unlockSuccess'))}`);
      });
    },
    [navigate, request, t, token],
  );
  return {
    loading,
    handleUnlockAccount,
  };
};

export default useUnlockAccount;
