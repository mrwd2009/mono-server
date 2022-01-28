import { FC, useEffect, useRef } from 'react';
import { init, Droplet, Rect, Ellipse, Heart, ZRenderType, Isogon, Line, Polygon, Ring, Rose, Sector, Star, Trochoid } from '../../../../index';

interface Props {
  type: string;
}

const createDroplet = (chart: ZRenderType) => {
  const rect = new Rect({
    shape: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  const shape = new Droplet({
    shape: {
      cx: 100,
      cy: 100,
      width: 50,
      height: 50,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  chart.add(rect);
  chart.add(shape);
};

const createEllipse = (chart: ZRenderType) => {
  const rect = new Rect({
    shape: {
      x: 70,
      y: 50,
      width: 60,
      height: 100,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  const shape = new Ellipse({
    shape: {
      cx: 100,
      cy: 100,
      rx: 30,
      ry: 50,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  chart.add(rect);
  chart.add(shape);
};

const createHeart = (chart: ZRenderType) => {
  const rect = new Rect({
    shape: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  const shape = new Heart({
    shape: {
      cx: 100,
      cy: 100,
      width: 50,
      height: 50,
    },
    style: {
      stroke: 'cyan',
      fill: 'none',
    },
  });
  chart.add(rect);
  chart.add(shape);
};

const createRestShape = (chart: ZRenderType, type: string) => {
  let shape: any;
  if (type === 'isogon') {
    shape = new Isogon({
      shape: {
        x: 100,
        y: 100,
        r: 50,
        n: 6,
      }
    });
  } else if (type === 'line') {
    shape = new Line({
      shape: {
        x1: 50,
        y1: 50,
        x2: 100,
        y2: 100,
      }
    });
  } else if (type === 'polygon') {
    shape = new Polygon({
      shape: {
        points: [[40, 40], [60, 40], [70, 60], [50, 100]]
      }
    });
  } else if (type === 'ring') {
    shape = new Ring({
      shape: {
        cx: 100,
        cy: 100,
        r: 50,
        r0: 20,
      }
    });
  } else if (type === 'rose') {
    shape = new Rose({
      shape: {
        cx: 100,
        cy: 100,
        r: [20],
        k: 2,
        n: 1
      }
    })
  } else if (type === 'sector') {
    shape = new Sector({
      shape: {
        cx: 100,
        cy: 100,
        r0: 30,
        r: 60,
        endAngle: Math.PI * 0.5
      }
    })
  } else if (type === 'star') {
    shape = new Star({
      shape: {
        cx: 100,
        cy: 100,
        n: 6,
        r0: 40,
        r: 60
      }
    })
  } else if (type === 'trochoid') {
    shape = new Trochoid({
      shape: {
        cx: 100,
        cy: 100,
        r: 40,
        r0: 10,
        d: 40
      },
    });
  }
  chart.add(shape);
};

const createChart = (container: HTMLDivElement, type: string) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg',
  });
  if (type === 'droplet') {
    createDroplet(chart);
  } else if (type === 'ellipse') {
    createEllipse(chart);
  } else if (type === 'heart') {
    createHeart(chart);
  } else {
    createRestShape(chart, type);
  }
  return {
    chart,
  };
};

const ShapeT: FC<Props> = ({ type }) => {
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

export default ShapeT;