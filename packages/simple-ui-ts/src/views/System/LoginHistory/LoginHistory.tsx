import { FC, memo, useEffect } from 'react';
import { TableColumnsType, Button, Row, Tooltip, Col, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import Panel from '../../../components/Panel';
import { useColumnSetting, ColumnSetting, ServerTable } from '../../../components/ServerTable';
import { useLoginHistory } from './hooks';

const getColumns = (): TableColumnsType<any> => {
  return [
    { title: 'Email', dataIndex: 'email', cFilterType: 'text' },
    // { title: 'Reset Password Sent At', dataIndex: 'reset_password_sent_at', cDataType: 'datetime' },
    { title: 'SSO Type', dataIndex: 'sso_env' },
    { title: 'Sign In IP', dataIndex: 'ip' },
    { title: 'User Agent', dataIndex: 'user_agent', cDataType: 'lgText' },
    { title: 'Website', dataIndex: 'referer', cDataType: 'lgText' },
    { title: 'Device Type', dataIndex: 'device_type' },
    { title: 'OS', dataIndex: 'os' },
    { title: 'Browser', dataIndex: 'browser' },
    { title: 'Timezone', dataIndex: 'timezone' },
    { title: 'Created At', dataIndex: 'created_at', sorter: true, cDataType: 'datetime' },
  ];
};

const LoginHistory: FC = () => {
  const {
    table,
    table: { refreshListRef },
  } = useLoginHistory();
  const { tableColumns, setting } = useColumnSetting('system-login-history', 'v1', getColumns());

  useEffect(() => {
    refreshListRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel title="Login History">
      <Row
        justify="end"
        className="mb-2"
      >
        <Col
          flex="none"
          style={{ height: 24 }}
        >
          <Space align="start">
            <Tooltip title="Refresh">
              <Button
                loading={table.loading}
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => refreshListRef.current?.()}
              />
            </Tooltip>
            <ColumnSetting setting={setting} />
          </Space>
        </Col>
      </Row>
      <ServerTable
        columns={tableColumns}
        table={table}
      />
    </Panel>
  );
};

export default memo(LoginHistory);
