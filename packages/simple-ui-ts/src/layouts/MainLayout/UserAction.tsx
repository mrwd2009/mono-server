import { FC, memo, useState } from 'react';
import { Card, Popover, Avatar, Button, Spin } from 'antd';
import Icon, { CaretDownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectUserInfo } from '../../views/Auth/slices';
import { useLogout } from '../../views/Auth/hooks';
import { getRouteInfo } from '../../config/routes-info';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import { ReactComponent as EnergyIcon } from '../../assets/images/green-energy.svg';

const UserAction: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const { loading, handleLogout } = useLogout();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const actions = [
    <span
      role="button"
      key="setting"
      tabIndex={0}
      className="text-nowrap"
      onClick={() => {
        setVisible(false);
        navigate(getRouteInfo(['system', 'setting'])!.path);
      }}
    >
      &nbsp;
      <SettingOutlined />
      &nbsp;Setting
    </span>,
    <span
      role="button"
      key="logout"
      tabIndex={0}
      className="text-nowrap"
      onClick={handleLogout}
    >
      &nbsp;
      <LogoutOutlined />
      &nbsp;Sign Out
    </span>,
  ];
  const content = (
    <Spin spinning={loading}>
      <Card
        size="small"
        className="app-ex-user-action-content"
        bordered={false}
        actions={actions}
      >
        <Card.Grid className="app-ex-user-action-grid">
          <Card.Meta
            title={userInfo.username}
            avatar={
              <Avatar
                size={48}
                icon={<Icon component={EnergyIcon} />}
              />
            }
            description={userInfo.user}
          />
        </Card.Grid>
      </Card>
    </Spin>
  );
  return (
    <Popover
      content={content}
      placement="bottomRight"
      trigger="click"
      getPopupContainer={(node) => {
        return node.parentNode?.parentNode as HTMLElement;
      }}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <span className="app-ex-user-action">
        <Button
          type="primary"
          icon={<Icon component={UserIcon} />}
          shape="circle"
        />
        <CaretDownOutlined />
      </span>
    </Popover>
  );
};

export default memo(UserAction);
