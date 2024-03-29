import { useState, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import useAppSelector from './useAppSelector';
import useMounted from './useMounted';
import { getOSTheme } from '../util';
import { selectTheme } from '../store/slices';
import useAppDisatch from './useAppDispatch';
import { applyDarkTheme, applyDefaultTheme } from '../store/slices';

let defaultTheme: any;
let darkTheme: any;

const clearPlaceholder = () => {
  document.getElementById('loading-placeholder')?.remove();
};

const useTheme = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const usedTheme = useAppSelector(selectTheme);
  const isMounted = useMounted();
  const dispatch = useAppDisatch();

  const fetchTheme = useCallback(
    (theme: string) => {
      let isDark = false;
      let isAuto = false;
      if (theme === 'auto') {
        isAuto = true;
        isDark = getOSTheme() === 'dark';
      } else {
        isDark = theme === 'dark';
      }

      if (isDark) {
        if (defaultTheme && darkTheme) {
          defaultTheme.unuse();
          darkTheme.use();
          dispatch(applyDarkTheme(isAuto));
        } else {
          setLoading(true);
          import('../assets/stylesheets/dark.less')
            .then((theme) => {
              if (isMounted.current) {
                if (defaultTheme) {
                  defaultTheme.unuse();
                }
                darkTheme = theme.default;
                darkTheme.use();
                unstable_batchedUpdates(() => {
                  dispatch(applyDarkTheme(isAuto));
                  setLoading(false);
                  setLoaded(true);
                  clearPlaceholder();
                });
              }
            })
            .catch(() => {
              if (isMounted.current) {
                setLoading(false);
              }
            });
        }
      } else {
        if (darkTheme && defaultTheme) {
          darkTheme.unuse();
          defaultTheme.use();
          dispatch(applyDefaultTheme(isAuto));
        } else {
          setLoading(true);
          import('../assets/stylesheets/default.less')
            .then((theme) => {
              if (isMounted.current) {
                if (darkTheme) {
                  darkTheme.unuse();
                }
                defaultTheme = theme.default;
                defaultTheme.use();
                unstable_batchedUpdates(() => {
                  dispatch(applyDefaultTheme(isAuto));
                  setLoading(false);
                  setLoaded(true);
                  clearPlaceholder();
                });
              }
            })
            .catch(() => {
              if (isMounted.current) {
                setLoading(false);
              }
            });
        }
      }
    },
    [isMounted, dispatch],
  );

  return {
    loading,
    loaded,
    theme: usedTheme,
    fetchTheme,
  };
};

export default useTheme;
