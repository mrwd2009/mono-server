import * as React from 'react';

/** Similar with `useEffect` but only trigger after mounted */
export default function useUpdatedEffect(callback: () => void, conditions: any[]) {
  const mountRef = React.useRef(false);

  React.useEffect(() => {
    if (mountRef.current) {
      callback();
    } else {
      mountRef.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, conditions);
};
