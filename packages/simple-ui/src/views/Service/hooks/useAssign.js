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
  });

  const {
    visible,
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

  const handleChange = useCallback((...args) => {
    console.log(args);
  }, []);

  return {
    visible,
    leftTable,
    rightTable,
    handleClose,
    setVisible,
    handleChange,
  };
};

export default useAssign;