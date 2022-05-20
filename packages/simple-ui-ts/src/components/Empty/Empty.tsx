import { FC, memo, DragEventHandler, DragEvent, useState } from 'react';
import { Empty, EmptyProps } from 'antd';
import classNames from 'classnames';
import { ReactComponent as EmptyImg } from '../../assets/images/empty.svg';

interface Props extends EmptyProps {
  onDrop?: DragEventHandler;
  size?: 'small' | 'default' | 'xsmall';
  noStyle?: boolean;
}

const CustomEmpty: FC<Props> = ({
  onDrop,
  description,
  imageStyle,
  style,
  className,
  size = 'default',
  noStyle = false,
  ...restProps
}) => {
  const [dragging, setDragging] = useState(false);
  const classStr = classNames('app-ex-empty', className, {
    dragging,
    'p-4': !!onDrop,
    sm: size === 'small',
    xs: size === 'xsmall',
    droppable: !!onDrop,
    'no-style': noStyle,
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
      style={style}
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
