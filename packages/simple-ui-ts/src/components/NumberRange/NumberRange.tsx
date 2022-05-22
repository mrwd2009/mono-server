import { FC, memo } from 'react';
import { InputNumber } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';

interface Props {
  value?: any;
  onChange?: any;
  className?: string;
}

const NumberRange: FC<Props> = ({ value, onChange, className }) => {
  const [start = null, end = null] = value || [];
  return (
    <div className={`app-ex-number-range ${className || ''}`}>
      <InputNumber
        placeholder="Min"
        value={start}
        onChange={(val) => onChange([val, end])}
      />
      <span className="separator">
        <SwapRightOutlined />
      </span>
      <InputNumber
        placeholder="Max"
        value={end}
        onChange={(val) => onChange([start, val])}
      />
    </div>
  );
};

export default memo(NumberRange);
