import { useReducer, useCallback } from 'react';

export const useMergedState = (initial) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
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