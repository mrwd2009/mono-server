import { FC, memo, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import Panel from '../../../components/Panel';
import UserProfile from './UserProfile';

const Setting: FC = () => {
  const [selectedKey, setSelectedKey] = useState('user-profile');
  let content: any = null;
  if (selectedKey === 'user-profile') {
    content = <UserProfile />;
  }
  return (
    <Panel title="Setting">
      <Row gutter={12}>
        <Col flex="200px">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            items={[
              {
                key: 'user-profile',
                label: 'User Profile',
              },
            ]}
          />
        </Col>
        <Col flex="auto">{content}</Col>
      </Row>
    </Panel>
  );
};

export default memo(Setting);
