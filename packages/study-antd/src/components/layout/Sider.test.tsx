import { FC, useState } from 'react';
import renderer from 'react-test-renderer';
import Sider from './Sider';


const Content: FC = () => {
  const [breakpoint, setBreakpoint] = useState('sm');
  const toggleBreakpoint = () => {
    if (breakpoint === 'sm') {
      setBreakpoint('lg');
    } else {
      setBreakpoint('sm');
    }
  };
  return (
    <Sider breakpoint={breakpoint as any}><button type="button" className="toggle-btn" onClick={toggleBreakpoint}>Toggle</button></Sider>
  );
};

test('change breakpoint property', async () => {
  let rawMatchMedia = window.matchMedia;
  const add = jest.fn();
  const remove = jest.fn();
  const newMatch = jest.fn().mockImplementation(() => {
    return {
      matches: true,
      addEventListener: add,
      removeEventListener: remove,
    };
  });
  window.matchMedia = newMatch;

  let tree: renderer.ReactTestRenderer;
  renderer.act(() => {
    tree = renderer.create(<Content />);
  });
  // subscribe at first
  expect(newMatch.mock.calls.length).toBe(1);
  expect(add.mock.calls.length).toBe(1);
  expect(remove.mock.calls.length).toBe(0);

  const btn = await tree!.root.findByProps({ className: 'toggle-btn' });
  renderer.act(() => {
    btn.props.onClick();
  });

  // unsubscribe then subscribe
  expect(newMatch.mock.calls.length).toBe(2);
  expect(add.mock.calls.length).toBe(2);
  expect(remove.mock.calls.length).toBe(1);

  window.matchMedia = rawMatchMedia;
})