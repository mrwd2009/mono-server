import { FC, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import map from 'lodash/map';
import { getRoutesMenu, RouteMenuInfo } from '../../config/routes-info';
import { useAppSelector, usePermission } from '../../hooks';
import { selectDarkMode } from '../../store/slices';

const { Item, SubMenu } = Menu;
const menuList = getRoutesMenu();

const getMenuItems = (list: RouteMenuInfo[], hasP: (p: string) => boolean) => {
  return map(list, (item) => {
    if (item.permission && !hasP(item.permission)) {
      return null;
    }
    if (item.children?.length) {
      return (
        <SubMenu
          key={item.path}
          title={item.title}
          popupClassName="app-ex-system-sub-menu"
        >
          {getMenuItems(item.children, hasP)}
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
  const { hasPermission } = usePermission();
  return (
    <Menu
      mode="horizontal"
      className="app-ex-system-menu"
      overflowedIndicatorPopupClassName="app-ex-system-sub-menu"
      selectedKeys={[location.pathname]}
      triggerSubMenuAction="click"
      theme={isDark ? 'dark' : 'light'}
      // getPopupContainer={(node) => {
      //   return node.parentNode?.parentNode as HTMLElement;
      // }}
    >
      {getMenuItems(menuList, hasPermission)}
    </Menu>
  );
};

export default memo(SystemMenu);
