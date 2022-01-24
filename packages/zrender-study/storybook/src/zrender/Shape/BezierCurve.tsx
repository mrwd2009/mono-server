import { FC, useRef, useEffect, useState } from 'react';
import { init, BezierCurve, Rect, ZRenderType } from '../../../../index';

interface Props {
  type: string;
}

const createPrimaryBezier = (chart: ZRenderType) => {
  const rect = new Rect({
    shape: {
      x: 50,
      y: 20,
      width: 150,
      height: 60,
    },
    style: {
      stroke: '#5b8c00',
      fill: 'none',
    },
  });
  const bezier = new BezierCurve({
    shape: {
      x1: 50,
      y1: 50,
      x2: 200,
      y2: 50,
      cpx1: 100,
      cpy1: 20,
      cpx2: 150,
      cpy2: 80,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  (chart as any).text = `bezier.pointAt(0.5): ${bezier.pointAt(0.5)} bezier.tangentAt(0.5):${bezier.tangentAt(0.5)} bezier.tangentAt(0.1): ${bezier.tangentAt(0.1)}`
  chart
    .add(rect);
  chart.add(bezier);
};

const createPartialBezier = (chart: ZRenderType) => {
  const rect = new Rect({
    shape: {
      x: 50,
      y: 20,
      width: 150,
      height: 60,
    },
    style: {
      stroke: '#5b8c00',
      fill: 'none',
    },
  });
  const bezier = new BezierCurve({
    shape: {
      x1: 50,
      y1: 50,
      x2: 200,
      y2: 50,
      cpx1: 100,
      cpy1: 20,
      cpx2: 150,
      cpy2: 80,
      percent: 0.6
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  // bezier.animateTo({ shape: { percent: 1 }}, { duration: 500 })
  chart
    .add(rect);
  chart.add(bezier);
};

const createChart = (container: HTMLDivElement, type: string) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg',
  });
  if (type === 'primary') {
    createPrimaryBezier(chart);
  } else if (type === 'partial') {
    createPartialBezier(chart);
  }
  return {
    chart,
  };
};

const BezierT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  useEffect(() => {
    const { chart } = createChart(containerRef.current, type);
    if ((chart as any).text) {
      setText((chart as any).text);
    }
    return () => {
      chart.dispose();
    };
  }, [type]);

  return (
    <>
      <div ref={containerRef} />
      {text}
    </>
  );
};

export default BezierT;