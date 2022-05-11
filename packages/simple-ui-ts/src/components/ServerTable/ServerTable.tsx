import { memo, useMemo } from 'react';
import dayjs from 'dayjs';
import { Table, TableProps, Input, Popover, InputNumber, AutoComplete, Select, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import { constants } from '../../config';

declare module 'antd/lib/table/interface' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnType<RecordType> {
    cFilterType?: 'text' | 'number' | 'select' | 'autoComplete';
    cDataType?: 'datetime' | 'lgText';
    cFilterOptions?: Array<{ label: string; value: string | number } | number | string>;
  }
}

const lgText = (title: string) => {
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
        value={msg}
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

export const getFileterDropdown = ({ cFilterType, cFilterOptions = [], title }: any) => {
  return ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
    let inputEle = null;
    // for different type inputs
    const handleChange = (event: any) => {
      let value = event;
      if (cFilterType === 'text') {
        value = event.target.value;
        if (!value) {
          return setSelectedKeys([]);
        }
      }
      if (cFilterType === 'number' && value === null) {
        return setSelectedKeys([]);
      }
      setSelectedKeys([value]);
    };
    const handlePressEnter = () => {
      confirm();
    };
    const inputProps = {
      className: 'mb-2 server-table-header-input',
      // size: 'small',
      value: selectedKeys[0] || '',
      placeholder: `Search ${title}`,
      onChange: handleChange,
    };
    // support [{label: 'label', value: 'value'}] and ['value1', 'value2'] formats;
    const getOptions = () => {
      return map(cFilterOptions, (option) => {
        if (isObject(option)) {
          return option;
        }
        return {
          label: option,
          value: option,
        };
      });
    };
    if (cFilterType === 'text') {
      inputEle = (
        <Input
          {...inputProps}
          onPressEnter={handlePressEnter}
        />
      );
    } else if (cFilterType === 'number') {
      inputEle = (
        <InputNumber
          {...inputProps}
          onPressEnter={handlePressEnter}
        />
      );
    } else if (cFilterType === 'select') {
      inputEle = (
        <Select
          {...inputProps}
          options={getOptions()}
        />
      );
    } else if (cFilterType === 'autoComplete') {
      inputEle = (
        <AutoComplete
          {...inputProps}
          options={getOptions()}
        />
      );
    }
    return (
      <div className="server-table-header-filter">
        {inputEle}
        <Row gutter={8}>
          <Col span={12}>
            <Button
              size="small"
              block
              onClick={() => {
                clearFilters({ closeDropdown: true, confirm: true });
              }}
            >
              Reset
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              size="small"
              block
              icon={<SearchOutlined />}
              onClick={() => confirm()}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
};

interface ServerTableProps extends TableProps<any> {
  table: any;
  showLoading?: boolean;
}

let ServerTable = ({
  table,
  rowKey = 'id',
  scroll = {},
  className = '',
  columns,
  pagination = {},
  showLoading = true,
  ...rest
}: ServerTableProps) => {
  const { sorter, page, pageSize, total, list, loading, onChange, rawPostData } = table;
  const { hasFixedCol, newColumns } = useMemo(() => {
    let _hasFixedCol = false;
    const _newColumns = columns!.map((col: any) => {
      let colDef = col;
      if (!_hasFixedCol && colDef.fixed) {
        _hasFixedCol = true;
      }
      if (colDef.sorter) {
        colDef = {
          ...colDef,
          sortOrder: sorter.field === colDef.dataIndex && sorter.order,
        };
      }

      // support for inline filter, native dropdown filter or custom filter
      if (colDef.dataIndex && (colDef.filters || colDef.cFilterType)) {
        const filter = (rawPostData && rawPostData.filter) || {};
        const filteredValue = filter[colDef.dataIndex] || [];
        // dropdown list for filter
        if (colDef.filters) {
          // default filter value should be 'null', otherwise hiding empty filter will trigger searching
          colDef.filteredValue = filteredValue.length ? filteredValue : null;
        } else if (colDef.cFilterType) {
          // avoid render temp selected key to be cleared
          colDef.filteredValue = filteredValue.length ? filteredValue : null;
          // colDef.filterIcon = (filtered: any) => <SearchOutlined style={{ color: filtered ? '#fff' : undefined, fontSize: '16px' }} />
          colDef.filterDropdown = getFileterDropdown(colDef);
        }
      }

      if (colDef.cDataType === 'datetime') {
        colDef.render = (val: any) => val && dayjs(val).format(constants.dateFormat);
      } else if (colDef.cDataType === 'lgText') {
        colDef.width = 100;
        colDef.render = lgText(colDef.title);
      }

      return colDef;
    });
    return {
      hasFixedCol: _hasFixedCol,
      newColumns: _newColumns,
    };
  }, [columns, sorter, rawPostData]);

  if (!scroll.x && !scroll.y && !hasFixedCol) {
    // show scrollbar if table width is larger than container
    className += 'overflow-server-table';
  }

  if (scroll.y == null && hasFixedCol) {
    // we can only make horizontal scroll function work as expected when y is not set
    className += ' scroll-v-server-table';
    scroll.x = 20;
  }

  let pageProps = {
    pageSize,
    current: page,
    total,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    ...pagination,
    // showQuickJumper: true
  };

  // hide pagination according to size changer
  if (!pageProps.showSizeChanger) {
    pageProps.hideOnSinglePage = true;
  }

  return (
    <Table
      className={`server-table nowrap-table ${className}`}
      bordered
      size="small"
      loading={showLoading && loading}
      rowKey={rowKey}
      columns={newColumns}
      dataSource={list}
      pagination={pageProps}
      onChange={onChange}
      scroll={scroll}
      {...rest}
    />
  );
};

export default memo(ServerTable);
