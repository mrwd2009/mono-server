import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../config/api-endpoints';
import { getRouteInfo, forEachRouteInfo } from '../../../config/routes-info';
import { useAppSelector } from '../../../hooks';
import { selectVisitedPages } from '../../../store/slices';
import { common } from '../../../util';

const notSavedPaths: string[] = [];
forEachRouteInfo((item) => {
  if (item.notSaveVisitedPage) {
    notSavedPaths.push(item.path);
  }
});

const useLogin = () => {
  const navigate = useNavigate();
  const visitedPages = useAppSelector(selectVisitedPages);
  const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.login, showError: true, method: 'post' });
  
  const handleLogin = useCallback(
    (params) => {
      request({
        data: {
          ...params,
          client: {
            deviceType: common.getDeviceType(),
            os: common.getOSName(),
            browser: common.getBrowser(),
            timeZone: common.getTimezone(),
          },
        },
      }).then(({ data: result }) => {
        const { token, reset } = result;
        if (reset) {
          navigate(`${getRouteInfo('reset-password')?.path}?token=${token}`);
          return;
        }
        const pages = filter(visitedPages, (page) => {
          return !includes(notSavedPaths, page.pathname);
        });
        const page = pages.pop();
        if (page) {
          navigate({
            pathname: page.pathname,
            search: page.search,
          });
        } else {
          navigate('/');
        }
      });
    },
    [navigate, request, visitedPages],
  );
  return {
    loading,
    handleLogin,
  };
};

export default useLogin;
