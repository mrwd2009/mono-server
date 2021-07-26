import { useCallback } from 'react';
import axios from 'axios';
import api from '../../../config/api';
import useMounted from '../../../hooks/useMounted';
import useMergedState from '../../../hooks/useMergedState';

const useForgotPassword = () => {
  const [state, setState] = useMergedState({
    loading: false,
    forgot: false,
  });
  const isMounted = useMounted();
  const handleForgot = useCallback((params) => {
    setState({
      loading: true,
    });
    axios.post(api.auth.forgot, params)
      .then(() => {
        if (isMounted.current) {
          setState({
            loading: false,
            forgot: true,
          });
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setState({
            loading: false,
          });
        }
      })
  }, [isMounted, setState]);
  return {
    ...state,
    handleForgot,
  };
};

export default useForgotPassword;