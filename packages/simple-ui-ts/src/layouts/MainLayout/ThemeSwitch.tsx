import { FC, memo, useEffect } from 'react';
import { Switch, Tooltip } from 'antd';
import { ReactComponent as Sun } from '../../assets/images/theme-icon/sun.svg';
import { ReactComponent as Moon } from '../../assets/images/theme-icon/moon.svg';
import { useTheme } from '../../hooks';

const ThemeSwitch: FC = () => {
  const { loading, darkMode, fetchTheme } = useTheme();

  useEffect(() => {
    fetchTheme(darkMode);
  }, [darkMode, fetchTheme]);

  return (
    <Tooltip title={`Dark Mode(${darkMode ? 'On' : 'Off'})`}>
      <Switch
        loading={loading}
        checked={darkMode}
        onChange={(checked) => {
          if (checked) {
            fetchTheme(true);
          } else {
            fetchTheme(false);
          }
        }}
        className="app-ex-theme-switch"
        checkedChildren={<Moon />}
        unCheckedChildren={<Sun />}
      />
    </Tooltip>
  );
};

export default memo(ThemeSwitch);
