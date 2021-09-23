import { useCallback, useRef } from 'react';
import axios from 'axios';
import useMergedState from '../../../hooks/useMergedState';
import useMounted from '../../../hooks/useMounted';

const useRemoteSelect = (url) => {
  const [state, setState] = useMergedState({
    list: [],
    total: 0,
    loading: false,
  });
  const cancelTokenRef = useRef(null);
  const isMounted = useMounted();
  const fetchList = useCallback((search) => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel();
    }
    setState({
      loading: true,
    });
    cancelTokenRef.current = axios.CancelToken.source();
    axios.post(url, {
      search,
    }, {
      cancelToken: cancelTokenRef.current.token,
    })
      .then(({list, total}) => {
        if (isMounted.current) {
          setState({
            list,
            total,
            loading: false,
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
  }, [isMounted, setState, url]);

  return {
    ...state,
    fetchList,
  };
};

export default useRemoteSelect;