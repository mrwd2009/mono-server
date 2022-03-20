import React, { ReactNode, LegacyRef } from 'react';
import { getUnit, convertSizeToCssValue } from './SplitPane';

interface Props {
  children?: ReactNode,
  className?: string,
  innerRef?: LegacyRef<HTMLDivElement>,
  index?: number;
  initialSize: string | number;
  minSize?: string;
  fixedSize?: string;
  maxSize?: string;
}

function PaneStyle({ split, initialSize, fixedSize, size, minSize, maxSize, resizersSize }: any) {
  const value =fixedSize || size || initialSize;
  const vertical = split === 'vertical';
  const styleProp = {
    minSize: vertical ? 'minWidth' : 'minHeight',
    maxSize: vertical ? 'maxWidth' : 'maxHeight',
    size: vertical ? 'width' : 'height'
  };

  let style: any = {
    display: 'flex',
    outline: 'none'
  };

  style[styleProp.minSize] = convertSizeToCssValue(minSize, resizersSize);
  style[styleProp.maxSize] = convertSizeToCssValue(maxSize, resizersSize);

  switch(getUnit(value)) {
    case 'ratio':
      style.flex = value;
      break;
    case '%':
    case 'px':
      style.flexGrow = 0;
      style[styleProp.size] = convertSizeToCssValue(value, resizersSize);
      break;
  }

  return style;
}


class Pane extends React.PureComponent<Props> {
  static defaultProps = {
    initialSize: '1',
    split: 'vertical',
    minSize: '0',
    maxSize: '100%',
  };

  setRef = (element: any) => {
    (this.props.innerRef as any)(this.props.index, element);
  };

  render() {
    const { children, className } = this.props;
    const prefixedStyle = PaneStyle(this.props);

    return (
      <div
        className={className}
        style={prefixedStyle}
        ref={this.setRef}
      >
        {children}
      </div>
    );
  }
}

export default Pane;