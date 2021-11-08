import { useCallback, useMemo } from 'react';
import useMounted from '../../../hooks/useMounted';
import useMergedState from '../../../hooks/useMergedState';

const useModelContainer = ({ onOk } = {}) => {
  const [state, setState] = useMergedState({
    visible: false,
    loading: false,
    value: null,
  });
  const {
    visible,
    loading,
    value,
  } = state;
  const isMounted = useMounted();
  const handleOpen = useCallback((val) => {
    setState({
      visible: true,
      value: val,
    });
  }, [setState]);
  const handleClose = useCallback(() => {
    setState({
      visible: false,
      value: null,
    });
  }, [setState]);
  const handleOk = useCallback((newValue) => {
    if (!onOk) {
      return setState({
        visible: false,
        value: null,
      });
    }
    setState({
      loading: true,
    });
    (onOk(newValue) || Promise.resolve())
      .then(() => {
        if (isMounted.current) {
          setState({
            visible: false,
            loading: false,
            value: null,
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
  }, [setState, isMounted, onOk]);

  const editor = useMemo(() => {
    return {
      visible,
      value,
      loading,
      handleOpen,
      handleClose,
      handleOk,
    };
  }, [visible, value, loading, handleOpen, handleClose, handleOk]);

  return editor;
};

export default useModelContainer;