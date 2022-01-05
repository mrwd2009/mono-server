import { memo, FC } from 'react';
import './color.less';

type ColorType = 'primary';

interface Props {
  type: ColorType;
}

const Color: FC<Props> = ({ type }) => {
  return (
    <div>
      {
        ['blue', 'purple', 'cyan', 'green', 'magenta', 'pink', 'red', 'orange', 'yellow', 'volcano', 'geekblue', 'lime', 'gold'].map(color => {
          return (
            <div key={color}>
              <div>{color}</div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                return <div className={`${color}-${num}`} key={num} />
              })}
            </div>
          )
        })
      }
    </div>
  );
}

export default memo(Color);