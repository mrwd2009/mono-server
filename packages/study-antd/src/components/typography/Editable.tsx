import * as React from 'react';
import classNames from 'classnames';
import KeyCode from '../../dependents/util/src/KeyCode';
import { EnterOutlined } from '@ant-design/icons';
import { AutoSizeType } from 'rc-textarea';
// import TextArea from '../input/TextArea';
import { DirectionType } from '../config-provider';
import { cloneElement } from '../_util/reactNode';

interface EditableProps {
  prefixCls?: string;
  value: string;
  'aria-label'?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  onEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
  direction?: DirectionType;
  maxLength?: number;
  autoSize?: boolean | AutoSizeType;
  enterIcon?: React.ReactNode;
}

const Editable: React.FC<EditableProps> = ({
  prefixCls,
  'aria-label': ariaLabel,
  className,
  style,
  direction,
  maxLength,
  autoSize = true,
  value,
  onSave,
  onCancel,
  onEnd,
  enterIcon = <EnterOutlined />,
}) => {
  return <span>Editable</span>;
};

export default Editable;