import { FC, memo, useEffect } from 'react';
import { TableColumnsType, Button, Row, Tooltip, Col, Space, Input, Popover } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import Panel from '../../../components/Panel';
import { useColumnSetting, ColumnSetting, ServerTable } from '../../../components/ServerTable';
import { useLog } from './hooks';

const jsonRender = (title: string, isJson = true) => {
  return (msg: any) => {
    if (!msg || msg.length < 50) {
      return msg;
    }
    const content = (
      <Input.TextArea
        style={{ width: '300px' }}
        readOnly
        bordered={false}
        autoSize={{ maxRows: 6 }}
        value={isJson ? JSON.stringify(JSON.parse(msg), null, 2) : msg}
      />
    );
    return (
      <Popover
        content={content}
        title={title}
      >
        {msg.slice(0, 50)}...
      </Popover>
    );
  };
};

const getColumns = (): TableColumnsType<any> => {
  return [
    { title: 'Email', dataIndex: 'logUser', cFilterType: 'text' },
    { title: 'UUID', dataIndex: 'trackId', cFilterType: 'text' },
    {
      title: 'Response Time',
      dataIndex: 'durationMs',
      align: 'right',
      cFilterType: 'numberRange',
      render: (ms) => `${ms}ms`,
    },
    { title: 'Message', dataIndex: 'message', cDataType: 'lgText', cFilterType: 'text' },
    { title: 'Query String', dataIndex: 'query', cDataType: 'lgText' },
    { title: 'Request Body', dataIndex: 'body', render: jsonRender('Request Body') },
    { title: 'Calling Stack', dataIndex: 'stack', render: jsonRender('Calling Stack', false) },
    { title: 'Extra Info', dataIndex: 'remainedInfo', render: jsonRender('Extra Info') },
    { title: 'Created At', dataIndex: 'timestamp', sorter: true, cDataType: 'datetime', cFilterType: 'dateRange' },
  ];
};

interface Props {
  type: 'exception' | 'error' | 'info' | 'queue';
}

const Log: FC<Props> = ({ type }) => {
  const {
    table,
    table: { refreshListRef, search },
  } = useLog();
  const { tableColumns, setting } = useColumnSetting(`system-log-${type}`, 'v1', getColumns());
  useEffect(() => {
    refreshListRef.current?.({ search: { type } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labels = {
    exception: 'Crashed Log',
    error: 'Error Log',
    info: 'Access Log',
    queue: 'Queue Log',
  };

  return (
    <Panel title={labels[type]}>
      <Row
        justify="space-between"
        className="mb-2"
      >
        <Col
          flex="none"
          style={{ width: 300 }}
        >
          <Input.Search
            enterButton
            placeholder="Search log"
            allowClear
            onSearch={(val) => {
              refreshListRef.current?.({
                search: {
                  ...search,
                  type,
                  search: val,
                },
              });
            }}
          />
        </Col>
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

export default memo(Log);
