import React, { memo, useMemo } from 'react';
import { Table, Input, InputNumber, AutoComplete, Select, Row, Col, Button, Divider } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import useServerTable from './hooks/useServerTable';
import './index.less';

const getFileterDropdown = ({ cFilterType, cFilterOptions = [], title }) => {
  return ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
    let inputEle = null;
    // for different type inputs
    const handleChange = (event) => {
      let value = event;
      if (cFilterType === 'text') {
        value = event.target.value;
      }
      setSelectedKeys([value]);
    };
    const handlePressEnter = () => {
      confirm();
    };
    const inputProps = {
      className: 'mb-2 server-table-header-input',
      size: 'small',
      value: selectedKeys[0],
      placeholder: `Search ${title}`,
      onChange: handleChange,
    };
    // support [{label: 'label', value: 'value'}] and ['value1', 'value2'] formats;
    const getOptions = () => {
      return map(cFilterOptions, option => {
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
      inputEle = <Input {...inputProps} onPressEnter={handlePressEnter} />;
    } else if (cFilterType === 'number') {
      inputEle = <InputNumber {...inputProps} onPressEnter={handlePressEnter} />
    } else if (cFilterType === 'select') {
      inputEle = <Select {...inputProps} options={getOptions()} />;
    } else if (cFilterType === 'autoComplete') {
      inputEle = <AutoComplete {...inputProps} options={getOptions()} />;
    }
    return (
      <div className="server-table-header-filter">
        {inputEle}
        {/* <Row gutter={8}>
          <Col span={12}>
            <Button type="primary" size="small" block icon={<SearchOutlined />} onClick={() => confirm()}>Search</Button>
          </Col>
          <Col span={12}>
            <Button size="small" block onClick={() => clearFilters()}>Reset</Button>
          </Col>
        </Row> */}
        <Divider style={{ margin: '0 -8px 8px -8px', width: 'auto' }}/>
        <Row justify="space-between">
          <Col flex="none">
            <Button size="small" style={{ marginLeft: '-8px' }} type="link" disabled={!selectedKeys.length} onClick={() => clearFilters()}>Reset</Button>
          </Col>
          <Col flex="none">
            <Button type="primary" size="small" onClick={() => confirm()}>OK</Button>
          </Col>
        </Row>
      </div>
    );
  };
};

let ServerTable = ({table, rowKey = 'key', scroll = {}, className = '', columns, pagination = {}, showLoading = true, ...rest}) => {
  const {
    sorter,
    page,
    pageSize,
    total,
    list,
    loading,
    onChange,
    rawPostData,
  } = table;
  const {
    hasFixedCol,
    newColumns,
  } = useMemo(() => {
    let _hasFixedCol = false;
    const _newColumns = columns.map(col => {
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
          colDef.filteredValue = filteredValue;
          colDef.filterDropdown = getFileterDropdown(colDef);
        }
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

  if (!isEmpty(scroll)) {
    rest.scroll = scroll;
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
      {...rest}
    />
  );
};

ServerTable = memo(ServerTable);
ServerTable.useServerTable = useServerTable;

export default ServerTable;