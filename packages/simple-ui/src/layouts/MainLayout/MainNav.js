import React, { memo } from 'react';
import { Menu, Badge } from 'antd';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import { useLocation, NavLink } from 'react-router-dom';
import { menuList } from '../../config/router';
import { useGlobalInfo } from '../../context/app';

const { Item: MenuItem } = Menu;

const MainNav = () => {
  const location = useLocation();
  const { globalInfo } = useGlobalInfo();
  const items = map(menuList, (menu) => {
    if (menu.badge) {
      return (
        <MenuItem key={menu.pathname}>
          <NavLink to={menu.pathname}>
            <Badge
              count={globalInfo[menu.badge.field] || 0}
              className="ant-menu-gridx__badge"
              style={{
                // todo support more style
                backgroundColor: menu.type === 'danger' ? '#C92B0D' : '#C92B0D',
              }}
            >
              {menu.title}
            </Badge>
          </NavLink>
        </MenuItem>
      );
    }
    return (
      <MenuItem key={menu.pathname}>
        <NavLink to={menu.pathname}>{menu.title}</NavLink>
      </MenuItem>
    );
  });
  let selectedKeys = [];
  forEach(menuList, (item) => {
    if (location.pathname.includes(item.pathname)) {
      selectedKeys.push(item.pathname);
      return false;
    }
  });
  return (
    <div className="ant-menu-gridx-wrapper">
      <Menu theme="gridx" mode="horizontal" selectedKeys={selectedKeys} >
        {items}
      </Menu>
    </div>
  );
};

export default memo(MainNav);