import { memo, FC, useEffect, useRef, useState } from 'react';
import { init, ZRenderType } from '../../../../src/zrender';
import Rect from '../../../../src/graphic/shape/Rect';
import ZRText from '../../../../src/graphic/Text';
import Path from '../../../../src/graphic/Path';
import type PathProxy from '../../../../src/core/PathProxy';
import type { Dictionary } from '../../../../src/core/types';

import '../../../../src/svg/svg';

type ElementType = 'primary' | 'draggable' | 'clippath';

class ElementPath extends Path {
  buildPath(path: PathProxy, shape: Dictionary<any>) {
    path.moveTo(shape.x, shape.y);
    path.lineTo(shape.x + shape.width, shape.y);
    path.lineTo(shape.x + shape.width, shape.y + shape.height);
    path.lineTo(shape.x, shape.y + shape.height);
    path.closePath();
  }
}

const createTextContent = (chart: ZRenderType) => {
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
      // offset: [10, 10],
      // rotation: Math.PI / 4,
      position: 'left',
      outsideStroke: 'auto',
      outsideFill: 'none',
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
  chart.add(rect);
  chart.add(rect2);
  return {
    element: rect,
  };
}

const createDraggable = (chart: ZRenderType) => {
  const element = new Rect({
    shape: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    },
    scaleX: 2,
    scaleY: 2,
    draggable: true,
    style: {
      fill: 'cyan',
    }
  });
  chart.add(element);
  return {
    element,
  };
};

const createClipPath = (chart: ZRenderType) => {
  const clipPath2 = new ElementPath({
    name: 'clipath2',
    shape: {
      x: 90,
      y: 90,
      width: 20,
      height: 20,
    },
  });
  const clipPath = new ElementPath({
    name: 'clipath',
    shape: {
      x: 80,
      y: 80,
      width: 40,
      height: 40,
    },
    clipPath: clipPath2,
  });
  const rect = new Rect({
    name: 'react',
    shape: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    },
    style: {
      stroke:  'none',
      fill: 'cyan',
    },
    clipPath,
  });

  chart.add(rect);

  return {
    element: rect
  };
};

const createElement = (type: ElementType, chart: ZRenderType) => {
  if (type === 'primary') {
    return createTextContent(chart);
  }
  if (type === 'draggable') {
    return createDraggable(chart);
  }
  if (type === 'clippath') {
    return createClipPath(chart);
  }
};

const createChart = (container: HTMLDivElement, type: ElementType) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const {
    element
  } = createElement(type, chart);
  return {
    chart,
    element,
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