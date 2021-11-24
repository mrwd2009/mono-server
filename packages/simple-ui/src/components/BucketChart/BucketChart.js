import React, { memo, useRef, useEffect, useCallback } from 'react';
import { init, Rect, Text } from 'zrender/index';
import { stop } from 'zrender/lib/core/event';
import { createSymbol } from 'echarts/lib/util/symbol';
import SliderZoomModel from 'echarts/lib/component/dataZoom/SliderZoomModel';
import forEach from 'lodash/forEach';
import clamp from 'lodash/clamp';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import ResizeObserver from 'rc-resize-observer';

const {
  defaultOption: {
    handleIcon,
    handleStyle,
    emphasis: {
      handleStyle: emHandleStyle,
    }
  }
} = SliderZoomModel;

// only support horizontal direction now
class Bucket {
  constructor({
    width = 0,
    height = 0,
    offset = 0,
    isFirst = true,
    isLast = true,
    draggable = true,
    padding = 1,
    text: outText = '',
    drift,
    dragEnd,
    textSize = 14,
    textColor = 'white',
    borderColor = null,
    bgColor = 'rgba(0, 0, 0, 0.5)',
  } = {}) {
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.isFirst = isFirst;
    this.isLast = isLast;
    this.draggable = draggable;
    this.drift = drift;
    this.dragEnd = dragEnd;
    this.padding = padding;
    const handle = createSymbol(handleIcon, -3, 0, 6, height, null, false);
    handle.attr({
      cursor: 'ew-resize',
      z2: 5,
      style: {
        stroke: handleStyle.borderColor,
        fill: handleStyle.color,
        strokeNoScale: true,
      },
      rectHover: true,
      draggable,
      drift: this.handleDrift,
      ondragend: this.handleDragEnd,
      onmouseover: () => {
        handle.attr({
          style: {
            stroke: emHandleStyle.borderColor,
          },
        });
      },
      onmouseout: () => {
        handle.attr({
          style: {
            stroke: handleStyle.borderColor,
          }
        })
      },
    });
    handle.transform = [1, 0, 0, 1, offset + width - 1, 0];
    handle.decomposeTransform();
    this.handle = handle;
    if (isLast || !draggable) {
      this.handle.hide();
    }

    let r = [0, 0, 0, 0];
    if (isFirst) {
      r[0] = 4;
      r[3] = 4;
    }
    if (isLast) {
      r[1] = 4;
      r[2] = 4;
    }
    const rH = height - padding * 2;
    const rW = this.getRectWidth();
    let rectProps = {};
    if (borderColor) {
      rectProps = {
        strokeWidth: 1,
        stroke: borderColor,
      };
    }
    const rect = new Rect({
      cursor: 'default',
      shape: {
        x: padding,
        y: padding,
        r,
        height: rH,
        width: rW,
      },
      style: {
        ...rectProps,
        fill: bgColor,
      },
      transform: [1, 0, 0, 1, offset, 0],
      draggable: false,
    });
    rect.transform = [1, 0, 0, 1, offset, 0];
    rect.decomposeTransform();
    this.rect = rect;

    const text = new Text({
      style: {
        textAlign: 'center',
        textVerticalAlign: 'middle',
        fontFamily: 'Roboto, sans-serif',
        fontSize: textSize,
        fontWeight: 500,
        text: outText,
        fill: textColor,
      },
      z2: 3,
    });
    const textB = text.getBoundingRect();
    text.transform = [1, 0, 0, 1, offset + Math.floor((rW - textB.width) / 2), Math.floor((rH - textB.height) / 2)];
    text.decomposeTransform();
    this.text = text;
  }

  getRectWidth() {
    if (this.isLast) {
      return Math.max(this.width - this.padding * 2, 0);
    }
    if (this.draggable) {
      return Math.max(this.width - this.padding * 2 - 2, 0); // 2 extra pixel for handle;
    }
    return Math.max(this.width - this.padding * 2, 0);
  }

  add(render) {
    render.add(this.rect);
    render.add(this.handle);
    render.add(this.text);
  }

  handleDrift = (dx, dy, event) => {
    stop(event.event);
    if (this.drift) {
      return this.drift(dx, dy);
    }
    this.update({ width: this.width + dx })
  }

  handleDragEnd = () => {
    if (this.dragEnd) {
      this.dragEnd(this);
    }
  }

