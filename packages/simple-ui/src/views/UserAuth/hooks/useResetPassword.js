import { useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import api from '../../../config/api';
import { showSuccess, decodeURLParams} from '../../../utils/common';
import { getRouter } from '../../../config/router';
import useMounted from '../../../hooks/useMounted';
import useMergedState from '../../../hooks/useMergedState';

const useResetPassword = () => {
  const [state, setState] = useMergedState({
    loading: false,
  });
  const isMounted = useMounted();
  const history = useHistory();
  const handleReset = useCallback((params) => {
    setState({
      loading: true,
    });
    const { token } = decodeURLParams(history.location.search);
    axios.post(api.auth.reset, { token, newPassword: params.Password })
      .then((data) => {
        if (isMounted.current) {
          setState({ loading: false });
          showSuccess((data && data.message) || 'Reset password successfully! Please login.');
          history.push(getRouter('login').pathname);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setState({ loading: false });
        }
      })
  }, [isMounted, setState, history]);
  return {
    ...state,
    handleReset,
  };
};

export default useResetPassword;