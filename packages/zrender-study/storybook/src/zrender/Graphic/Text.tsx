import { memo, FC, useEffect, useRef } from 'react';
import { init } from '../../../../src/zrender';
import ZText from '../../../../src/graphic/Text';
import '../../../../src/svg/svg';

const createText = () => {
  return new ZText({
    x: 100,
    y: 50,
    style: {
      text: 'ZText\nSecond Line',
      padding: 10,
      align: 'left',
      borderColor: 'rgb(255, 0, 0)',
      borderWidth: 1
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