import { PureComponent, ReactNode } from 'react';
import Icon from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import SplitPane, { Pane } from '../SplitPane';
import { ReactComponent as LeftIcon } from '../../assets/images/direction/collapse-left.svg';
import { ReactComponent as RightIcon } from '../../assets/images/direction/collapse-right.svg';

interface Props {
  className?: string;
  leftSider?: {
    initialWidth?: number;
    content: ReactNode;
  } | null;
  rightSider?: {
    initialWidth?: number;
    content: ReactNode;
  } | null;
  children?: ReactNode;
}

interface State {
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  leftTooltip: boolean;
  rightTooltip: boolean;
  changedSizeInfo?: any;
}

class CollapsibleSplitPane extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leftTooltip: false,
      rightTooltip: false,
      leftCollapsed: false,
      rightCollapsed: false,
    };
    this.toggleLeftSider = this.toggleLeftSider.bind(this);
    this.toggleRightSider = this.toggleRightSider.bind(this);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { changedSizeInfo: prefInfo } = prevState;
    const { changedSizeInfo: info, leftCollapsed: left, rightCollapsed: right } = this.state;
    if (prefInfo && info && prefInfo !== info) {
      if (left && info.resizerIndex === 0) {
        this.setState({
          leftCollapsed: false,
        });
      }
      if (right) {
        if (this.props.leftSider && info.resizerIndex === 1) {
          this.setState({
            rightCollapsed: false,
          });
        }
        if (!this.props.leftSider && info.resizerIndex === 0) {
          this.setState({
            rightCollapsed: false,
          });
        }
      }
    }
  }

  toggleLeftSider() {
    const { leftCollapsed } = this.state;
    this.setState({
      leftTooltip: false,
      leftCollapsed: !leftCollapsed,
    });
  }

  toggleRightSider() {
    const { rightCollapsed } = this.state;
    this.setState({
      rightTooltip: false,
      rightCollapsed: !rightCollapsed,
    });
  }

  render() {
    const { leftSider, children, rightSider, className } = this.props;
    const { leftCollapsed, rightCollapsed, leftTooltip, rightTooltip } = this.state;
    let mainClasses = '';

    let leftSiderEle = null;
    if (leftSider) {
      mainClasses += ' left ';
      let { initialWidth = 250 } = leftSider;
      let width: any = '';
      let fixedSize: any;
      if (leftCollapsed) {
        width = 0;
        fixedSize = '12px';
      }
      const headerStyle = {
        width,
      };
      const inlineClass = leftCollapsed ? 'inline' : '';
      leftSiderEle = (
        <Pane
          initialSize={`${initialWidth}px`}
          minSize="12px"
          maxSize="30%"
          fixedSize={fixedSize}
        >
          <div
            className={`app-ex-collapsible-split-pane__sider left ${inlineClass}`}
            style={headerStyle}
          >
            {leftSider.content}
          </div>
          <Tooltip
            visible={leftTooltip}
            title={leftCollapsed ? 'Expand' : 'Collpase'}
            placement="right"
            onVisibleChange={(visible) => this.setState({ leftTooltip: visible })}
          >
            <Button
              size="small"
              className={`app-ex-collapsible-split-pane__toggle left ${inlineClass}`}
              shape="circle"
              onClick={this.toggleLeftSider}
              icon={<Icon component={leftCollapsed ? RightIcon : LeftIcon} />}
            />
          </Tooltip>
        </Pane>
      );
    }

    let rightSiderEle = null;
    if (rightSider) {
      mainClasses += ' right ';
      let { initialWidth = 250 } = rightSider;
      let width: any = '';
      let fixedSize: any;
      if (rightCollapsed) {
        width = 0;
        fixedSize = '12px';
      }
      const headerStyle = {
        width,
      };
      const inlineClass = rightCollapsed ? 'inline' : '';
      rightSiderEle = (
        <Pane
          initialSize={`${initialWidth}px`}
          minSize="12px"
          maxSize="30%"
          fixedSize={fixedSize}
        >
          <div
            className={`app-ex-collapsible-split-pane__sider right ${inlineClass}`}
            style={headerStyle}
          >
            {rightSider.content}
          </div>
          <Tooltip
            visible={rightTooltip}
            title={rightCollapsed ? 'Expand' : 'Collpase'}
            placement="left"
            onVisibleChange={(visible) => this.setState({ rightTooltip: visible })}
          >
            <Button
              size="small"
              className={`app-ex-collapsible-split-pane__toggle right ${inlineClass}`}
              shape="circle"
              onClick={this.toggleRightSider}
              icon={<Icon component={rightCollapsed ? LeftIcon : RightIcon} />}
            />
          </Tooltip>
        </Pane>
      );
    }

    return (
      <SplitPane
        className={`app-ex-collapsible-split-pane ${className || ''}`}
        onChange={(sizes, resizerIndex) => this.setState({ changedSizeInfo: { sizes, resizerIndex } })}
      >
        {leftSiderEle}
        <Pane>
          <div className={`app-ex-collapsible-split-pane__content ${mainClasses}`}>{children}</div>
        </Pane>
        {rightSiderEle}
      </SplitPane>
    );
  }
}

export default CollapsibleSplitPane;
