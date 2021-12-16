import * as line from './line';

test('containStroke', () => {
  expect(line.containStroke(0, 0, 10, 10, 2, 2, 2)).toBe(true);
  expect(line.containStroke(0, 0, 10, 10, 2, 2, 5)).toBe(false);
});