import { FC, memo, useEffect } from 'react';
import { TableColumnsType, Tag, Tooltip, Button, Space, Spin } from 'antd';
import Panel from '../../../components/Panel';
import ServerTable from '../../../components/ServerTable';
import { useHookedModal } from '../../../components/HookedModal';
import UserForm from './UserForm';
import { useUser } from './hooks';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';


const getColumns = (userFormModal: any, handleDelete: any): TableColumnsType<any> => {
  return [
    { title: 'Email', dataIndex: 'email', cFilterType: 'text' },
    // { title: 'Reset Password Sent At', dataIndex: 'reset_password_sent_at', cDataType: 'datetime' },
    // { title: 'Confirmed At', dataIndex: 'confirmed_at', cDataType: 'datetime' },
    { title: 'Sign In Count', dataIndex: 'sign_in_count' },
    { title: 'Current Sign In At', dataIndex: 'current_sign_in_at', cDataType: 'datetime' },
    { title: 'Last Sign In At', dataIndex: 'last_sign_in_at', cDataType: 'datetime' },
    { title: 'Current Sign In IP', dataIndex: 'current_sign_in_ip' },
    { title: 'Last Sign In IP', dataIndex: 'last_sign_in_ip' },
    { title: 'Locked At', dataIndex: 'locked_at', cDataType: 'datetime' },
    // { title: 'Last Change Password At', dataIndex: 'last_change_pass_at', cDataType: 'datetime' },
    { title: 'Account Status', dataIndex: 'enabled', render: (enabled) => {
      if (enabled) {
        return <Tag color="success" icon={<CheckCircleOutlined />}>Enabled</Tag>
      }
      return <Tag color="error" icon={<CloseCircleOutlined />}>Disabled</Tag>
    }},
    { title: 'Updated At', dataIndex: 'updated_at', sorter: true, cDataType: 'datetime' },
    { title: 'Created At', dataIndex: 'created_at', sorter: true, cDataType: 'datetime' },
    {
      title: '',
      key: 'action',
      width: 30,
      fixed: 'right',
      render: (row: any) => {
        const data = {
          type: 'edit',
          id: row.id,
          email: row.email,
          displayName: row.UserProfile.display_name,
        };
        return  (
          <Space>
            <Tooltip title="Delete">
              <Button danger size="small" onClick={() => handleDelete(row.id)} icon={<DeleteOutlined />}  />
            </Tooltip>
            <Tooltip title="Edit">
              <Button size="small" onClick={() => userFormModal.changeVisible(true, data)} icon={<EditOutlined />}  />
            </Tooltip>
          </Space>
        );
      }
    }
  ];
};

const User: FC = () => {
  const { loading, table, refreshTable, handleDelete } = useUser();
  const userFormModal = useHookedModal();

  useEffect(() => {
    refreshTable();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel title="Account List">
      <Spin spinning={loading}>
        <div className="table-action">
          <Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => userFormModal.changeVisible(true, { type: 'add' })}>Add</Button>
        </div>
        <ServerTable
          columns={getColumns(userFormModal, handleDelete)}
          table={table}
        />
        <UserForm hookedModal={userFormModal} onSubmitted={refreshTable} />
      </Spin>
    </Panel>
  );
};

export default memo(User);
