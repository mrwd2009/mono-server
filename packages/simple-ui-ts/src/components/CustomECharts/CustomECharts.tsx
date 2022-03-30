import { memo, forwardRef, ForwardRefRenderFunction, useRef, useEffect, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { EChartsType, init } from 'echarts/core';
import debounce from 'lodash/debounce';
import ResizeObserver from 'rc-resize-observer';
import { ECOption } from '../../util';
import { useTheme } from '../../hooks';

interface Props {
  option: ECOption;
  className?: string;
  width?: number;
  height?: number;
}

interface RefObj {
  getChartIns: () => EChartsType | undefined;
}

const CustomECharts: ForwardRefRenderFunction<RefObj, Props> = ({ option, className, width, height }, ref) => {
  const classNameStr = classNames('app-ex-custom-echarts', className);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<EChartsType>();
  const { theme } = useTheme();
  const prevThemeRef = useRef<string>();
  const sizeRef = useRef<{ width?: number, height?: number}>();
  sizeRef.current = {
    width,
    height,
  };
  const resizeFnRef = useRef(debounce(() => {
    chartInstanceRef.current?.resize();
  }, 200));

  useImperativeHandle(ref, () => ({
    getChartIns: () => chartInstanceRef.current,
  }), []);

  useEffect(() => {
    if (containerRef.current) {
      const chartTheme = theme === 'dark' ? 'dark' : 'default';
      const initOpt = {
        enderer: 'svg',
        ...sizeRef.current,
      };
      if (chartInstanceRef.current) {
        if (prevThemeRef.current !== theme) {
          chartInstanceRef.current.dispose();
          chartInstanceRef.current = init(containerRef.current, chartTheme, initOpt);
        }
      } else {
        chartInstanceRef.current = init(containerRef.current, chartTheme, initOpt);
      }
      prevThemeRef.current = theme;
      chartInstanceRef.current.setOption(option);
    }
  }, [theme, option]);

  useEffect(() => {
    if (width && height && chartInstanceRef.current) {
      chartInstanceRef.current.resize({ width, height });
    }
  }, [width, height]);

  useEffect(() => {
    // only destroy once
    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null as any;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      resizeFnRef.current?.cancel();
    };
  }, []);

  return (
    <ResizeObserver
      onResize={() => {
        resizeFnRef.current?.();
      }}
    >
      <div
        className={classNameStr}
      >
        <div ref={containerRef} />
      </div>
    </ResizeObserver>
  );
};

export default memo(forwardRef(CustomECharts));
