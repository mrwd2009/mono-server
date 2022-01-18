import { useMemo, useContext, useRef, useState, useEffect, forwardRef, Context, createContext, HTMLAttributes, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { BarsOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import omit from '../../dependents/util/src/omit';
import { LayoutContext } from './layout';
import { ConfigContext } from '../config-provider';
import isNumeric from '../_util/isNumeric';

const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px',
};

export interface SiderContextProps {
  siderCollapsed?: boolean;
}

export const SiderContext: Context<SiderContextProps> = createContext({});

export type CollapseType = 'clickTrigger' | 'responsive';

export type SiderTheme = 'light' | 'dark';

export interface SiderProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  zeroWidthTriggerStyle?: CSSProperties;
  trigger?: ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  theme?: SiderTheme;
  onBreakpoint?: (broken: boolean) => void;
  tagName?: 'aside' | 'div'
}

export interface SiderState {
  collapsed?: boolean;
  below?: boolean;
}

const generateId = (() => {
  let i = 0;
  return (prefix: string = '') => {
    i += 1;
    return `${prefix}${i}`;
  }
})();

const Sider = forwardRef<HTMLDivElement, SiderProps>(
  (
    {
      prefixCls: customizePrefixCls,
      className,
      trigger,
      children,
      defaultCollapsed = false,
      theme = 'dark',
      style = {},
      collapsible = false,
      reverseArrow = false,
      width = 200,
      collapsedWidth = 80,
      zeroWidthTriggerStyle,
      breakpoint,
      onCollapse,
      onBreakpoint,
      tagName: Tag = 'aside',
      ...props
    },
    ref,
  ) => {
    const { siderHook } = useContext(LayoutContext);

    const [collapsed, setCollapsed] = useState('collapsed' in props ? props.collapsed : defaultCollapsed);
    const [below, setBelow] = useState(false);

    const receivedCollapsed = props.collapsed;
    useEffect(() => {
      if (receivedCollapsed != null) {
        setCollapsed(receivedCollapsed);
      }
    }, [receivedCollapsed]);

    const handleSetCollapsed = (value: boolean, type: CollapseType) => {
      if (!('collapsed' in props)) {
        setCollapsed(value);
      }
      onCollapse?.(value, type);
    };
    // for responsive handler
    const responsiveHandlerRef = useRef<(mql: MediaQueryListEvent | MediaQueryList) => void>();
    responsiveHandlerRef.current = (mql: MediaQueryListEvent | MediaQueryList) => {
      setBelow(mql.matches);
      onBreakpoint?.(mql.matches);

      if (collapsed !== mql.matches) {
        handleSetCollapsed(mql.matches, 'responsive');
      }
    };

    // todo fixed: change listener according to breakpoint
    useEffect(() => {
      function responsiveHandler(mql: MediaQueryListEvent | MediaQueryList) {
        return responsiveHandlerRef.current!(mql);
      }

      let mql: MediaQueryList;
      if (typeof window !== 'undefined') {
        const { matchMedia } = window;
        if (!!matchMedia && breakpoint && breakpoint in dimensionMaxMap) {
          mql = matchMedia(`(max-width: ${dimensionMaxMap[breakpoint]})`);
          try {
            mql.addEventListener('change', responsiveHandler);
          } catch (error) {
            mql.addListener(responsiveHandler);
          }
          responsiveHandler(mql);
        }
      }

      return () => {
        try {
          mql?.removeEventListener('change', responsiveHandler);
        } catch (error) {
          mql?.removeListener(responsiveHandler);
        }
      }
    }, [breakpoint]);

    useEffect(() => {
      const uniqueId = generateId('ant-sider-');
      siderHook.addSider(uniqueId);
      return () => siderHook.removeSider(uniqueId);
      // todo check sider hook
    }, [siderHook]);

    const toggle = () => {
      handleSetCollapsed(!collapsed, 'clickTrigger');
    };

    const { getPrefixCls } = useContext(ConfigContext);

    const renderSider = () => {
      const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
      const divProps = omit(props, ['collapsed']);
      const rawWidth = collapsed ? collapsedWidth : width;
      const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : rawWidth as string;
      const zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? (
        <span
          onClick={toggle}
          className={classNames(`${prefixCls}-zero-width-trigger`, `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`)}
          style={zeroWidthTriggerStyle}
        >
          {trigger || <BarsOutlined />}
        </span>
      ) : null;
      const iconObj = {
        expanded: reverseArrow ? <RightOutlined /> : <LeftOutlined />,
        collapsed: reverseArrow ? <LeftOutlined /> : <RightOutlined />,
      };
      const status = collapsed ? 'collapsed' : 'expanded';
      const defaultTrigger = iconObj[status];
      const triggerDom = trigger !== null ? (
        zeroWidthTrigger || (
          <div
            className={`${prefixCls}-trigger`}
            onClick={toggle}
            style={{ width: siderWidth }}
          >
            {trigger || defaultTrigger}
          </div>
        )
      ) : null;
      const divStyle = {
        ...style,
        flex: `0 0 ${siderWidth}`,
        maxWidth: siderWidth,
        minWidth: siderWidth,
        width: siderWidth,
      };
      const siderCls = classNames(
        prefixCls,
        `${prefixCls}-${theme}`,
        {
          [`${prefixCls}-collapsed`]: !!collapsed,
          [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
          [`${prefixCls}-below`]: !!below,
          [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
        },
        className,
      );
      return (
        <Tag className={siderCls} {...divProps} style={divStyle} ref={ref}>
          <div className={`${prefixCls}-children`}>{children}</div>
          {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
        </Tag>
      )
    };

    const contextValue = useMemo(() => ({
      siderCollapsed: collapsed,
    }), [collapsed]);

    return <SiderContext.Provider value={contextValue}>{renderSider()}</SiderContext.Provider>;
  }
);

Sider.displayName = 'Sider';

export default Sider;