import { FC, useContext, ReactNode } from 'react';
import Empty from '../../components/empty';
import ConfigProvider, { ConfigContext } from '../../components/config-provider';
import './index.less';
import './dark.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme'
}

const EmptyCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
  const { getPrefixCls } = useContext(ConfigContext);
  let node: ReactNode = null;
  if (type === 'simple') {
    node = (
      <Empty description={type} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  } else if (type === 'small') {
    node = (
      <Empty description={type} className={`${getPrefixCls('empty')}-small`} />
    );
  } else if (type === 'normal') {
    node = (
      <Empty description={type} className={`${getPrefixCls('empty')}-normal`} />
    );
  } else {
    node = (
      <Empty className={type} description={type}>Child</Empty>
    );
  }

  return (
    <ConfigProvider direction="rtl">
      <div className={theme}>
        {node}
      </div>
    </ConfigProvider>
  )
}

export default EmptyCase;