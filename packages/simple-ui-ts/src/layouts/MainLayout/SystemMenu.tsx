import { FC, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import map from 'lodash/map';
import { getRoutesMenu, RouteMenuInfo } from '../../config/routes-info';
import { useAppSelector } from '../../hooks';
import { selectDarkMode } from '../../store/slices';

const { Item, SubMenu } = Menu;
const menuList = getRoutesMenu();

const getMenuItems = (list: RouteMenuInfo[]) => {
  return map(list, (item) => {
    if (item.children?.length) {
      return (
        <SubMenu
          key={item.path}
          title={item.title}
          popupClassName="app-ex-system-sub-menu"
        >
          {getMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Item key={item.path}>
        <Link to={item.path}>{item.title}</Link>
      </Item>
    );
  });
};

const SystemMenu: FC = () => {
  const location = useLocation();
  const isDark = useAppSelector(selectDarkMode);
  return (
    <Menu
      mode="horizontal"
      className="app-ex-system-menu"
      overflowedIndicatorPopupClassName="app-ex-system-sub-menu"
      selectedKeys={[location.pathname]}
      triggerSubMenuAction="click"
      theme={isDark ? 'dark' : 'light'}
      getPopupContainer={(node) => {
        return node.parentNode?.parentNode as HTMLElement;
      }}
    >
      {getMenuItems(menuList)}
    </Menu>
  );
};

export default memo(SystemMenu);
