import { memo, FC, useEffect, useRef, useState } from 'react';
import { init } from '../../../../src/zrender';
import ZRImage from '../../../../src/graphic/Image';
import ZRText from '../../../../src/graphic/Text';
import Group from '../../../../src/graphic/Group';

import '../../../../src/svg/svg';

type GroupType = 'primary';

const createGroup = (type: GroupType) => {
  const group = new Group({
    name: 'group',
    x: 50,
    y: 25,
  });
  const text = new ZRText({
    name: 'text',
    x: 100,
    y: 50,
    scaleX: 1,
    scaleY: 1,
    rotation: Math.PI / 180 * 0,
    style: {
      text: 'Matrix',
      backgroundColor: '#87e8de',
    },
    z: 2,
  });
  const image = new ZRImage({
    name: 'image',
    x: 50,
    y: 25,
    style: {
      image: '/logo192.png',
      width: 100,
      height: 50
    },
    z: 1,
  });

  const image2 = new ZRImage({
    name: 'image2',
    x: 25,
    y: 25,
    style: {
      image: '/logo192.png',
      width: 100,
      height: 50
    },
    z: 1,
  });

  group.add(text)
    .add(image);
  group.addBefore(image2, image);
  group.remove(image2);
  group.replace(image, image2);
  let output = `
    childrenRef: ${group.childrenRef().length}
    children: ${group.children().length}
    childAt: ${group.childAt(1).name}
    childOfName: ${group.childOfName('text').name}
    childCount: ${group.childCount()}
  `;
  group.eachChild((el) => {
    output += el.name;
  });
  group.traverse((el) => {
    output += el.name;
  });
  group.name = output;
  return group;
};

const createChart = (container: HTMLDivElement, type: GroupType) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const group = createGroup(type);
  chart.add(group);
  return {
    chart,
    group,
  };
};

interface Props {
  type: GroupType;
};

const GroupT: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState('');
  useEffect(() => {
    const { chart, group } = createChart(containerRef.current, type);
    setState(JSON.stringify(group.getBoundingRect(), null, 2) + `\n ${group.name}`);
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