import * as React from 'react';
import { SubMenu as RcSubMenu, useFullPath } from 'rc-menu';
import classNames from 'classnames';
import omit from '../../dependents/util/src/omit';
import MenuContext from './MenuContext';
import { isValidElement, cloneElement } from '../_util/reactNode';

interface TitleEventEntity {
  key: string;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface SubMenuProps {
  className?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onTitleClick?: (e: TitleEventEntity) => void;
  onTitleMouseEnter?: (e: TitleEventEntity) => void;
  onTitleMouseLeave?: (e: TitleEventEntity) => void;
  popupOffset?: [number, number];
  popupClassName?: string;
  children?: React.ReactNode;
}

function SubMenu(props: SubMenuProps) {
  const { popupClassName, icon, title } = props;
  const context = React.useContext(MenuContext);
  const { prefixCls, inlineCollapsed, antdMenuTheme } = context;
  const parentPath = useFullPath();

  let titleNode: React.ReactNode;

  if (!icon) {
    if (inlineCollapsed && !parentPath.length && title && typeof title === 'string') {
      titleNode = <div className={`${prefixCls}-inline-collapsed-noicon`}>{title.charAt(0)}</div>;
    } else {
      titleNode = <span className={`${prefixCls}-title-content`}>{title}</span>;
    }
  } else {
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {
          cloneElement(icon, {
            className: classNames(
              isValidElement(icon) ? icon.props?.classname : '',
              `${prefixCls}-item-icon`
            ),
          })
        }
        { titleIsSpan ? title : <span className={`${prefixCls}-title-content`}>{title}</span> }
      </>
    );
  }

  const contextValue = React.useMemo(
    () => ({
      ...context,
      firstLevel: false,
    }),
    [context],
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <RcSubMenu
        {...omit(props, ['icon'])}
        title={titleNode}
        popupClassName={classNames(prefixCls, `${prefixCls}-${antdMenuTheme}`, popupClassName)}
      />
    </MenuContext.Provider>
  );
}

export default SubMenu;