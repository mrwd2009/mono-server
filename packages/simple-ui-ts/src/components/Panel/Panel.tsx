import { FC, memo, ReactNode } from 'react';
import Card, { CardTabListType } from 'antd/lib/card';
import classNames from 'classnames';

interface Props {
  title?: ReactNode;
  extra?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
  tabList?: CardTabListType[];
  className?: string;
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
}

const Panel: FC<Props> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className="app-ex-panel">
      <Card
        {...restProps}
        bordered={false}
        size="small"
        className={classNames(className, 'app-ex-panel__card', { 'no-tabs': !restProps.tabList })}
        tabProps={{ size: 'small', tabBarGutter: 16 }}
      >
        {children}
      </Card>
    </div>
  )
};

export default memo(Panel);