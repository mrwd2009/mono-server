import { FC } from 'react';
import Layout from '../../components/layout';
import './index.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme';
}

const LayoutCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
  return (
    <div className={theme}>
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Content>Content</Layout.Content>
      </Layout>
    </div>
  );
};

export default LayoutCase;