import { useCallback } from 'react';
import axios from 'axios';
import api from '../config/api';
import useMergedState from './useMergedState';
import useMounted from './useMounted';

const defaultState = {
  loading: false,
  systemErrorCount: 0,
  systemInfo: {},
};

const useGlobalInfo = () => {
  const [globalInfo, _setGlobalInfo] = useMergedState({
    ...defaultState,
    closeSystemErrorAlert: !!localStorage.getItem('closeSystemErrorAlert'),
  });

  const clearGlobalInfo = useCallback(() => {
    _setGlobalInfo(defaultState);
    localStorage.removeItem('closeSystemErrorAlert');
  }, [_setGlobalInfo]);

  const setGlobalInfo = useCallback((info) => {
    _setGlobalInfo(info);
    if ('closeSystemErrorAlert' in info) {
      localStorage.setItem('closeSystemErrorAlert', info.closeSystemErrorAlert ? 'true' : '');
    }
  }, [_setGlobalInfo]);

  const isMounted = useMounted();
  const { loading } = globalInfo;
  const fetchGlobalInfo = useCallback(() => {
    if (loading) {
      return;
    }
    setGlobalInfo({
      loading: true
    });
    axios.get(api.system.info)
      .then(data => {
        if (isMounted.current) {
          setGlobalInfo({
            loading: false,
            systemInfo: data,
          });
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setGlobalInfo({
            loading: false,
          });
        }
      });
  }, [isMounted, setGlobalInfo, loading]);

  return { globalInfo, setGlobalInfo, clearGlobalInfo, fetchGlobalInfo };
};

export default useGlobalInfo;