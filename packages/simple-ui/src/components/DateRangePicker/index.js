import React, { memo } from 'react';
import { DatePicker } from 'antd';
import './index.less';

const DateRangePicker = ({value, onChange, format, picker, className}) => {
  const [start = null, end = null] = value || [];
  return (
    <div className={`separated-range-picker ${className || ''}`}>
      <DatePicker format={format} picker={picker} placeholder="Start" value={start} onChange={val => onChange([val, end])}/>
      <span className="separator">~</span>
      <DatePicker format={format} picker={picker} placeholder="End"  value={end} onChange={val => onChange([start, val])}/>
    </div>
  );
};

export default memo(DateRangePicker);