import { FC, useContext, useState, useRef, memo } from 'react';
import LocaleProvider from '../../components/locale-provider';
import LocaleContext from '../../components/locale-provider/context';

interface Props {
  type: 'primary'
}

const defaultLocale = {
  locale: 'EN',
  Empty: {
    description: 'No Data!!',
  },
};

let ContextShow: FC = () => {
  const locale = useContext(LocaleContext);
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  return (
    <div style={{ border: '1px solid cyan', marginTop: 12 }}>
      Child Render Count: {renderCountRef.current}<br />
      {
        JSON.stringify(locale, null, 2)
      }
    </div>
  );
};
ContextShow = memo(ContextShow);

const LocaleProviderCase: FC<Props> = ({ type }) => {
  const [num, setNum] = useState(1);

  const handleClick = () => {
    setNum(num + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Plus</button> Parent Render Count: {num}<br />
      <LocaleProvider
        locale={defaultLocale}
      >
        <ContextShow />
      </LocaleProvider>
    </div>
  );
};

export default LocaleProviderCase;