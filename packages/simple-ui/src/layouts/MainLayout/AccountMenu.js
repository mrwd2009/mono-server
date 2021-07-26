import React, { memo } from 'react';
import { Menu, Avatar, Switch } from 'antd';
import { LogoutOutlined, FormatPainterOutlined, UserOutlined } from '@ant-design/icons';
import { useApp } from '../../context/app';
import { useAuth } from '../../context/auth';

const { SubMenu } = Menu;
const AccountMenu = () => {
  const {
    theme,
    setTheme,
  } = useApp();
  const {
    logout,
  } = useAuth();
  const handleThemeChange = (val) => {
    if (val) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <Menu theme="gridx" className="has-no-hover-border" mode="horizontal">
      <SubMenu key="dropdown" title={
        <Avatar 
          icon={<UserOutlined style={{ color: 'rgba(255,255,255, 0.8)' }} />}
          style={{ backgroundColor: 'rgba(78,79,86, 0.2)' }}
        />
      }>
        <Menu.Item key="mode" icon={<FormatPainterOutlined />}>Dark Mode &nbsp;<Switch checked={theme === 'dark'} onChange={handleThemeChange} /></Menu.Item>
        <Menu.Divider />
        <Menu.Item key="action" icon={<LogoutOutlined />} onClick={logout}>Sign out</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default memo(AccountMenu);