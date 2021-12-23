import { memo, FC, useEffect, useRef } from 'react';
import { init } from '../../../../src/zrender';
import ZText from '../../../../src/graphic/Text';
import '../../../../src/svg/svg';

const createText = (container: HTMLDivElement) => {
  const chart = init(container, {
    width: 500,
    height: 400,
    renderer: 'svg'
  });
  const text = new ZText({
    style: {
      text: 'ZText',
    }
  });
  chart.add(text);
  return chart;
};

const Text: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chart = createText(containerRef.current);
    return () => {
      chart.dispose();
    };
  }, [])
  return (
    <div ref={containerRef}></div>
  );
};

export default memo(Text);