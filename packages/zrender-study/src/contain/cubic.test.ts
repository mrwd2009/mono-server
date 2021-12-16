import * as cubic from './cubic';

test('containStroke', () => {
  expect(cubic.containStroke(0, 0, 0.25, 0.5, 0.75, -0.5, 1, 0, 0.1, 0.25, 0.02)).toBe(false);
  expect(cubic.containStroke(0, 0, 0.25, 0.5, 0.75, -0.5, 1, 0, 0.1, 0.25, 0.12)).toBe(true);
})