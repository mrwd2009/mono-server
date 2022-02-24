import { FC } from 'react';
import Tag from '../../components/tag';
import Popover from '../../components/popover';
import Tooltip from '../../components/tooltip';
import Avatar from '../../components/avatar';
import './index.less';

export interface Props {
  type: string;
}

const AvatarTagTooltipPopover: FC<Props> = ({ type }) => {
  let el: any;

  if (type === 'tag') {
    el = (
      <>
        <Tag closable color="processing">
          tag
        </Tag>
        <Tag closable color="red" onClick={() => {}}>
          tag2
        </Tag>
      </>
    );
  } else if (type === 'avatar') {
    el = (
      <>
        <Avatar>Title 1</Avatar>
        <Avatar.Group size="large" maxCount={2}>
          <Avatar>Title 1</Avatar>
          <Avatar>Title 2</Avatar>
          <Avatar>Title 3</Avatar>
          <Avatar>Title 4</Avatar>
          <Avatar>Title 5</Avatar>
        </Avatar.Group>
      </>
    );
  } else if (type === 'tooltip') {
    el = (
      <>
        <Tooltip title="correct title"><span>correct</span></Tooltip>
        <Tooltip title="correct title" color="red"><span>------correct</span></Tooltip>
      </>
    );
  } else if (type === 'popover') {
    el = (
      <>
        <Popover content="popover content"><span>popover</span></Popover>
        <Popover content="popover content" color="geekblue"><span>------popover</span></Popover>
      </>
    );
  }

  return (
    <div>
      {el}
    </div>
  );
};

export default AvatarTagTooltipPopover;