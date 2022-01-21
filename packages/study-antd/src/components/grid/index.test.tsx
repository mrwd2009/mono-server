import { memo, useRef, FC, useState, useContext } from 'react';
import renderer from 'react-test-renderer';
import Row from './row';
import RowContext from './RowContext';

let CacheInner: FC = () => {
  useContext(RowContext);
  const countRef = useRef(0);
  countRef.current += 1;
  return (
    <div>inner render count{countRef.current}</div>
  );
};
CacheInner = memo(CacheInner);

const CacheOuter: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>Render</button>
      <Row>
        <CacheInner />
      </Row>
    </div>
  );
}

test('cached row context', () => {
  window.matchMedia = jest.fn().mockImplementation(() => {
    return {
      matches: true,
      addListener: () => {},
      removeListener: () => {},
    };
  });
  const tree = renderer.create(<CacheOuter />);
  let result: any = tree.toJSON();
  const initRender = result.children[1].children[0];
  // click once
  renderer.act(() => {
    result.children[0].props.onClick();
  });
  result = tree.toJSON();
  expect(initRender).toEqual(result.children[1].children[0]);

  // click twice
  renderer.act(() => {
    result.children[0].props.onClick();
  });
  result = tree.toJSON();
  expect(initRender).toEqual(result.children[1].children[0]);
});