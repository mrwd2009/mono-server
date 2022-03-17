import { FC, memo } from 'react';
import { Switch, Tooltip } from 'antd';
import { ReactComponent as Sun } from '../../assets/images/theme-icon/sun.svg';
import { ReactComponent as Moon} from '../../assets/images/theme-icon/moon.svg';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectDarkMode, applyDarkTheme, applyDefaultTheme } from '../../store/slice';

const ThemeSwitch: FC = () => {
  const isDark = useAppSelector(selectDarkMode);
  const dispatch = useAppDispatch();

  return (
    <Tooltip title={`Dark Mode(${isDark ? 'On' : 'Off'})`}>
      <Switch
        checked={isDark}
        onChange={(checked) => {
          if (checked) {
            dispatch(applyDarkTheme());
          } else {
            dispatch(applyDefaultTheme());
          }
        }}
        className="app-ex-theme-switch"
        checkedChildren={<Moon />}
        unCheckedChildren={<Sun />}
      />
    </Tooltip>
  )
};

export default memo(ThemeSwitch);