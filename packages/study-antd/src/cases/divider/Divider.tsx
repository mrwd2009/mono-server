import { FC } from 'react';
import Divider from '../../components/divider';
import './index.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme';
};

const createPrimary = () => {
  return (
    <>
      <div><Divider /></div>
      <div><Divider>content </Divider></div>
      <div><Divider dashed>content </Divider></div>
      <div><Divider plain>content </Divider></div>
      <div><Divider orientation="left">content </Divider></div>
      <div><Divider orientation="right" orientationMargin="50px">content </Divider></div>
      <div><Divider orientation="left" orientationMargin="50px">content </Divider></div>
      <div>part1 <Divider type="vertical" /> part2</div>
    </>
  );
};

const DividerCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
  let el = null;
  if (type === 'primary') {
    el = createPrimary();
  }

  return (
    <div className={theme}>
      {el}
    </div>
  );
};

export default DividerCase;