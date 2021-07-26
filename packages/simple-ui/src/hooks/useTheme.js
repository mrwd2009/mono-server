import { useState, useCallback } from 'react';

const useTheme = () => {
  const [theme, _setTheme] = useState(() => {
    let initial = localStorage.getItem('theme');
    if (!initial) {
      // system supports dark mode
      if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
        initial = 'dark';
      } else {
        initial = 'light';
      }
    }
    return initial;
  });
  const setTheme = useCallback((newTheme) => {
    _setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.location.reload();
  }, []);

  // get less file according to theme
  const [loaded, setLoaded] = useState(false);
  const fetchTheme = useCallback((targetTheme) => {
    const html = document.documentElement;
    let getTheme = null;
    if (targetTheme === 'light') {
      html.dataset.theme = 'theme-light';
      getTheme = import('../assets/stylesheets/themes/gridx-light.less');
    } else {
      html.dataset.theme = 'theme-dark';
      getTheme = import('../assets/stylesheets/themes/gridx-dark.less');
    }
    return getTheme.then(() => {
      document.getElementById('loading-placeholder').remove();
      setLoaded(true);
    });
  }, []);
  return {
    loaded,
    theme,
    setTheme,
    fetchTheme,
  };
};

export default useTheme;