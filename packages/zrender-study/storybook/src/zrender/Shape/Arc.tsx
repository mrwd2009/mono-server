import { FC, useRef, useEffect } from 'react';
import { init, Arc, ZRenderType } from '../../../../index'

interface Props {
  type: string;
}

const createPrimaryArc = (chart: ZRenderType) => {
  const arc = new Arc({
    shape: {
      cx: 50,
      cy: 50,
      r: 50,
      startAngle: 0,
      endAngle: Math.PI
    },
    style: {
      stroke: 'cyan',
      fill: 'none'
    }
  });
  chart.add(arc);
};

const createAntiClockwiseArc = (chart: ZRenderType) => {
  const arc = new Arc({
    shape: {
      cx: 50,
      cy: 50,
      r: 50,
      startAngle: 0,
      endAngle: Math.PI / 180 * 45,
      clockwise: true,
    },
    style: {
      stroke: 'cyan',
      fill: 'none'
    }
  });
  chart.add(arc);
};

const createChart = (container: HTMLDivElement, type: string) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  if (type === 'primary') {
    createPrimaryArc(chart);
  } else if (type === 'anticlockwise') {
    createAntiClockwiseArc(chart);
  }
  return {
    chart,
  };
};

const ArcT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { chart } = createChart(containerRef.current, type);
    return () => {
      chart.dispose();
    };
  }, [type]);
  return (
    <>
      <div ref={containerRef}></div>
    </>
  );
};

export default ArcT;