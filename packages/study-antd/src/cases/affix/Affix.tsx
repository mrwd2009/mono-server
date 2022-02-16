import { FC } from 'react';
import Affix from '../../components/affix';
import './index.less';

export interface Props {
  type: string;
}

const AffixCase: FC<Props> = ({ type }) => {
  let el: any = <Affix offsetTop={50}><span>Affix</span></Affix>;

  return (
    <div style={{ height: 1200 }}>
      <div style={{ height: 100 }}>100</div>
      {el}
    </div>
  );
};

export default AffixCase;