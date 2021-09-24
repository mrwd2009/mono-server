import { useCallback, useRef } from 'react';
import api from '../../../config/api';
import axios from 'axios';
import useMounted from '../../../hooks/useMounted';
import useMergedState from '../../../hooks/useMergedState';
import useServerTable from '../../../components/ServerTable/hooks/useServerTable';

const useAssign = (assign) => {
  const { service_id } = assign || {};
  const serviceIdRef = useRef(service_id);
  serviceIdRef.current = service_id;

  const {
    table: leftTable,
  } = useServerTable(() => {
    return {
      table: {
        url: api.service.agentList,
        beforeRequest: (postData) => {
          return {
            ...postData,
            direction: 'left',
            service_id: serviceIdRef.current,
          };
        },
      },
    };
  });

  const {
    table: rightTable,
  } = useServerTable(() => {
    return {
      table: {
        url: api.service.agentList,
        beforeRequest: (postData) => {
          return {
            ...postData,
            direction: 'right',
            service_id: serviceIdRef.current,
          };
        },
      },
    };
  });

  const [state, setState] = useMergedState({
    visible: false,
    loading: false,
  });

  const {
    visible,
    loading,
  } = state;

  const handleClose = useCallback(() => {
    setState({
      visible: false,
    });
  }, [setState]);

  const setVisible = useCallback((vis) => {
    setState({
      visible: vis,
      step: 0,
    });
  }, [setState]);

  const isMounted = useMounted();

  const {
    refreshListRef: refreshLeft,
  } = leftTable;
  const {
    refreshListRef: refreshRight,
  } = rightTable;
  const handleChange = useCallback((_, direction, ids) => {
    const action = direction === 'left' ? 'remove' : 'add';
    setState({
      loading: true,
    });
    axios.post(api.service.assign, {
      action,
      serviceId: service_id,
      agentIds: ids,
    })
      .then(() => {
        if (isMounted.current) {
          refreshLeft.current();
          refreshRight.current();
          setState({
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
  }, [isMounted, setState, service_id, refreshLeft, refreshRight]);

  return {
    visible,
    loading,
    leftTable,
    rightTable,
    handleClose,
    setVisible,
    handleChange,
  };
};

export default useAssign;