  update({ width, offset } = {}) {
    const nWidth = width || this.width;
    const nOffset = offset || this.offset;
    this.width = nWidth;
    this.offset = nOffset;
    this.handle.transform[4] = nOffset + nWidth - 1;
    this.handle.decomposeTransform();
    this.handle.markRedraw();
    this.rect.transform[4] = nOffset;
    this.rect.decomposeTransform();
    const rectWidth = this.getRectWidth();
    this.rect.attr({
      shape: {
        width: rectWidth,
      },
    });
    const textB = this.text.getBoundingRect();
    this.text.transform[4] = nOffset + Math.floor((rectWidth - textB.width) / 2);
    this.text.decomposeTransform();
    this.text.markRedraw();
  }
}

// buckets definition
// Array<{
//   percent: number,
//   text: string,
//   bgColor: string
// }>

const createChart = ({ container, buckets = [], height = 38, draggable = true, onChange } = {}) => {
  const zr = init(container, { renderer: 'svg', height, width: 'auto' });
  let curOnChange = onChange;
  let curBuckets = buckets;

  const bucketCharList = [];
  let width = zr.getWidth();
  const handleDrift = (index, dx) => {
    const cur = bucketCharList[index];
    const next = bucketCharList[index + 1];
    const min = cur.offset;
    const wholeWidth = cur.width + next.width;
    const curWidth = clamp(cur.width + dx, 6, wholeWidth - 6);
    cur.update({
      width: curWidth,
    });
    next.update({
      width: wholeWidth - curWidth,
      offset: min + curWidth,
    });
    handleChange(index);
  };
  let handleChange = (index) => {
    if (curOnChange) {
      const newValue = map(bucketCharList, (chart, index) => {
        return {
          text: curBuckets[index].text,
          bgColor: curBuckets[index].bgColor,
          percent: (chart.width < 24 ? (chart.width - 6) : chart.width) / width,
        };
      });
      curOnChange(newValue, index);
    }
  };
  const rawHandleChange = handleChange;
  handleChange = debounce(handleChange, 200);
  let aWidth = 0;
  const lastIndex = buckets.length - 1;
  forEach(buckets, (item, index) => {
    let itemW = 0;
    if (index === lastIndex) {
      itemW = width - aWidth;
    } else {
      itemW = width * item.percent;
    }
    const bucketChart = new Bucket({
      offset: aWidth,
      height,
      text: item.text,
      textSize: item.textSize,
      textColor: item.textColor,
      borderColor: item.borderColor,
      bgColor: item.bgColor,
      width: itemW,
      isFirst: index === 0,
      isLast: index === lastIndex,
      draggable,
      drift: handleDrift.bind(null, index),
      dragEnd: () => {
        handleChange.cancel();
        rawHandleChange(index);
      },
    });
    bucketChart.add(zr);
    bucketCharList.push(bucketChart);
    aWidth += itemW;
  });

  const update = ({ buckets, onChange }) => {
    width = zr.getWidth();
    curBuckets = buckets;
    curOnChange = onChange;
    let _aWidth = 0;
    forEach(bucketCharList, (chart, index) => {
      const itemW = width * curBuckets[index].percent;
      chart.update({
        width: itemW,
        offset: _aWidth,
      });
      _aWidth += itemW;
    });
  };

  const resize = () => {
    zr.resize();
  };
  return {
    dispose: () => {
      zr.dispose();
      handleChange.cancel();
    },
    update,
    resize,
  };
};

const BucketChart = ({ className, style, value: buckets = [], onChange, height = 38, draggable = true }) => {
  const divRef = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = createChart({ container: divRef.current, buckets, onChange, height, draggable });
      return;
    }
    chartRef.current.update({
      buckets,
      onChange,
    });
  }, [divRef, chartRef, buckets, height, onChange, draggable]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, []);

  const setWidth = useCallback(debounce(() => {
    if (chartRef.current) {
      chartRef.current.resize();
      chartRef.current.update({
        buckets,
        onChange,
      });
    }
  }, 200), [buckets, onChange]);
  useEffect(() => {
    return () => {
      // cancel debounce timer.
      setWidth.cancel();
    };
  }, [setWidth]);
  return (
    <ResizeObserver onResize={setWidth}>
      <div className={className} style={style} ref={divRef} />
    </ResizeObserver>
  );
};

export default memo(BucketChart);