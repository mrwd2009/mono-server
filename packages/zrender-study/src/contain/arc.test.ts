import * as arc from './arc';

test('containStroke', () => {
  expect(arc.containStroke(0, 0, 2, 0, Math.PI / 2, false, 1, 1, 1)).toBe(true);
  expect(arc.containStroke(0, 0, 2, 0, Math.PI / 2, false, 1, 0.5, 0.5)).toBe(false);
})