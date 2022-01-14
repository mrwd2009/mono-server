import { FC, ReactNode, CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';

const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;

export interface TransferLocale {
  description: string;
}

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  image?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

interface EmptyType extends FC<EmptyProps> {
  PRESENTED_IMAGE_DEFAULT: ReactNode;
  PRESENTED_IMAGE_SIMPLE: ReactNode;
}

const Empty: EmptyType = ({
  className,
  prefixCls: customizedPrefixCls,
  image = defaultEmptyImg,
  description,
  children,
  imageStyle,
  ...restProps
}) => {
  const { getPrefixCls, direction } = useContext(ConfigContext);

  return (
    <LocaleReceiver componentName="Empty">
      {(locale: TransferLocale) => {
        const prefixCls = getPrefixCls('empty', customizedPrefixCls);
        const des = typeof description !== 'undefined' ? description : locale.description;
        const alt = typeof des === 'string' ? des : 'empty';

        let imageNode: ReactNode = null;

        if (typeof image === 'string') {
          imageNode = <img alt={alt} src={image} />;
        } else {
          imageNode = image;
        }

        return (
          <div
            className={
              classNames(prefixCls, {
                [`${prefixCls}-normal`]: image === simpleEmptyImg,
                [`${prefixCls}-rtl`]: direction === 'rtl',
              }, className)
            }
            {...restProps}
          >
            <div className={`${prefixCls}-image`} style={imageStyle}>{imageNode}</div>
            {des && <div className={`${prefixCls}-description`}>{des}</div>}
            {children && <div className={`${prefixCls}-footer`}>{children}</div>}
          </div>
        )
      }}
    </LocaleReceiver>
  )
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;