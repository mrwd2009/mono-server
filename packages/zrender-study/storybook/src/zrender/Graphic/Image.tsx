import { memo, FC, useEffect, useRef, useState } from 'react';
import { init } from '../../../../src/zrender';
import ZRImage from '../../../../src/graphic/Image';
import '../../../../src/svg/svg';

type ImageType = 'primary';

const createImage = (type: ImageType) => {
  return new ZRImage({
    x: 50,
    y: 25,
    style: {
      image: '/logo192.png',
      width: 100,
      height: 50
    },
    zlevel: 1,
  });
};

const createChart = (container: HTMLDivElement, type: ImageType) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const image = createImage(type);
  chart.add(image);
  return {
    chart,
    image,
  };
};

interface Props {
  type: ImageType;
};

const ZRImageT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState('');
  useEffect(() => {
    const { chart, image } = createChart(containerRef.current, type);
    setState(JSON.stringify(image.getBoundingRect(), null, 2));
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

export default memo(ZRImageT);