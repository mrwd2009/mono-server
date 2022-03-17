import { useState, useCallback } from 'react';
import useAppSelector from "./useAppSelector";
import useMounted from './useMounted';
import { selectDarkMode } from "../store/slice";

let defaultTheme: any;
let darkTheme: any;
let isCurrentDark: any;

const clearPlaceholder = () => {
  document.getElementById('loading-placeholder')?.remove();
};

const useTheme = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const darkMode = useAppSelector(selectDarkMode);
  const isMounted = useMounted();

  const fetchTheme = useCallback((isDark) => {
    if (isCurrentDark === isDark) {
      return;
    }
    isCurrentDark = isDark;
    
    if (isDark) {
      if (defaultTheme && darkTheme) {
        defaultTheme.unuse();
        darkTheme.use();
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
              setLoading(false);
              setLoaded(true);
              clearPlaceholder();
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
              setLoading(false);
              setLoaded(true);
              clearPlaceholder();
            }
          })
          .catch((error) => {
            console.log(error);
            if (isMounted.current) {
              setLoading(false);
            }
          });
      }
    }
  }, [isMounted]);


  return {
    loading,
    loaded,
    darkMode,
    fetchTheme,
  };
};

export default useTheme;