import { memo, FC, useEffect, useRef, useState } from 'react';
import { init } from '../../../../src/zrender';
import Rect from '../../../../src/graphic/shape/Rect';
import ZRText from '../../../../src/graphic/Text';

import '../../../../src/svg/svg';

type ElementType = 'primary';

const createElement = (type: ElementType) => {
  const text = new ZRText({
    name: 'text',
    x: 50,
    y: 50,
    scaleX: 1,
    scaleY: 1,
    style: {
      text: 'Inner Text',
      backgroundColor: '#87e8de',
    },
    z: 2,
  });
  const rect2 = new Rect({
    name: 'rect2',
    shape: {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    },
    style: {
      stroke: '#52c41a',
      fill: 'none',
    },
  });
  const rect = new Rect({
    name: 'rect',
    textContent: text,
    textConfig: {
      local: false,
      origin: [0, 0],
      offset: [10, 10],
      rotation: Math.PI / 4,
      position: 'insideTop',
      distance: 0,
      layoutRect: {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      }
    },
    shape: {
      x: 50,
      y: 50,
      width: 50,
      height: 50,
    },
    style: {
      stroke: '#52c41a',
      fill: 'none',
    },
  });
  return {
    rect,
    rect2,
  };
};

const createChart = (container: HTMLDivElement, type: ElementType) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const {
    rect,
    rect2,
  } = createElement(type);
  chart.add(rect);
  chart.add(rect2);
  return {
    chart,
    element: rect,
  };
};

interface Props {
  type: ElementType;
};

const GroupT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState('');
  useEffect(() => {
    const { chart, element } = createChart(containerRef.current, type);
    setState(JSON.stringify(element.getBoundingRect(), null, 2) + `\n ${element.name}`);
    return () => {
      chart.dispose();
    };
  }, [type]);
  return (
    <>
      <div ref={containerRef}></div>
      <pre>
        { state }
      </pre>
    </>
  );
};

export default memo(GroupT);