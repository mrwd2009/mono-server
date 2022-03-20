import React, { PureComponent, cloneElement, ReactNode, CSSProperties } from 'react';
import Resizer from './Resizer';
import Pane from './Pane';

const DEFAULT_PANE_SIZE = '1';
const DEFAULT_PANE_MIN_SIZE = '0';
const DEFAULT_PANE_MAX_SIZE = '100%';

interface Props {
  allowResize?: boolean;
  children?: ReactNode,
  className?: string;
  split?: 'vertical' | 'horizontal';
  resizerSize?: number;
  onResizeStart?: () => void;
  onResizeEnd?: (size: number[]) => void;
  onChange?: (size: number[]) => void;
  style?: CSSProperties;
}

function convert(str: any, size: any) {
  const tokens = str.match(/([0-9]+)([px|%]*)/);
  const value = tokens[1];
  const unit = tokens[2];
  return toPx(value, unit, size);
}

function toPx(value: any, unit = 'px', size: any) {
  switch (unit) {
    case '%': {
      return +(size * value / 100).toFixed(2);
    }
    default: {
      return +value;
    }
  }
}

function removeNullChildren(children: any) {
  return React.Children.toArray(children).filter(c => c);
}

export function getUnit(size: any) {
  if(size.endsWith('px')) {
    return 'px';
  }

  if(size.endsWith('%')) {
    return '%';
  }

  return 'ratio';
}

export function convertSizeToCssValue(value: any, resizersSize: any) {
  if(getUnit(value) !== '%') {
    return value;
  }

  if (!resizersSize) {
    return value;
  }

  const idx = value.search('%');
  const percent = value.slice(0, idx) / 100;
  if (percent === 0) {
    return value;
  }

  return `calc(${value} - ${resizersSize}px*${percent})`
}

function convertToUnit(size: any, unit: any, containerSize?: any) {
  switch(unit) {
    case '%':
      return `${(size / containerSize * 100).toFixed(2)}%`;
    case 'px':
      return `${size.toFixed(2)}px`;
    case 'ratio':
      return (size * 100).toFixed(0);
  }
}

class SplitPane extends PureComponent<Props, any> {
  static defaultProps = {
    split: 'vertical',
    resizerSize: 1,
    allowResize: true
  };

  paneElements: any;
  resizerIndex: any;
  dimensionsSnapshot: any;
  startClientX: any;
  startClientY: any;
  splitPane: any;

  constructor(props: any) {
    super(props);

    this.state = {
      sizes: this.getPanePropSize(props)
    };
  }

