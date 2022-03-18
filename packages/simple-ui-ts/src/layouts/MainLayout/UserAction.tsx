import { FC, memo } from 'react';
import { Card, Popover, Avatar, Button, Spin } from 'antd';
import Icon, { CaretDownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks';
import { selectUserInfo } from '../../views/Auth/slice';
import { useLogout } from '../../views/Auth/hooks';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';

const UserAction: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const { loading, handleLogout } = useLogout();

  const actions = [
    <span
      role="button"
      key="setting"
      tabIndex={0}
      className="text-nowrap"
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
            title="User"
            avatar={<Avatar>{userInfo.user}</Avatar>}
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
