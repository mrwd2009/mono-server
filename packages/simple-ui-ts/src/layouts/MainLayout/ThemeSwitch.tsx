import { FC, memo, useEffect } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as Auto } from '../../assets/images/theme-icon/os.svg';
import { ReactComponent as Sun } from '../../assets/images/theme-icon/sun.svg';
import { ReactComponent as Moon } from '../../assets/images/theme-icon/moon.svg';
import { useTheme } from '../../hooks';

const ThemeSwitch: FC = () => {
  const { loading, theme, fetchTheme } = useTheme();

  useEffect(() => {
    // change theme dinamically
    if (matchMedia && theme === 'auto') {
      const themeChange = (e: MediaQueryListEvent) => {
        fetchTheme('auto');
      };

      const mql = matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', themeChange);

      return () => {
        mql.removeEventListener('change', themeChange);
      };
    }
  }, [fetchTheme, theme]);

  const iconMap = {
    auto: <Icon component={Auto} />,
    default: <Icon component={Sun} />,
    dark: <Icon component={Moon} />,
  };

  const overlay = (
    <Menu
      selectedKeys={[theme]}
      onClick={({ key }) => {
        fetchTheme(key);
      }}
    >
      <Menu.Item
        key="auto"
        icon={iconMap.auto}
      >
        Auto
      </Menu.Item>
      <Menu.Item
        key="default"
        icon={iconMap.default}
      >
        Light
      </Menu.Item>
      <Menu.Item
        key="dark"
        icon={iconMap.dark}
      >
        Dark
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      trigger={['click']}
      overlay={overlay}
      getPopupContainer={(node) => {
        return node.parentNode?.parentNode as HTMLElement;
      }}
    >
      <Button
        loading={loading}
        size="small"
        type="text"
        icon={iconMap[theme]}
        className="app-ex-theme-switch"
      >
        Theme
      </Button>
    </Dropdown>
  );
};

export default memo(ThemeSwitch);
