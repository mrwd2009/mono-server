import { FC, memo, useEffect } from 'react';
import { TableColumnsType } from 'antd';
import Panel from '../../../components/Panel';
import ServerTable from '../../../components/ServerTable';
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

  useEffect(() => {
    refreshListRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel title="Login History">
      <ServerTable
        columns={getColumns()}
        table={table}
      />
    </Panel>
  );
};

export default memo(LoginHistory);
