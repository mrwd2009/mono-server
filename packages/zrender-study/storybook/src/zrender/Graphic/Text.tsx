import { memo, FC, useEffect, useRef } from 'react';
import { init } from '../../../../src/zrender';
import ZText from '../../../../src/graphic/Text';
import '../../../../src/svg/svg';

const createText = () => {
  return new ZText({
    style: {
      text: 'ZText',
    },
    zlevel: 1,
  });
};

const createChart = (container: HTMLDivElement) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const text = createText();
  chart.add(text);
  return chart;
};

const Text: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chart = createChart(containerRef.current);
    return () => {
      chart.dispose();
    };
  }, [])
  return (
    <div ref={containerRef}></div>
  );
};

export default memo(Text);