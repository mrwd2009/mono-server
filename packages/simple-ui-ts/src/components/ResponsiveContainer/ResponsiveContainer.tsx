import { FC, memo, useState, ReactNode } from 'react';
import forEach from 'lodash/forEach';
import ResizeObserver from 'rc-resize-observer';
import BreakpointContext from './contexts/BreakpointContext';

const list = [
  {
    id: 'xs',
    range: [0, 576]
  },
  {
    id: 'sm',
    range: [576, 768]
  },
  {
    id: 'md',
    range: [768, 992]
  },
  {
    id: 'lg',
    range: [992, 1200]
  },
  {
    id: 'xl',
    range: [1200, 1600]
  },
  {
    id: 'xxl',
    range: [1600, Infinity]
  },
]
const ResponsiveContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState('xs');

  return (
    <ResizeObserver
      onResize={({ width }) => {
        forEach(list, item => {
          if (width >= item.range[0] && width < item.range[1]) {
            setBreakpoint(item.id);
            return false;
          }
        })
      }}
    >
      <div className={`app-ex-resp-c-${breakpoint}`}>
        <BreakpointContext.Provider value={breakpoint}>
          {children}
        </BreakpointContext.Provider>
      </div>
    </ResizeObserver>
  );
};

export default memo(ResponsiveContainer);