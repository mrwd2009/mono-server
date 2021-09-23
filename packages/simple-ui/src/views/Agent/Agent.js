import React, { memo, useEffect } from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { useBC, useGlobalInfo } from '../../context/app';
import ServerTable from '../../components/ServerTable';
import useAgent from './hooks/useAgent';

const dateText = (cell) => {
  return cell && dayjs(cell).format('YYYY-MM-DD hh:mm a');
};

const getColumns = () => {
  return [
    { title: 'ID', dataIndex: 'id', sorter: true },
    { title: 'Name', dataIndex: 'name', cFilterType: 'text', sorter: true },
    { title: 'IP', dataIndex: 'ip', cFilterType: 'text', sorter: true },
    { title: 'Status', dataIndex: 'status', cFilterType: 'text', sorter: true },
    { title: 'Updated At', dataIndex: 'updated_at', sorter: true, render: dateText },
    { title: 'Created At', dataIndex: 'created_at', sorter: true, render: dateText },
  ];
};
const tableStateKey = 'table-agent-state';
const Agent = () => {
  useBC(['Server']);
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
  } = useAgent();
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
    if (isSearching('agent')) {
      return;
    }
    refreshListRef.current && refreshListRef.current(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSearching('agent')) {
      handleGlobalSearch();
    }
  }, [isSearching, handleGlobalSearch]);
  return (
    <Card title="Server">
      <ServerTable
        className="ant-table--listing"
        rowKey="id"
        columns={getColumns()}
        table={table}
      />
    </Card>
  );
};

export default memo(Agent);