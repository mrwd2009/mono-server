import { FC, memo, useEffect } from 'react';
import { TableColumnsType, Tag, Button, Spin, Menu, Dropdown } from 'antd';
import Panel from '../../../components/Panel';
import ServerTable from '../../../components/ServerTable';
import { useHookedModal } from '../../../components/HookedModal';
import UserForm from './UserForm';
import { useUser } from './hooks';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  TeamOutlined,
  LockOutlined,
  DownOutlined,
} from '@ant-design/icons';

const getColumns = (userFormModal: any, handleDelete: any): TableColumnsType<any> => {
  return [
    { title: 'Name', dataIndex: ['UserProfile', 'display_name'] },
    { title: 'Email', dataIndex: 'email', cFilterType: 'text' },
    { title: 'Role', dataIndex: 'roleName' },
    // { title: 'Reset Password Sent At', dataIndex: 'reset_password_sent_at', cDataType: 'datetime' },
    // { title: 'Confirmed At', dataIndex: 'confirmed_at', cDataType: 'datetime' },
    { title: 'Sign In Count', dataIndex: 'sign_in_count', align: 'right' },
    { title: 'Current Sign In At', dataIndex: 'current_sign_in_at', cDataType: 'datetime' },
    { title: 'Last Sign In At', dataIndex: 'last_sign_in_at', cDataType: 'datetime' },
    { title: 'Current Sign In IP', dataIndex: 'current_sign_in_ip' },
    { title: 'Last Sign In IP', dataIndex: 'last_sign_in_ip' },
    { title: 'Locked At', dataIndex: 'locked_at', cDataType: 'datetime' },
    // { title: 'Last Change Password At', dataIndex: 'last_change_pass_at', cDataType: 'datetime' },
    {
      title: ' Status',
      dataIndex: 'enabled',
      render: (enabled) => {
        if (enabled) {
          return (
            <Tag
              color="success"
              icon={<CheckCircleOutlined />}
            >
              Activated
            </Tag>
          );
        }
        return (
          <Tag
            color="error"
            icon={<CloseCircleOutlined />}
          >
            Deactivated
          </Tag>
        );
      },
    },
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
          enabled: row.enabled,
          displayName: row.UserProfile.display_name,
          roleId: row.RbacUserRoles[0]?.role_id,
        };
        const overlay = (
          <Menu>
            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </Menu.Item>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => userFormModal.changeVisible(true, data)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              key="password"
              icon={<LockOutlined />}
              onClick={() => userFormModal.changeVisible(true, { ...data, type: 'password' })}
            >
              Password
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown.Button
            overlay={overlay}
            icon={<DownOutlined />}
            size="small"
          >
            Action
          </Dropdown.Button>
        );
      },
    },
  ];
};

const User: FC = () => {
  const { loading, table, selectedKeys, setSelectedKeys, refreshTable, handleDelete } = useUser();
  const userFormModal = useHookedModal();

  useEffect(() => {
    refreshTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel title="Account List">
      <Spin spinning={loading}>
        <div className="table-action">
          <Button
            type="primary"
            className="mr-2"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => userFormModal.changeVisible(true, { type: 'add' })}
          >
            Add
          </Button>
          <Button
            disabled={!selectedKeys.length}
            size="small"
            className="mr-2"
            icon={<TeamOutlined />}
            onClick={() => userFormModal.changeVisible(true, { type: 'assignRole', id: selectedKeys })}
          >
            Assign Role
          </Button>
        </div>
        <ServerTable
          columns={getColumns(userFormModal, handleDelete)}
          table={table}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => {
              setSelectedKeys(keys as number[]);
            },
          }}
        />
        <UserForm
          hookedModal={userFormModal}
          onSubmitted={refreshTable}
        />
      </Spin>
    </Panel>
  );
};

export default memo(User);
