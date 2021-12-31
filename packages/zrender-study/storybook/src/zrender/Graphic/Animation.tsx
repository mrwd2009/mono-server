import { memo, FC, useEffect, useRef, useState } from 'react';
import { init } from '../../../../src/zrender';
// import ZRImage from '../../../../src/graphic/Image';
// import ZRText from '../../../../src/graphic/Text';
// import Group from '../../../../src/graphic/Group';
import Path from '../../../../src/graphic/Path';
import type PathProxy from '../../../../src/core/PathProxy';
import type { Dictionary } from '../../../../src/core/types';
import { ElementAnimateConfig } from '../../../../src/Element';


import '../../../../src/svg/svg';
type PathType = 'primary' | 'cubic' | 'rect' | 'position' | 'config' | 'additive';

class TestPath extends Path {
  buildPath(path: PathProxy, shape: Dictionary<any>) {
    if (shape.type === 'cubic') {
      path.moveTo(200, 50);
      path.bezierCurveTo(150, 75, 250, 100, 200, 125);
      return;
    }
    if (shape.type === 'rect') {
      path.rect(50, 50, 100, 100);
      // path.closePath();
      return;
    }

    if (shape.type === 'position' || shape.type === 'config' || shape.type === 'additive') {
      path.rect(50, 50, 50, 50);
      return;
    }
    path.moveTo(100, 50);
    path.lineTo(200, 50);
    path.quadraticCurveTo(250, 25, 300, 50);
    path.bezierCurveTo(250, 75, 350, 100, 300, 125);
    // path.lineTo(75, 125);
    // path.closePath();
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
      fill: 'none',
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

const PathT: FC<ElementAnimateConfig & Props> = ({ type, duration = 2000, delay, easing = 'linear', additive = false  }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState('');
  const pathRef = useRef<Path>(null);
  const statusRef = useRef<any>({});
  const [statusStr, setStatusStr] = useState('');

  const initialStyle = {
    stroke: '#ffd666',
    strokePercent: 0,
  };
  const handleStart = () => {
    const path = pathRef.current;
    path.stopAnimation();
    if (type === 'config') {
      path.attr({
        x: 0,
        y: 0,
      });
      path.animateTo({
        x: 200,
        y: 50
      }, {
        duration,
        delay,
        easing,
        during: (percent) => {
          statusRef.current.percent = percent;
        },
        done: () => {
          statusRef.current.aborted = false;
          statusRef.current.done = true;
        },
        aborted: () => {
          statusRef.current.done = false;
          statusRef.current.aborted = true;
        },
        scope: 'config',
      });
      return;
    }
    if (type === 'position') {
      path.attr('style', {
        stroke: '#ffd666',
        strokePercent: 1,
      });
      path.attr({
        x: 0,
      });
      return path.animateTo({
        x: 200,
        y: 25
      }, {
        duration,
        delay,
        easing,
      }, {
        y: false,
        x: true
      })
    }
    path.attr('style', initialStyle);
    path.animateTo({
      style: {
        stroke: '#ff4d4f',
        strokePercent: 1,
      },
    }, {
      duration,
      delay,
      easing,
    });
  };

  const handleReset = () => {
    const path = pathRef.current;
    path.stopAnimation();
    setStatusStr(JSON.stringify(statusRef.current, null, 2));
    // path.attr('style', initialStyle);
  };

  const additiveStart1 = () => {
    const path = pathRef.current;
    path.animateTo({
      x: 100,
    }, {
      duration,
      delay,
      easing,
      additive,
    });
  };

  const additiveStart2 = () => {
    const path = pathRef.current;
    path.animateTo({
      x: 200,
    }, {
      duration,
      delay,
      easing,
      additive,
    });
  };

  const addtiveInit = () => {
    const path = pathRef.current;
    path.stopAnimation();
    path.attr({
      x: 0,
      y: 0,
    });
  };

  const additiveStop = () => {
    const path = pathRef.current;
    path.stopAnimation();
  };

  useEffect(() => {
    const { chart, path } = createChart(containerRef.current, type);
    pathRef.current = path;
    setState(JSON.stringify(path.getBoundingRect(), null, 2));
    return () => {
      chart.dispose();
    };
  }, [type]);
  return (
    <>
      {
        type === 'additive' ? (
          <>
            <button onClick={addtiveInit}>Init</button>
            <button onClick={additiveStart1}>Start1</button>
            <button onClick={additiveStart2}>Start2</button>
            <button onClick={additiveStop}>Stop</button>
          </>
        ) : (
          <><button onClick={handleStart}>Start</button> <button onClick={handleReset}>Stop</button></>
        )
      }
      <div ref={containerRef}></div>
      <pre>
        { statusStr }
        { state }
      </pre>
    </>
  );
};

export default memo(PathT);