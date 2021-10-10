import React, { memo, useEffect } from 'react';
import { Card, Input, Popover, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useBC, useGlobalInfo } from '../../context/app';
import ServerTable from '../../components/ServerTable';
import Editor from './Editor';
import useService from './hooks/useService';
import useEditor from './hooks/useEditor';
import Assign from './Assign';

const dateText = (cell) => {
  return cell && dayjs(cell).format('YYYY-MM-DD hh:mm a');
};
const lgText = (title) => {
  return (msg) => {
    if (!msg || msg.length < 40) {
      return msg;
    }
    const content = <Input.TextArea style={{ width: '300px'}} readOnly bordered={false} autoSize={{ maxRows: 6 }} value={msg} />;
    return <Popover content={content} title={title}>{msg.slice(0, 40)}...</Popover>;
  };
};

const getColumns = ({ openAssign }) => {
  return [
    { title: 'ID', dataIndex: 'id', sorter: true },
    { title: 'Name', dataIndex: 'name', cFilterType: 'text', sorter: true },
    { title: 'Category', dataIndex: 'category', cFilterType: 'text', sorter: true },
    { title: 'Description', dataIndex: 'description', cFilterType: 'text', sorter: true, render: lgText('Description') },
    { title: 'Updated At', dataIndex: 'updated_at', sorter: true, render: dateText },
    { title: 'Created At', dataIndex: 'created_at', sorter: true, render: dateText },
    {
      title: '',
      key: 'action',
      width: 30,
      fixed: 'right',
      render: (row) => {
        return (
          <Space>
            <Button size="small" type="primary">Deploy</Button>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={() => openAssign(row.id)}>Server</Button>
            <Button size="small" type="danger">Delete</Button>
          </Space>
        );
      }
    }
  ];
};
const tableStateKey = 'table-service-state';
const Service = () => {
  useBC(['Service']);
  const {
    table,
    table: {
      refreshListRef,
      search,
      sorter,
      page,
      pageSize,
    },
    assign,
    openAssign,
    isSearching,
    handleGlobalSearch,
  } = useService();
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
    if (isSearching('service')) {
      return;
    }
    refreshListRef.current && refreshListRef.current(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSearching('service')) {
      handleGlobalSearch();
    }
  }, [isSearching, handleGlobalSearch]);

  const editor = useEditor();
  return (
    <Card title="Service" extra={<Button type="primary" icon={<PlusOutlined />} onClick={editor.openNewEditor}>Add</Button>}>
      <ServerTable
        className="ant-table--listing"
        rowKey="id"
        columns={getColumns({ openAssign })}
        table={table}
      />
      <Assign assign={assign} />
      <Editor editor={editor} />
    </Card>
  );
};

export default memo(Service);