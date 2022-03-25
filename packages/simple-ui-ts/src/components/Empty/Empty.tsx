import { FC, memo, DragEventHandler, DragEvent, useState } from 'react';
import { Empty, EmptyProps } from 'antd';
import classNames from 'classnames';
import { ReactComponent as EmptyImg } from '../../assets/images/empty.svg';

interface Props extends EmptyProps {
  onDrop?: DragEventHandler;
  size?: 'small' | 'default'
}

const CustomEmpty: FC<Props> = ({ onDrop, description, imageStyle, className, size = 'default', ...restProps }) => {
  const [dragging, setDragging] = useState(false);
  const classStr = classNames('app-ex-empty', className, {
    dragging,
    'p-4': !!onDrop,
    'sm': size === 'small',
  });
  let props = {};
  if (onDrop) {
    props = {
      onDragOver: (e: DragEvent) => {
        setDragging(true);
        e.preventDefault();
      },
      onDragLeave: (e: DragEvent) => {
        setDragging(false);
        e.preventDefault();
      },
      onDrop: (e: DragEvent) => {
        setDragging(false);
        e.preventDefault();
        onDrop(e);
      },
    };
  }
  return (
    <div
      {...props}
      className={classStr}
    >
      <Empty
        {...restProps}
        image={<EmptyImg />}
        description={description}
        imageStyle={imageStyle}
      />
    </div>
  );
};

export default memo(CustomEmpty);
