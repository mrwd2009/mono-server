import React, { memo } from 'react';
import isObject from 'lodash/isObject';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Collapse, Row, Col, Input, InputNumber, Select, DatePicker } from 'antd';
import DateRangePicker from '../DateRangePicker';
import useFilterPanel from './hooks/useFilterPanel';

const { Panel } = Collapse;
const { Item } = Form;
const { Option } = Select;
const FilterPanel = ({ title = 'Filter', allowClear = true, filter, itemCol, className, labelCol, wrapperCol, showLoading = false }) => {
  const {
    items,
    defaultValue,
    value,
    loading,
    onChange,
    onSearch,
    onReset,
  } = filter;
  const getItemCol = (index) => {
    if (items.length === 1) {
      return { span: 9, offset: 7 };
    }
    let newItemCol = itemCol || {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
      lg: {
        span: 8,
      },
      xxl: {
        span: 6,
      }
    };
    if (!itemCol) {
      if (items.length === 3) {
        if (newItemCol.xxl && index === 0) {
          newItemCol.xxl.offset = 3;
        }
      } else if (items.length === 2) {
        if (newItemCol.lg && newItemCol.xxl && index === 0) {
          newItemCol.lg.offset = 4;
          newItemCol.xxl.offset = 6;
        }
      }
    }
    return newItemCol;
  };
  if (!labelCol) {
    if (items.length === 1) {
      labelCol = { span: 6 };
    } else {
      labelCol = { sm: { span: 8 }, xs: { span: 24 } };
    }
  }
  if (!wrapperCol) {
    if (items.length === 1) {
      wrapperCol = { span: 18 };
    } else {
      wrapperCol = { sm: { span: 16 }, xs: { span: 24 } };
    }
  }
  const itemElements = items.map((item, index) => {
    const type = item.type || 'text';
    const field = item.field;
    const fieldVal = value[field];
    const colProps = item.col || {};
    let element = null;
    if (type === 'number') {
      element = (
        <InputNumber
          className="w-100"
          placeholder="Please input"
          value={fieldVal}
          onChange={(val) => onChange({...value, [field]: val})}
        />
      );
    } else if (type === 'select') {
      const options = item.options.map((opt) => {
        if (isObject(opt)) {
          return (
            <Option
              key={opt.label}
              value={opt.value}
            >
              {opt.label}
            </Option>
          );
        }
        return (
          <Option
            key={opt}
            value={opt}
          >
            {opt}
          </Option>
        );
      });
      element = (
        <Select
          className="w-100"
          value={fieldVal}
          onChange={(val) => onChange({...value, [field]: val})}
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="Please select"
        >
          {options}
        </Select>
      );
    } else if (type === 'date') {
      element = (
        <DatePicker
          className="w-100"
          value={fieldVal}
          onChange={(val) => onChange({...value, [field]: val})}
        />
      );
    } else if (type === 'daterange') {
      const {
        format = 'YYYY-MM-DD',
        picker = 'date',
      } = item;
      element = (
        <DateRangePicker
          format={format}
          picker={picker}
          value={fieldVal}
          onChange={(val) => onChange({...value, [field]: val})}
        />
      );
    } else {
      element = (
        <Input
          value={fieldVal}
          onChange={(event) => onChange({...value, [field]: event.target.value})}
          placeholder="Please input"
        />
      );
    }

    return (
      <Col {...getItemCol(index)} {...colProps} key={field}>
        <Item label={item.label}>
          {element}
        </Item>
      </Col>
    )
  });

  return (
    <Collapse defaultActiveKey={['filter']} className={` ${className || ''}`}>
      <Panel header={title} key="filter">
        <Form labelCol={labelCol} wrapperCol={wrapperCol}>
          <Row gutter={8}>
            {itemElements}
          </Row>
          <div className="text-center">
            <Button type="primary" className={ allowClear ? 'mr-2' : '' } size="small" onClick={() => onSearch(value)} icon={<SearchOutlined />} loading={showLoading && loading}>Search</Button>
            { allowClear && <Button size="small" onClick={() => onReset(defaultValue)} icon={<CloseOutlined />} loading={showLoading && loading}>Reset</Button> }
          </div>
        </Form>
      </Panel>
    </Collapse>
  );
};

FilterPanel.useFilterPanel = useFilterPanel;

export default memo(FilterPanel);