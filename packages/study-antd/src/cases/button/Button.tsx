import { FC, useState } from 'react';
import Button from '../../components/button';
import './index.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme';
};

const createPrimary = (delay: boolean, hidden: any, setHidden: any) => {
  if (hidden) {
    return null;
  }
  return (
    <>
      <Button loading={delay ? { delay: 2000 } : false} onClick={() => setHidden(true)}>Primary</Button>
    </>
  );
};

const DividerCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
  let el = null;
  const [delay, setDelay] = useState(false);
  const [hidden, setHidden] = useState(false);
  if (type === 'primary') {
    el = createPrimary(delay, hidden, setHidden);
  }

  return (
    <div className={theme}>
      <span onClick={() => setDelay(!delay)}>toggle delay({delay ? 'true' : 'false'})</span>
      {el}
    </div>
  );
};

export default DividerCase;