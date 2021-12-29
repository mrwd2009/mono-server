import { memo, FC, useEffect, useRef, useState } from 'react';
import { init } from '../../../../src/zrender';
// import ZRImage from '../../../../src/graphic/Image';
// import ZRText from '../../../../src/graphic/Text';
// import Group from '../../../../src/graphic/Group';
import Path from '../../../../src/graphic/Path';
import type PathProxy from '../../../../src/core/PathProxy';
import type { Dictionary } from '../../../../src/core/types';


import '../../../../src/svg/svg';
type PathType = 'primary' | 'rect' | 'arc1' | 'arc2' | 'arc3';

class TestPath extends Path {
  buildPath(path: PathProxy, shape: Dictionary<any>) {
    if (shape.type === 'primary') {
      path.moveTo(50, 25);
      path.lineTo(50, 50);
      path.quadraticCurveTo(75, 100, 100, 50);
      path.bezierCurveTo(50, 75, 125, 100, 100, 125);
      path.lineTo(75, 125);
    } else if (shape.type === 'rect') {
      path.rect(50, 50, 100, 100);
    } else if (shape.type === 'arc1') {
      path.arc(100, 100, 50, 0, Math.PI / 2);
    } else if (shape.type === 'arc2') {
      path.arc(100, 100, 50, 0, -Math.PI / 2, true);
    } else if (shape.type === 'arc3') {
      path.arc(100, 100, 50, 0, Math.PI * 2);
    }
    path.closePath();
  }
}

const createPath = (type: PathType) => {
  const path = new TestPath({
    name: 'path',
    shape: {
      type,
    },
    style: {
      stroke: '#52c41a',
      fill: '#87e8de',
    }
  });
  return path;
};

const createChart = (container: HTMLDivElement, type: PathType) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const path = createPath(type);
  chart.add(path);
  return {
    chart,
    path,
  };
};

interface Props {
  type: PathType;
};

const PathT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState('');
  useEffect(() => {
    const { chart, path } = createChart(containerRef.current, type);
    setState(JSON.stringify(path.getBoundingRect(), null, 2));
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

export default memo(PathT);