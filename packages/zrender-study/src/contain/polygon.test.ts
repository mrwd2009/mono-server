import * as polygon from './polygon';

test('contain', () => {
  // convex
  let shape: number[][] = [[0.54, 1.06], [1.24, 3.26], [4.58, 2.88], [4.58, 1.02], [2.68, 0.32]];
  expect(polygon.contain(shape, 2.46, 1.72)).toBe(true);
  expect(polygon.contain(shape, 5.76, 2)).toBe(false);
  // none convex
  let shape1: number[][] = [[0.54, 1.06], [1.24, 3.26], [4.58, 2.88], [4.58, 1.02], [2.66, 2.08]];
  expect(polygon.contain(shape1, 2.62, 2.7)).toBe(true);
  expect(polygon.contain(shape1, 2.6, 1.1)).toBe(false);
  // convoluted
  let shape2: number[][] = [[0.54, 1.06], [1.24, 3.26], [4.58, 2.88], [4.58, 1.02], [2.5, 4.76]];
  expect(polygon.contain(shape2, 4.22, 2.38)).toBe(true);
  expect(polygon.contain(shape2, 3.4, 1.66)).toBe(false);
});