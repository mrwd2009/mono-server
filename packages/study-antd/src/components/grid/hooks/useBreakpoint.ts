import { useEffect, useRef } from 'react';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import ResponsiveObserve, { ScreenMap } from '../../_util/responsiveObserve';

function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
  const screensRef = useRef<ScreenMap>({});
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const token = ResponsiveObserve.subscribe(supportScreens => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });

    return () => ResponsiveObserve.unsubscribe(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return screensRef.current;
}

export default useBreakpoint;