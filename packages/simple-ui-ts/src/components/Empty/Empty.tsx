import { FC, memo, DragEventHandler, DragEvent, useState } from 'react';
import { Empty, EmptyProps } from 'antd';
import classNames from 'classnames';
import { ReactComponent as EmptyImg } from '../../assets/images/empty.svg';

interface Props extends EmptyProps {
  onDrop?: DragEventHandler;
  size?: 'small' | 'default' | 'xsmall'
}

const CustomEmpty: FC<Props> = ({ onDrop, description, imageStyle, className, size = 'default', ...restProps }) => {
  const [dragging, setDragging] = useState(false);
  const classStr = classNames('app-ex-empty', className, {
    dragging,
    'p-4': !!onDrop,
    'sm': size === 'small',
    'xs': size === 'xsmall',
    droppable: !!onDrop,
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
        image={<EmptyImg />}
        {...restProps}
        description={description}
        imageStyle={imageStyle}
      />
    </div>
  );
};

export default memo(CustomEmpty);
