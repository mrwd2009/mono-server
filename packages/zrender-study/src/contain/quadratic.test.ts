import * as quadratic from './quadratic';

test('containStroke', () => {
  expect(quadratic.containStroke(0, 0, 0.5, 0.5, 1, 0, 0.1, 0.5, 0.23)).toBe(true);
  expect(quadratic.containStroke(0, 0, 0.5, 0.5, 1, 0, 0.1, 0.5, 0.1)).toBe(false);
});