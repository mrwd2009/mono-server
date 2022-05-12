import { FC, memo, useEffect } from 'react';
import { TableColumnsType, Tag, Button, Menu, Dropdown } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  TeamOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Panel from '../../../components/Panel';
import ServerTable from '../../../components/ServerTable';
import { useHookedModal } from '../../../components/HookedModal';
import OAuth2UserForm from './OAuth2UserForm';
import { useOAuth2User } from './hooks';

const getColumns = (userFormModal: any): TableColumnsType<any> => {
  return [
    { title: 'Full Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email', cFilterType: 'text' },
    { title: 'Role', dataIndex: 'roleName' },
    {
      title: ' Status',
      dataIndex: 'enabled',
      filters: [
        {
          text: 'Activated',
          value: 1,
        },
        {
          text: 'Deactivated',
          value: 0,
        },
      ],
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
          name: row.name,
          roleId: row.RbacOAuth2UserRoles[0]?.role_id,
        };
        const items = [
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
          },
        ];
        const overlay = (
          <Menu
            items={items}
            onClick={(info) => {
              if (info.key === 'edit') {
                return userFormModal.changeVisible(true, data);
              }
            }}
          />
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

const OAuth2User: FC = () => {
  const { table, selectedKeys, setSelectedKeys, refreshTable } = useOAuth2User();
  const userFormModal = useHookedModal();

  useEffect(() => {
    refreshTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Panel title="Salesforce Account List">
      <div className="table-action">
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
        columns={getColumns(userFormModal)}
        table={table}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys) => {
            setSelectedKeys(keys as number[]);
          },
        }}
      />
      <OAuth2UserForm
        hookedModal={userFormModal}
        onSubmitted={refreshTable}
      />
    </Panel>
  );
};

export default memo(OAuth2User);
