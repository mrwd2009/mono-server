import { FC, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import forEach from 'lodash/forEach';
import { getRoutesMenu, RouteMenuInfo } from '../../config/routes-info';
import { useAppSelector, usePermission } from '../../hooks';
import { selectDarkMode } from '../../store/slices';

const menuList = getRoutesMenu();

const getMenuItems = (list: RouteMenuInfo[], hasP: (p: string) => boolean) => {
  let items: any = [];
  forEach(list, (item) => {
    if (item.permission && !hasP(item.permission)) {
      return;
    }
    if (item.children?.length) {
      items.push({
        key: item.path,
        label: item.title,
        popupClassName: 'app-ex-system-sub-menu',
        children: getMenuItems(item.children, hasP),
      });
      return;
    }
    items.push({
      key: item.path,
      label: <Link to={item.path}>{item.title}</Link>,
    });
  });

  return items;
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
      items={getMenuItems(menuList, hasPermission)}
    />
  );
};

export default memo(SystemMenu);
