import React, { memo, useEffect } from 'react';
import { Card, Button } from 'antd';
import dayjs from 'dayjs';
import { useBC, useGlobalInfo } from '../../context/app';
import ServerTable from '../../components/ServerTable';
import useDeployment from './hooks/useDeployment';

const dateText = (cell) => {
  return cell && dayjs(cell).format('YYYY-MM-DD hh:mm a');
};

const getColumns = () => {
  return [
    { title: 'ID', dataIndex: 'id', sorter: true },
    { title: 'Server ID', dataIndex: 'agent_id', cFilterType: 'text', sorter: true },
    { title: 'Server Name', dataIndex: 'agent_name' },
    { title: 'Service ID', dataIndex: 'service_id', cFilterType: 'text', sorter: true },
    { title: 'Service Name', dataIndex: 'service_name' },
    { title: 'Status', dataIndex: 'status', cFilterType: 'text', sorter: true },
    { title: 'Updated At', dataIndex: 'updated_at', sorter: true, render: dateText },
    { title: 'Created At', dataIndex: 'created_at', sorter: true, render: dateText },
    {
      title: '',
      key: 'action',
      width: 30,
      fixed: 'right',
      render: (row) => {
        return (
          <Button size="small">Detail</Button>
        );
      }
    }
  ];
};
const tableStateKey = 'table-deployment-state';
const Deployment = () => {
  useBC(['Deployment']);
  const {
    table,
    table: {
      refreshListRef,
      search,
      sorter,
      page,
      pageSize,
    },
    isSearching,
    handleGlobalSearch,
  } = useDeployment();
  const { globalInfo, setGlobalInfo } = useGlobalInfo();
  const tableData = globalInfo[tableStateKey];
  useEffect(() => {
    setGlobalInfo({
      [tableStateKey]: {
        search,
        sorter: {
          field: sorter.field,
          order: sorter.order,
        },
        page,
        pageSize,
        keepPage: true,
      },
    });
  }, [search, sorter, page, pageSize, setGlobalInfo]);
  useEffect(() => {
    if (isSearching('deployment')) {
      return;
    }
    refreshListRef.current && refreshListRef.current(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSearching('deployment')) {
      handleGlobalSearch();
    }
  }, [isSearching, handleGlobalSearch]);

  useEffect(() => {
    const callback = () => {
      // if (process.env.NODE_ENV === 'development') {
      //   return;
      // }
      refreshListRef.current && refreshListRef.current({ background: true });
    };
    const timer = setInterval(callback, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [refreshListRef]);

  return (
    <Card title="Deployment">
      <ServerTable
        className="ant-table--listing"
        rowKey="id"
        columns={getColumns()}
        table={table}
      />
    </Card>
  );
};

export default memo(Deployment);