import { FC, useEffect, useRef } from 'react';
import { init, Circle, ZRenderType } from '../../../../index';

interface Props {
  type: string;
}

const createPrimary = (chart: ZRenderType) => {
  const circle = new Circle({
    shape: {
      cx: 100,
      cy: 100,
      r: 50,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });

  chart.add(circle);
};

const createChart = (container: HTMLDivElement, type: string) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg',
  });
  if (type === 'primary') {
    createPrimary(chart);
  }
  return {
    chart,
  };
};

const CircleT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { chart } = createChart(containerRef.current, type);
    return () => {
      chart.dispose();
    };
  }, [type]);

  return (
    <div ref={containerRef} />
  );
};

export default CircleT;