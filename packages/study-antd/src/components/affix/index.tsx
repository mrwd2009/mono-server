import * as React from 'react';
import classNames from 'classnames';
import omit from '../../dependents/util/src/omit';
import ResizeObserver from 'rc-resize-observer';
import { ConfigContext } from '../config-provider';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';

import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom,
} from './utils';

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  style?: React.CSSProperties;
  onChange?: (affixed?: boolean) => void;
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
  children: React.ReactNode;
}

enum AffixStatus {
  None,
  Prepare,
}

export interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;
  prevTarget: Window | HTMLElement | null;
}

class Affix extends React.Component<AffixProps, AffixState> {
  static contextType = ConfigContext;

  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
    prevTarget: null,
  };

  placeholderNode: HTMLDivElement | undefined;

  fixedNode: HTMLDivElement | undefined;

  private timeout: any = null;

  private getTargetFunc() {
    const { getTargetContainer } = this.context;
    const { target } = this.props;

    if (target !== undefined) {
      return target;
    }

    return getTargetContainer || getDefaultTarget;
  }

  componentDidMount() {
    const targetFunc = this.getTargetFunc();
    if (targetFunc) {
      this.timeout = setTimeout(() => {
        addObserveTarget(targetFunc(), this);
        this.updatePosition();
        this.timeout = null;
      });
    }
  }

  componentDidUpdate(prevProps: AffixProps) {
    const { prevTarget } = this.state;
    const targetFunc = this.getTargetFunc();
    const newTarget = targetFunc?.() || null;

    if (prevTarget !== newTarget) {
      removeObserveTarget(this);
      if (newTarget) {
        addObserveTarget(newTarget, this);
        this.updatePosition();
      }

      this.setState({ prevTarget: newTarget });
    }

    if (prevProps.offsetTop !== this.props.offsetTop || prevProps.offsetBottom !== this.props.offsetBottom) {
      this.updatePosition();
    }

    this.measure();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    removeObserveTarget(this);
    (this.updatePosition as any).cancel();
    (this.lazyUpdatePosition as any).cancel();
  }

  getOffsetTop = () => {
    const { offsetBottom, offsetTop } = this.props;
    return (offsetBottom === undefined && offsetTop === undefined) ? 0 : offsetTop;
  }

  getOffsetBottom = () => this.props.offsetBottom;

  savePlaceholderNode = (node: HTMLDivElement) => {
    this.placeholderNode = node;
  };

  saveFixedNode = (node: HTMLDivElement) => {
    this.fixedNode = node;
  };

  measure = () => {
    const { status, lastAffix } = this.state;
    const { onChange } = this.props;
    const targetFunc = this.getTargetFunc();
    if (status !== AffixStatus.Prepare || !this.fixedNode || !this.placeholderNode || !targetFunc) {
      return;
    }

    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();

    const targetNode = targetFunc();
    if (!targetNode) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    const targetRect = getTargetRect(targetNode);
    const placeholderRect = getTargetRect(this.placeholderNode);
    const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
      newState.placeholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
      newState.placeholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    }

    newState.lastAffix = !!newState.affixStyle;
    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix);
    }

    this.setState(newState as AffixState);
  };

  prepareMeasure = () => {
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });

    if (process.env.NODE_ENV === 'test') {
      const { onTestUpdatePosition } = this.props as any;
      onTestUpdatePosition?.();
    }
  };

  updatePosition = throttleByAnimationFrame(() => {
    this.prepareMeasure();
  })

  lazyUpdatePosition = throttleByAnimationFrame(() => {
    const targetFunc = this.getTargetFunc();
    const { affixStyle } = this.state;

    if (targetFunc && affixStyle) {
      const offsetTop = this.getOffsetTop();
      const offsetBottom = this.getOffsetBottom();

      const targetNode = targetFunc();
      if (targetNode && this.placeholderNode) {
        const targetRect = getTargetRect(targetNode);
        const placeholderReact = getTargetRect(this.placeholderNode);
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }

    this.prepareMeasure();
  });

  render() {
    const { getPrefixCls } = this.context;
    const { affixStyle, placeholderStyle } = this.state;
    const { prefixCls, children } = this.props;
    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: !!affixStyle,
    });

    let props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
    // Omit this since `onTestUpdatePosition` only works on test.
    if (process.env.NODE_ENV === 'test') {
      props = omit(props as typeof props & { onTestUpdatePosition: any }, ['onTestUpdatePosition']);
    }

    return (
      <ResizeObserver
        onResize={() => {
          this.updatePosition();
        }}
      >
        <div {...props} ref={this.savePlaceholderNode}>
          {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
          <div className={className} ref={this.saveFixedNode} style={affixStyle}>
            <ResizeObserver
              onResize={() => {
                this.updatePosition();
              }}
            >
              {children}
            </ResizeObserver>
          </div>
        </div>
      </ResizeObserver>
    );
  }
}

export default Affix;