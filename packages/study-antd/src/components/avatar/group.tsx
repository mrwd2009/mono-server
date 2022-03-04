import * as React from 'react';
import classNames from 'classnames';
import toArray from '../../dependents/util/src/Children/toArray';
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import Avatar from './avatar';
import Popover from '../popover';
import { AvatarSize, SizeContextProvider } from './SizeContext';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  maxCount?: number;
  maxStyle?: React.CSSProperties;
  maxPopoverPlacement?: 'top' | 'bottom';
  maxPopoverTrigger?: 'hover' | 'focus' | 'click';
  size?: AvatarSize;
}

const Group: React.FC<GroupProps> = (props) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className = '',
    maxCount,
    maxStyle,
    size,
    children,
    maxPopoverPlacement = 'top',
    maxPopoverTrigger = 'hover',
  } = props;

  const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const childrenWithProps = toArray(children).map((child, index) => {
    return cloneElement(child, {
      key: `avatar-key-${index}`,
    });
  });

  const numOfChildren = childrenWithProps.length;
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount);
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push(
      <Popover
        key="avatar-popover-key"
        content={childrenHidden}
        trigger={maxPopoverTrigger}
        placement={maxPopoverPlacement}
        overlayClassName={`${prefixCls}-popover`}
      >
        <Avatar style={maxStyle}>{`+${numOfChildren - maxCount}`}</Avatar>
      </Popover>,
    );
    return (
      <SizeContextProvider size={size}>
        <div className={cls} style={props.style}>
          {childrenShow}
        </div>
      </SizeContextProvider>
    );
  }

  return (
    <SizeContextProvider size={size}>
      <div className={cls} style={props.style}>
        {childrenWithProps}
      </div>
    </SizeContextProvider>
  );
}

export default Group;