import { FC, useContext, useRef, useState, useEffect, Context, createContext, HTMLAttributes, CSSProperties, ReactNode } from 'react';
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
}