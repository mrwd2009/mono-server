import { useReducer, useCallback } from 'react';

export const useMergedState = (initial: any) => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'UPDATE': {
          return {
            ...prevState,
            ...action.payload,
          };
        }
        default: {
          return prevState;
        }
      }
    }, initial);

  const setState = useCallback(payload => dispatch({
    type: 'UPDATE',
    payload,
  }), [dispatch]);

  return [state, setState];
};

export default useMergedState;