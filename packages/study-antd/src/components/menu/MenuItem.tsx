import * as React from 'react';
import { Item, MenuItemProps as RcMenuItemProps } from 'rc-menu';
import toArray from '../../dependents/util/src/Children/toArray';
import classNames from 'classnames';
import MenuContext, { MenuContextProps } from './MenuContext';
// import Tooltip, { TooltipProps } from '../tooltip';
import { SiderContext, SiderContextProps } from '../layout/Sider';
import { isValidElement, cloneElement } from '../_util/reactNode';

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
}

export default class MenuItem extends React.Component<MenuItemProps> {
  static contextType = MenuContext;

  renderItemChildren(inlineCollapsed: boolean) {
    const { prefixCls, firstLevel } = this.context;
    const { icon, children } = this.props;

    const wrapNode = <span className={`${prefixCls}-title-content`}>{children}</span>;
    if (!icon || (isValidElement(children) && children.type === 'span')) {
      if (children && inlineCollapsed && firstLevel && typeof children === 'string') {
        return <div className={`${prefixCls}-inline-collapsed-noicon`}>{children.charAt(0)}</div>;
      }
    }
    return wrapNode;
  }

  renderItem = ({ siderCollapsed }: SiderContextProps) => {
    const { prefixCls, firstLevel, inlineCollapsed, direction, disableMenuItemTitleTooltip } = this.context;
    const { className, children } = this.props;
    const { title, icon, danger, ...rest } = this.props;

    let tooltipTitle = title;
    if (typeof title === 'undefined') {
      tooltipTitle = firstLevel ? children : '';
    } else if (title === false) {
      tooltipTitle = '';
    }

    const tooltipProps: any = {
      title: tooltipTitle,
    };

    if (!siderCollapsed && !inlineCollapsed) {
      tooltipProps.title = null;
      tooltipProps.visible = false;
    }

    const childrenLength = toArray(children).length;

    let returnNode = (
      <Item
        {...rest}
        className={classNames(
          {
            [`${prefixCls}-item-danger`]: danger,
            [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1,
          },
          className,
        )}
        title={typeof title === 'string' ? title : undefined}
      >
        {
          cloneElement(icon, {
            className: classNames(
              isValidElement(icon) ? icon.props?.className : '',
              `${prefixCls}-item-icon`
            ),
          })
        }
        {this.renderItemChildren(inlineCollapsed)}
      </Item>
    );

    if (!disableMenuItemTitleTooltip) {
      // todo tooltip
      returnNode = (
        returnNode
      );
    }

    return returnNode;
  };

  render() {
    return <SiderContext.Consumer>{this.renderItem}</SiderContext.Consumer>;
  }
}