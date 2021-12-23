import { normalizeLineDash } from './dashStyle';

test('normalizeLineDash', () => {
  expect(normalizeLineDash('solid')).toBe(null);
  expect(normalizeLineDash('')).toBe(null);
  expect(normalizeLineDash('dashed', 0)).toBe(null);
  expect(normalizeLineDash('dashed', 1)).toEqual([4, 2]);
  expect(normalizeLineDash('dotted', 1)).toEqual([1]);
  expect(normalizeLineDash(1, 2)).toEqual([1]);
  expect(normalizeLineDash([2, 1], 1)).toEqual([2, 1]);
  expect(normalizeLineDash('yoyo', 1)).toBe(null);
});