  // componentWillReceiveProps(nextProps: any) {
  //   this.setState({sizes: this.getPanePropSize(nextProps)});
  // }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onMouseUp);
  }

  onMouseDown = (event: any, resizerIndex: any) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    this.onDown(resizerIndex, event.clientX, event.clientY);
  }

  onTouchStart = (event: any, resizerIndex: any) => {
    event.preventDefault();

    const {clientX, clientY} = event.touches[0];

    this.onDown(resizerIndex, clientX, clientY);
  }

  onDown = (resizerIndex: any, clientX: any, clientY: any) => {
    const { allowResize, onResizeStart } = this.props;

    if (!allowResize) {
      return;
    }

    this.resizerIndex = resizerIndex;
    this.dimensionsSnapshot = this.getDimensionsSnapshot(this.props);
    this.startClientX = clientX;
    this.startClientY = clientY;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onMouseUp);
    document.addEventListener('touchcancel', this.onMouseUp);

    if (onResizeStart) {
      onResizeStart();
    }
  }

  onMouseMove = (event: any) => {
    event.preventDefault();

    this.onMove(event.clientX, event.clientY);
  }

  onTouchMove = (event: any) => {
    event.preventDefault();

    const {clientX, clientY} = event.touches[0];

    this.onMove(clientX, clientY);
  }

  onMouseUp = (event: any) => {
    event.preventDefault();

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onMouseUp);
    document.addEventListener('touchcancel', this.onMouseUp);

    if (this.props.onResizeEnd) {
      this.props.onResizeEnd(this.state.sizes);
    }
  }

  getDimensionsSnapshot(props: any) {
    const split = props.split;
    const paneDimensions = this.getPaneDimensions();
    const splitPaneDimensions = this.splitPane.getBoundingClientRect();
    const minSizes = this.getPanePropMinMaxSize(props, 'minSize');
    const maxSizes = this.getPanePropMinMaxSize(props, 'maxSize');

    const resizersSize = this.getResizersSize(removeNullChildren(this.props.children));
    const splitPaneSizePx = split === 'vertical'
      ? splitPaneDimensions.width - resizersSize
      : splitPaneDimensions.height - resizersSize;

    const minSizesPx = minSizes.map(s => convert(s, splitPaneSizePx));
    const maxSizesPx = maxSizes.map(s => convert(s, splitPaneSizePx));
    const sizesPx = paneDimensions.map((d: any) => split === 'vertical' ? d.width : d.height);

    return {
      resizersSize,
      paneDimensions,
      splitPaneSizePx,
      minSizesPx,
      maxSizesPx,
      sizesPx
    };
  }

  getPanePropSize(props: any) {
    return removeNullChildren(props.children).map((child: any) => {
      const value = child.props['size'] || child.props['initialSize'];
      if (value === undefined) {
        return DEFAULT_PANE_SIZE;
      }
      
      return String(value);
    });
  }

  getPanePropMinMaxSize(props: any, key: any) {
    return removeNullChildren(props.children).map((child: any) => {
      const value = child.props[key];
      if (value === undefined) {
        return key === 'maxSize' ? DEFAULT_PANE_MAX_SIZE : DEFAULT_PANE_MIN_SIZE;
      }
      
      return value;
    });
  }

  getPaneDimensions() {
    return this.paneElements.filter((el: any) => el).map((el: any) => el.getBoundingClientRect());
  }

  getSizes() {
      return this.state.sizes;
  }

  onMove(clientX: any, clientY: any) {
    const { split, onChange } = this.props;
    const resizerIndex = this.resizerIndex;
    const {
      sizesPx,
      minSizesPx,
      maxSizesPx,
      splitPaneSizePx,
      paneDimensions
    } = this.dimensionsSnapshot;

    const sizeDim = split === 'vertical' ? 'width' : 'height';
    const primary = paneDimensions[resizerIndex];
    const secondary = paneDimensions[resizerIndex + 1];
    const maxSize = primary[sizeDim] + secondary[sizeDim];

    const primaryMinSizePx = minSizesPx[resizerIndex];
    const secondaryMinSizePx = minSizesPx[resizerIndex + 1];
    const primaryMaxSizePx = Math.min(maxSizesPx[resizerIndex], maxSize);
    const secondaryMaxSizePx = Math.min(maxSizesPx[resizerIndex + 1], maxSize);

    const moveOffset = split === 'vertical'
      ? this.startClientX - clientX
      : this.startClientY - clientY;

    let primarySizePx = primary[sizeDim] - moveOffset;
    let secondarySizePx = secondary[sizeDim] + moveOffset;

    let primaryHasReachedLimit = false;
    let secondaryHasReachedLimit = false;

    if (primarySizePx < primaryMinSizePx) {
      primarySizePx = primaryMinSizePx;
      primaryHasReachedLimit = true;
    } else if (primarySizePx > primaryMaxSizePx){
      primarySizePx = primaryMaxSizePx;
      primaryHasReachedLimit = true;
    }

    if (secondarySizePx < secondaryMinSizePx) {
      secondarySizePx = secondaryMinSizePx;
      secondaryHasReachedLimit = true;
    } else if (secondarySizePx > secondaryMaxSizePx){
      secondarySizePx = secondaryMaxSizePx;
      secondaryHasReachedLimit = true;
    }

    if (primaryHasReachedLimit) {
      secondarySizePx = primary[sizeDim] + secondary[sizeDim] - primarySizePx;
    } else if (secondaryHasReachedLimit) {
      primarySizePx = primary[sizeDim] + secondary[sizeDim] - secondarySizePx;
    }

    sizesPx[resizerIndex] = primarySizePx;
    sizesPx[resizerIndex + 1] = secondarySizePx;

    let sizes = this.getSizes().concat();
    let updateRatio;

    [primarySizePx, secondarySizePx].forEach((paneSize, idx) => {
      const unit = getUnit(sizes[resizerIndex + idx]);
      if (unit !== 'ratio') {
        sizes[resizerIndex + idx] = convertToUnit(paneSize, unit, splitPaneSizePx);
      } else {
        updateRatio = true;
      }
    });

    if (updateRatio) {
      let ratioCount = 0;
      let lastRatioIdx: any;
      sizes = sizes.map((size: any, idx: any) => {
        if (getUnit(size) === 'ratio') {
          ratioCount++;
          lastRatioIdx = idx;

          return convertToUnit(sizesPx[idx], 'ratio');
        }

        return size;
      });

      if (ratioCount === 1) {
        sizes[lastRatioIdx] = '1';
      }
    }

    onChange && onChange(sizes);

    this.setState({
      sizes
    });
  }

  setPaneRef = (idx: any, el: any) => {
    if (!this.paneElements) {
      this.paneElements = [];
    }

    this.paneElements[idx] = el;
  }

  getResizersSize(children: any) {
    return (children.length - 1) * this.props.resizerSize!;
  }

  render() {
    const { className, split, style } = this.props;
    const notNullChildren = removeNullChildren(this.props.children)
    const sizes = this.getSizes();
    const resizersSize = this.getResizersSize(notNullChildren);

    const elements = notNullChildren.reduce((acc: any, child: any, idx: any) => {
      let pane;
      const resizerIndex = idx - 1;
      const isPane = child.type === Pane;
      const paneProps: any = {
        index: idx,
        'data-type': 'Pane',
        split: split,
        key: `Pane-${idx}`,
        innerRef: this.setPaneRef,
        resizersSize,
        size: sizes[idx]
      };

      if (isPane) {
        pane = cloneElement(child, paneProps);
      } else {
        pane = <Pane {...paneProps}>{child}</Pane>;
      }

      if (acc.length === 0) {
        return [...acc, pane];
      } else {
        const resizer = (
          <Resizer
            index={resizerIndex}
            key={`Resizer-${resizerIndex}`}
            split={split}
            onMouseDown={ this.onMouseDown}
            onTouchStart={this.onTouchStart}
          />
        );

        return [...acc, resizer, pane];
      }
    }, []);

    const dClass = split === 'vertical' ? 'app-ex-split-pane-row' : 'app-ex-split-pane-col';

    return (
      <div
        className={`${dClass} ${className || ''}`}
        data-type='SplitPane'
        data-split={split}
        ref={(el: any) => {
          this.splitPane = el;
        }}
        style={style}
      >
        {elements}
      </div>
    );
  }
}

export default SplitPane;
