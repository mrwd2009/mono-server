import React, { PureComponent, ReactNode, RefObject } from 'react';
import { Tooltip } from 'antd';

interface Props {
  children?: ReactNode;
  className?: string;
}

interface State {
  visible: boolean;
}

class EllipsisTooltip extends PureComponent<Props, State> {
  spanRef: RefObject<HTMLSpanElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.spanRef = React.createRef();
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  onVisibleChange(visible: boolean) {
    if (visible) {
      // if text is ellipsis, we will show the tooltip
      if (this.spanRef.current!.scrollWidth > this.spanRef.current!.offsetWidth) {
        this.setState({
          visible: true,
        });
        return;
      }
    }
    this.setState({
      visible: false,
    });
  }

  render() {
    const { children, className = '' } = this.props;
    const { visible } = this.state;
    const containerClass = `ellipsis-tooltip-container ${className}`;
    return (
      <Tooltip
        title={children}
        onVisibleChange={this.onVisibleChange}
        visible={visible}
      >
        <span
          className={containerClass}
          ref={this.spanRef}
        >
          {children}
        </span>
      </Tooltip>
    );
  }
}

export default EllipsisTooltip;
