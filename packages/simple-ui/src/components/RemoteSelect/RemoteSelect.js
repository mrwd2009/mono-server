import React, { memo, useCallback, useMemo, useEffect } from 'react';
import { Select, Spin, Divider, Typography } from 'antd';
import debounce from 'lodash/debounce';
import map from 'lodash/map';
import useRemoteSelect from './hooks/useRemoteSelect';

const { Option } = Select;
const { Text } = Typography;

const RemoteSelect = ({ url, value, onChange, ...restProps }) => {
  const {
    loading,
    total,
    list,
    fetchList,
  } = useRemoteSelect(url);
  // get initial user list
  useEffect(() => {
    fetchList('');
  }, [fetchList]);
  // fetch remote list according to searching text
  const handleSearch = useMemo(() => {
    return debounce((search) => {
      fetchList(search);
    }, 300);
  }, [fetchList]);
  // 
  const dropdownRender = useCallback((menu) => {
    if (total === 0) {
      return menu;
    }
    return (
      <Spin spinning={loading}>
        {menu}
        <Divider style={{ margin: '4px 0'}} />
        <div className="text-right" style={{ padding: '0 12px'}}>
          <Text type="secondary" >{`${list.length} of ${total}`}</Text>
        </div>
      </Spin>
    );
  }, [loading, list, total]);
  return (
    <Select
      { ...restProps }
      showSearch
      value={value}
      filterOption={false}
      onSearch={handleSearch}
      onChange={onChange}
      dropdownRender={dropdownRender}
    >
      {map(list, item => (<Option key={item.value} value={item.value}>{item.label}</Option>))}
    </Select>
  );
};

export default memo(RemoteSelect);