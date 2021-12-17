import * as bbox from './bbox';

test('fromPoints', () => {
  let points: number[][] = [[1, 2], [3, 4], [5, 1]];

  let min: number[] = [];
  let max: number[] = [];

  bbox.fromPoints(points, min, max);
  expect(min).toEqual([1, 1]);
  expect(max).toEqual([5, 4]);
});

test('fromLine', () => {
  let min: number[] = [];
  let max: number[] = [];

  bbox.fromLine(0, 0, 1, -2, min, max);
  expect(min).toEqual([0, -2]);
  expect(max).toEqual([1, 0]);
});

test('fromCubic', () => {
  let min: number[] = [];
  let max: number[] = [];

  bbox.fromCubic(0, 0, 0.294, 0.668, 0.663, -0.675, 1, 0, min, max);
  expect(min[0]).toBe(0);
  expect(min[1]).toBeCloseTo(-0.2);
  expect(max[0]).toBe(1);
  expect(max[1]).toBeCloseTo(0.192);
});

test('fromDuadratic', () => {
  let min: number[] = [];
  let max: number[] = [];

  bbox.fromQuadratic(0, 0, 0.5, 0.5, 1, 0, min, max);
  expect(min[0]).toBe(0);
  expect(min[1]).toBe(0);
  expect(max[0]).toBe(1);
  expect(max[1]).toBeLessThan(0.3);
});

test('fromArc', () => {
  let min: number[] = [];
  let max: number[] = [];

  bbox.fromArc(0, 0, 1, 1, 0, Math.PI / 2, false, min, max);
  expect(min[0]).toBeCloseTo(0);
  expect(min[1]).toBeCloseTo(0);
  expect(max[0]).toBeCloseTo(1);
  expect(max[1]).toBeCloseTo(1);
});