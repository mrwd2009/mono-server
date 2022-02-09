import * as React from 'react';
// import Tooltip from '../../tooltip';

export interface EllipsisTooltipProps {
  title?: React.ReactNode;
  enabledEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip = ({ title, enabledEllipsis, isEllipsis, children }: EllipsisTooltipProps) => {
  if (!title || !enabledEllipsis) {
    return children;
  }

  return children;
};

if (process.env.NODE_ENV === 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;