import { FC, memo } from 'react';
import { Card, Popover, Avatar, Button } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks';
import { selectUserInfo } from '../../views/Auth/slice';

const UserAction: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);

  const actions = [
    <span role="button" key="setting" tabIndex={0} className="nowrap">
      &nbsp;
      <SettingOutlined />
      &nbsp;Setting
    </span>,
    <span role="button" key="logout" tabIndex={0} className="nowrap">
      &nbsp;
      <LogoutOutlined />
      &nbsp;Sign Out
    </span>
  ];
  const content = (
    <Card size="small" className="app-ex-user-action-content" bordered={false} actions={actions}>
      <Card.Grid className="app-ex-user-action-grid">
        <Card.Meta
          title="User"
          avatar={<Avatar>{userInfo.user}</Avatar>}
          description={userInfo.user}
        />
      </Card.Grid>
    </Card>
  )
  return (
    <Popover content={content} placement="bottomRight" trigger="click">
      <span className="app-ex-user-action">
        <Button type="primary" icon={<UserOutlined />} shape="circle" />
        <DownOutlined />
      </span>
    </Popover>
  );
};

export default memo(UserAction);