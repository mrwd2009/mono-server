import { FC, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import map from 'lodash/map';
import { getRoutesMenu, RouteMenuInfo } from '../../config/routes-info'

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
    )
  });
};

const SystemMenu: FC = () => {
  const location = useLocation();
  return (
    <Menu mode="horizontal" className="app-ex-system-menu" selectedKeys={[location.pathname]} triggerSubMenuAction="click">
      {getMenuItems(menuList)}
    </Menu>
  );
};

export default memo(SystemMenu);