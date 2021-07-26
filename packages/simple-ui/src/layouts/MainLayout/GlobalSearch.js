import React, { memo, useState, useRef } from 'react';
import { Select, Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import map from 'lodash/map';
import find from 'lodash/find';
import { useGlobalSearch } from '../../context/app';

const { Group: InputGroup } = Input;
const { Option } = Select;
const GlobalSearch = () => {
  const { setGlobalSearch } = useGlobalSearch();
  // global search list
  const searchList = [
  ];
  // set event searching as default
  const [searchType, setSearchType] = useState(searchList[1] && searchList[1].key);
  // current handler for global search
  const searchHandler = find(searchList, { key: searchType });
  // search text in select
  const [searchValue, setSearchValue] = useState('');
  // input value in select
  const [value, setValue] = useState([]);
  const prevValRef = useRef(value);
  const handleChange = (value) => {
    let action = 'add';
    if (prevValRef.current.length > value.length) {
      action = 'remove';
    }
    const newVal = searchHandler.getValue(value, action);
    prevValRef.current = newVal;
    setValue(newVal);
    setSearchValue('');
  };
  const hSTChange = (type) => {
    setSearchType(type);
    setSearchValue('');
    setValue([]);
  };
  // reponse search button
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    const newValue = searchHandler.handleSearch(value);
    setGlobalSearch({
      key: searchHandler.key,
      value: newValue,
    });
    // fake loading to indicate we are searching
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (history.location.pathname !== searchHandler.pathname) {
      // redirect to corresponding page
      history.push(searchHandler.pathname);
    }
  };

  return (
    <div className="gridx-contextual-search">
      <InputGroup compact>
        <Select value={searchType} onChange={hSTChange}>
          {
            map(searchList, item => (
              <Option value={item.key} key={item.key}>{item.label}</Option>
            ))
          }
        </Select>
        <Select mode="tags" maxTagCount="responsive" style={{ width: '41%' }} value={value} onSearch={setSearchValue} onChange={handleChange} filterOption={false}>
          {
            map(searchHandler && searchHandler.getOptions(searchValue), item => (
              <Option key={item} value={item}>{item}</Option>
            ))
          }
        </Select>
        <Button type="primary" loading={loading} onClick={handleSearch}>Search</Button>
      </InputGroup>
    </div>
  );
};

export default memo(GlobalSearch);