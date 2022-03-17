import { FC, memo } from 'react';
import { Switch, Tooltip } from 'antd';
import { ReactComponent as Sun } from '../../assets/images/theme-icon/sun.svg';
import { ReactComponent as Moon} from '../../assets/images/theme-icon/moon.svg';

const ThemeSwitch: FC = () => {
  return (
    <Tooltip title="Dark Mode">
      <Switch
        className="app-ex-theme-switch"
        checkedChildren={<Sun />}
        unCheckedChildren={<Moon />}
      />
    </Tooltip>
  )
};

export default memo(ThemeSwitch);