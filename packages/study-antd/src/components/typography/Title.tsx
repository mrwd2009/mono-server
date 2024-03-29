import * as React from 'react';
import devWarning from '../_util/devWarning';
import Base, { BlockProps } from './Base';
import { tupleNum } from '../_util/type';

const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5);

export type TitleProps = Omit<BlockProps & {
  level?: typeof TITLE_ELE_LIST[number];
  onCLick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}, 'strong'>;

const Title: React.FC<TitleProps> = props => {
  const { level = 1, ...restProps } = props;
  let component: string;

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    component = `h${level}`;
  } else {
    devWarning(false, 'Typography.Title', 'Error level');
    component = 'h1';
  }

  return <Base {...restProps} component={component} />;
};

Title.displayName = 'Title';

export default Title;