import renderer from 'react-test-renderer';
import Empty from './index';

test('default empty', () => {
  const component = renderer.create(<Empty />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('image empty', () => {
  const component = renderer.create(<Empty image="./test.png" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('empty with children', () => {
  const component = renderer.create(<Empty>Child</Empty>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});