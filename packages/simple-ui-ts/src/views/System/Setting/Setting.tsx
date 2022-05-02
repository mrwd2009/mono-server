import { FC, memo, useState } from 'react';
import { Menu, Row, Col } from 'antd';
import Panel from '../../../components/Panel';

const Setting: FC = () => {
  const [selectedKey, setSelectedKey] = useState('user-profile');
  return (
    <Panel title="Setting">
      <Row gutter={12}>
        <Col flex="200px">
          <Menu mode="inline" selectedKeys={[selectedKey]} onClick={(e) => setSelectedKey(e.key)}>
            <Menu.Item key="user-profile">User Profile</Menu.Item>
          </Menu>
        </Col>
        <Col flex="auto">test</Col>
      </Row>
    </Panel>
  );
};

export default memo(Setting);
