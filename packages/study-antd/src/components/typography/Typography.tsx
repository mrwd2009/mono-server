import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface TypographyProps {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  'aria-label'?: string;
}

interface InternalTypographyProps extends TypographyProps {
  component?: string;
}

const Typography: React.ForwardRefRenderFunction<{}, InternalTypographyProps> = ({
  prefixCls: customizePrefixCls,
  component = 'article',
  className,
  'aria-label': ariaLabel,
  children,
  ...restProps
}, ref) => {
  let mergedRef = ref;

  return (
    <ConfigConsumer>
      {({ getPrefixCls, direction }: ConfigConsumerProps) => {
        const Component = component as any;
        const prefixCls = getPrefixCls('typography', customizePrefixCls);
        const componentClassName = classNames(
          prefixCls,
          {
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className,
        );
        return (
          <Component
            className={componentClassName}
            aria-label={ariaLabel}
            ref={mergedRef}
            {...restProps}
          >
            {children}
          </Component>
        );
      }}
    </ConfigConsumer>
  )
};

const RefTypography = React.forwardRef(Typography);
RefTypography.displayName = 'Typography';

const ExportTypography = (RefTypography as unknown) as React.FC<TypographyProps>;

export default ExportTypography;