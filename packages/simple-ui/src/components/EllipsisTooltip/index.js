import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import './index.less';


class EllipsisTooltip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.spanRef = React.createRef();
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  onVisibleChange(visible) {
    if (visible) {
      // if text is ellipsis, we will show the tooltip
      if (this.spanRef.current.scrollWidth > this.spanRef.current.offsetWidth) {
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
      <Tooltip title={children} onVisibleChange={this.onVisibleChange} visible={visible}>
        <span className={containerClass} ref={this.spanRef}>
          {children}
        </span>
      </Tooltip>
    );
  }
}

EllipsisTooltip.propTypes = {
  /** text to display */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]),
  /** class for container */
  className: PropTypes.string,
};

export default EllipsisTooltip;
