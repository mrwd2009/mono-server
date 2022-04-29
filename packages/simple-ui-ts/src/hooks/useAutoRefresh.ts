import { useEffect, useRef } from 'react';

type RefreshFn = () => void;

interface Opts {
  interval?: number;
  force?: boolean;
}

const useAutoRefresh = (fn: RefreshFn, dependencies: any[], options: Opts = {}) => {
  const visibleRef = useRef(true);
  const { interval = 30, force = false } = options;

  useEffect(() => {
    let timer: any = null;
    const refresh = () => {
      timer = setTimeout(() => {
        if (visibleRef.current || force) {
          fn();
        }
        refresh();
      }, interval * 1000);
    };
    refresh();
    return () => {
      clearTimeout(timer);
      timer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, interval, force]);

  useEffect(() => {
    const handleVisible = () => {
      if (document.visibilityState === 'hidden') {
        visibleRef.current = false;
      } else {
        visibleRef.current = true;
      }
    };
    document.addEventListener('visibilitychange', handleVisible);
    return () => {
      document.removeEventListener('visibilitychange', handleVisible);
    };
  }, []);
};

export default useAutoRefresh;
