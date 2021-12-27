import { memo, FC, useEffect, useRef } from 'react';
import { init } from '../../../../src/zrender';
import ZRText from '../../../../src/graphic/Text';
import '../../../../src/svg/svg';

type TextType = 'plain' | 'rich' | 'matrix';

const createText = (type: TextType) => {
  if (type === 'rich') {
    return new ZRText({
      x: 50,
      y: 25,
      style: {
        text: '{style1|style1}{style2|style2}{style3|style3}{style4|style4}{style5|style5}',
        rich: {
          style1: {
            align: 'left',
            backgroundColor: '#ffadd2'
          },
          style2: {
            backgroundColor: '#d6e4ff',
            lineWidth: 1,
            stroke: '#73d13d',
            fill: '#91d5ff',
            shadowBlur: 5,
            shadowColor: 'red',
            shadowOffsetX: 5,
            shadowOffsetY: 5,
          },
          style3: {
            backgroundColor: {
              image: '/logo192.png',
            },
            borderColor: '#87e8de',
            borderWidth: 1,
            borderRadius: 3,
            strokeOpacity: 0.8,
            borderDash: [2, 3],
            borderDashOffset: 4,
            textShadowBlur: 5,
            textShadowColor: 'red',
            textShadowOffsetX: 5,
            textShadowOffsetY: 5,
          },
          style4: {
            width: 200,
            backgroundColor: '#08979c',
            align: 'center',
            height: 50,
            padding: 5,
            fill: '#faad14',
          },
          style5: {
            verticalAlign: 'top',
          }
        }
      }
    });
  }
  if (type === 'matrix') {
    return new ZRText({
      x: 100,
      y: 50,
      scaleX: 2,
      scaleY: 2,
      rotation: Math.PI / 180 * 45,
      style: {
        text: 'Matrix',
        backgroundColor: '#87e8de',
      }
    })
  }
  return new ZRText({
    x: 50,
    y: 25,
    style: {
      text: 'ZText\nSecond Line Second Line',
      padding: 10,
      align: 'left',
      // backgroundColor: 'rgb(50, 233, 0)',
      backgroundColor: {
        image: '/logo192.png',
      },
      borderColor: 'rgb(255, 0, 0)',
      borderWidth: 1,
      borderRadius: 3,
      strokeOpacity: 0.8,
      borderDash: [2, 3],
      borderDashOffset: 4,
      shadowBlur: 5,
      shadowColor: 'red',
      shadowOffsetX: 5,
      shadowOffsetY: 5
    },
    zlevel: 1,
  });
};

const createChart = (container: HTMLDivElement, type: TextType) => {
  const chart = init(container, {
    width: 500,
    height: 300,
    renderer: 'svg'
  });
  const text = createText(type);
  chart.add(text);
  return chart;
};

interface Props {
  type: TextType;
};

const Text: FC<Props> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chart = createChart(containerRef.current, type);
    return () => {
      chart.dispose();
    };
  }, [type]);
  return (
    <div ref={containerRef}></div>
  );
};

export default memo(Text);