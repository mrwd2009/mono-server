import { FC, Children } from 'react';
import Space from '../../components/space';
import './index.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme';
};

const createPrimary = () => {
  return (
    <>
      <Space>test1<span>test2</span></Space>
      <Space direction="vertical">test1<span>test2</span></Space>
      <Space align="center"><span style={{ display: 'inline-block', height: '40px' }}>part1</span><span>Part2</span></Space>
      <Space size={40} split="-">test1<span>test2</span></Space>
      <div style={{ width: 150 }}>
        <Space wrap size={[20, 20]}>
          <span>part1</span><span>part2</span><span>part3</span><span>part4</span>
        </Space>
      </div>
    </>
  );
};

const SpaceCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
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

export default SpaceCase;