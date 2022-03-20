import React, { MouseEvent, TouchEvent } from 'react';

export const RESIZER_DEFAULT_CLASSNAME = 'Resizer';

interface Props {
  index?: number;
  onClick?: (e: MouseEvent, index: number) => void;
  onMouseDown?: (e: MouseEvent, index: number) => void;
  onDoubleClick?: (e: MouseEvent, index: number) => void;
  onTouchEnd?: (e: TouchEvent, index: number) => void;
  onTouchStart?: (e: TouchEvent, index: number) => void;
  split?: 'vertical' | 'horizontal';
}

class Resizer extends React.PureComponent<Props> {
  resizer: any;

  render() {
    const {
      index,
      split = 'vertical',
      onClick = () => {},
      onDoubleClick = () => {},
      onMouseDown = () => {},
      onTouchEnd = () => {},
      onTouchStart = () => {},
    } = this.props;

    const props = {
      ref: (_: any) => (this.resizer = _),
      'data-attribute': split,
      'data-type': 'Resizer',
      onMouseDown: (event: any) => onMouseDown(event, index!),
      onTouchStart: (event: any) => {
        event.preventDefault();
        onTouchStart(event, index!);
      },
      onTouchEnd: (event: any) => {
        event.preventDefault();
        onTouchEnd(event, index!);
      },
      onClick: (event: any) => {
        if (onClick) {
          event.preventDefault();
          onClick(event, index!);
        }
      },
      onDoubleClick: (event: any) => {
        if (onDoubleClick) {
          event.preventDefault();
          onDoubleClick(event, index!);
        }
      },
    };

    return split === 'vertical' ? (
      <div className="app-ex-pane-resizer app-ex-v-pane-resizer" {...props} />
    ) : (
      <div className="app-ex-pane-resizer app-ex-h-pane-resizer" {...props} />
    );
  }
}

export default Resizer;