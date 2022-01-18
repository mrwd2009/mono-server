import { FC, useState } from 'react';
import Layout from '../../components/layout';
import './index.less';

export interface Props {
  type: string;
  theme: 'dark-theme' | 'light-theme';
}

const createPrimary = () => {
  return (
    <Layout tagName="div">
      <Layout.Sider
        tagName="div"
        theme="light"
      >Sider1</Layout.Sider>
      <Layout.Content tagName="div">Content</Layout.Content>
    </Layout>
  );
};

const createCollapse = () => {
  return (
    <Layout tagName="div">
      <Layout.Sider
        tagName="div"
        theme="light"
        collapsible
      >Sider1</Layout.Sider>
      <Layout.Content tagName="div">Content</Layout.Content>
      <Layout.Sider
        tagName="div"
        theme="light"
        reverseArrow
        collapsedWidth={0}
        collapsible
      >Sider1</Layout.Sider>
    </Layout>
  );
};

const createBreakpoint = (breakpoint: string) => {
  return (
    <Layout tagName="div">
      <Layout.Sider
        tagName="div"
        theme="light"
        collapsible
        breakpoint="sm"
      >Sider1</Layout.Sider>
      <Layout.Content tagName="div">Content</Layout.Content>
      <Layout.Sider
        tagName="div"
        theme="light"
        reverseArrow
        collapsedWidth={0}
        breakpoint={breakpoint as 'sm'}
      >Sider1</Layout.Sider>
    </Layout>
  );
};

const createFull = () => {
  return (
    <Layout tagName="div">
      <Layout.Sider
        tagName="div"
        theme="light"
        collapsible
      >Sider1</Layout.Sider>
      <Layout.Content tagName="div">
        <Layout tagName="div">
          <Layout.Header tagName="div">Header</Layout.Header>
          <Layout.Content tagName="div">Content</Layout.Content>
          <Layout.Footer tagName="div">Footer</Layout.Footer>
        </Layout>
      </Layout.Content>
    </Layout>
  );
};

const LayoutCase: FC<Props> = ({ type, theme = 'light-theme' }) => {
  let el = null;
  let extra = null;
  const [breakpoint, setBreakpoint] = useState('sm');
  if (type === 'primary') {
    el = createPrimary();
  } else if (type === 'collapse') {
    el = createCollapse();
  } else if (type === 'breakpoint') {
    extra = (
      <button onClick={() => {
        if (breakpoint === 'sm') {
          setBreakpoint('lg');
        } else {
          setBreakpoint('sm');
        }
      }}>Change Breakpoint {breakpoint}</button>
    );
    el = createBreakpoint(breakpoint);
  } else if (type === 'full') {
    el = createFull();
  }
  return (
    <div className={theme}>
      {extra}
      {el}
    </div>
  );
};

export default LayoutCase;