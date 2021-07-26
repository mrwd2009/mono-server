import { useCallback } from 'react';
import axios from 'axios';
import api from '../../../config/api';
import useMounted from '../../../hooks/useMounted';
import useMergedState from '../../../hooks/useMergedState';

const useRegister = () => {
  const [state, setState] = useMergedState({
    loading: false,
    registered: false,
  });
  const isMounted = useMounted();
  const handleRegister = useCallback((params) => {
    setState({
      loading: true,
    });
    axios.post(api.auth.register, params)
      .then(() => {
        if (isMounted.current) {
          setState({
            loading: false,
            registered: true,
          });
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setState({
            loading: false,
          });
        }
      });
  }, [isMounted, setState]);
  return {
    ...state,
    handleRegister,
  };
};

export default useRegister;