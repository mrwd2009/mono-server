import { memo, FC, useRef, useEffect } from 'react';
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
  onChartInit?: (chart: EChartsType) => void;
  onChartDispose?: (chart: EChartsType) => void;
}

const CustomECharts: FC<Props> = ({ option, className, width, height, onChartInit, onChartDispose }, ref) => {
  const classNameStr = classNames('app-ex-custom-echarts', className);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<EChartsType>();
  const { theme } = useTheme();
  const prevThemeRef = useRef<string>();

  // save callback ref
  const onChartInitRef = useRef<any>();
  onChartInitRef.current = onChartInit;
  const onChartDisposeRef = useRef<any>();
  onChartDisposeRef.current = onChartDispose;

  // save chart size ref
  const sizeRef = useRef<{ width?: number, height?: number}>();
  sizeRef.current = {
    width,
    height,
  };
  const resizeFnRef = useRef(debounce(() => {
    chartInstanceRef.current?.resize();
  }, 200));

  useEffect(() => {
    if (containerRef.current) {
      const chartTheme = theme === 'dark' ? 'dark' : 'default';
      const initOpt = {
        enderer: 'svg',
        ...sizeRef.current,
      };
      if (chartInstanceRef.current) {
        if (prevThemeRef.current !== theme) {
          onChartDisposeRef.current?.(chartInstanceRef.current);
          chartInstanceRef.current.dispose();
          chartInstanceRef.current = init(containerRef.current, chartTheme, initOpt);
          onChartInitRef.current?.(chartInstanceRef.current);
        }
      } else {
        chartInstanceRef.current = init(containerRef.current, chartTheme, initOpt);
        onChartInitRef.current?.(chartInstanceRef.current);
      }
      prevThemeRef.current = chartTheme;
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
      onChartDisposeRef.current?.(chartInstanceRef.current);
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

export default memo(CustomECharts);
