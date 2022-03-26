import { useState, useCallback, useMemo } from 'react';

export interface HookedModalInstance {
  visible: boolean,
  changeVisible: (vis: boolean, extra?: any) => void,
  data: any
}

const useHookedModal = (): HookedModalInstance => {
  const [state, setState] = useState({
    visible: false,
    data: {},
  });

  const {
    visible,
    data,
  } = state;

  const changeVisible = useCallback((vis: boolean, extraData: any = {}) => {
    setState({
      visible: vis,
      data: {
        ...extraData,
      },
    });
  }, []);

  const hookedModal = useMemo(() => {
    return {
      visible,
      changeVisible,
      data,
    };
  }, [visible, changeVisible, data]);

  return hookedModal;
};

export default useHookedModal;