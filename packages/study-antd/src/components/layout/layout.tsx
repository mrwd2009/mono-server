import { HTMLAttributes, createContext, useContext, FC, createElement, useState, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

export interface GeneratorProps {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  displayName: string;
}

export interface BasicProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void;
    removeSider: (id: string) => void;
  };
}

export const LayoutContext = createContext<LayoutContextProps>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
});

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

function generator({ suffixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    const Adapter: FC<BasicProps> = props => {
      const { getPrefixCls } = useContext(ConfigContext);
      const { prefixCls: customizePrefixCls } = props;
      const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

      return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />;
    };
    Adapter.displayName = displayName;
    return Adapter;
  };
}

const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, children, tagName: Tag, ...others } = props;
  const classString = classNames(prefixCls, className);
  return <Tag className={classString} {...others}>{children}</Tag>;
};

const BasicLayout: FC<BasicPropsWithTagName> = props => {
  const { direction } = useContext(ConfigContext);
  const [siders, setSiders] = useState<string[]>([]);

  const {
    prefixCls,
    className,
    children,
    hasSider,
    tagName: Tag,
    ...others
  } = props;
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const contextValue = useMemo<LayoutContextProps>(() => ({
    siderHook: {
      addSider: (id: string) => {
        setSiders(prev => [...prev, id]);
      },
      removeSider: (id: string) => {
        setSiders(prev => prev.filter(currentId => currentId !== id));
      },
    }
  }), []);

  return (
    <LayoutContext.Provider value={contextValue}>
      <Tag className={classString} {...others}>
        {children}
      </Tag>
    </LayoutContext.Provider>
  );
};

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header',
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content',
})(Basic);

export {
  Header,
  Footer,
  Content,
};

export default Layout;

