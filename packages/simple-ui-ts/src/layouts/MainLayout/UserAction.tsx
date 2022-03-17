import { FC, memo } from 'react';
import { Card, Popover, Avatar, Button } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const UserAction: FC = () => {
  const actions = [
    <span role="button" key="setting" tabIndex={0}>
      <SettingOutlined />
      &nbsp;Setting
    </span>,
    <span role="button" key="logout" tabIndex={0}>
      <LogoutOutlined />
      &nbsp;Logout
    </span>
  ];
  const content = (
    <Card size="small" className="app-ex-user-action-content" bordered={false} actions={actions}>
      <Card.Grid className="app-ex-user-action-grid">
        <Card.Meta
          title="User"
          avatar={<Avatar>test@email.com</Avatar>}
          description={'test@email.com'}
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