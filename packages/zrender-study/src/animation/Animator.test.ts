import * as animator from './Animator';

test('interpolateNumber', () => {
  expect(animator.interpolateNumber(1, 2, 0.5)).toBeCloseTo(1.5);
});

test('step', () => {
  expect(animator.step(1, 2, 0.5)).toBe(1);
  expect(animator.step(1, 2, 0.6)).toBe(2);
});

test('interpolate1DArray', () => {
  const out = [0, 0, 0];
  const p0 = [1, 2, 3];
  const p1 = [2, 3, 4];
  animator.interpolate1DArray(out, p0, p1, 0.5);
  expect(out[0]).toBeCloseTo(1.5);
  expect(out[1]).toBeCloseTo(2.5);
  expect(out[2]).toBeCloseTo(3.5);
});

test('interpolate2DArray', () => {
  const out: Array<Array<number>> = [];
  const p0 = [[0, 1, 2], [3, 4, 5, 6]];
  const p1 = [[1, 2, 3], [4, 5, 6, 7]];
  animator.interpolate2DArray(out, p0, p1, 0.5);
  expect(out[0][0]).toBe(0.5);
  expect(out[0][1]).toBe(1.5);
  expect(out[0][2]).toBe(2.5);
  expect(out[1][0]).toBe(3.5);
  expect(out[1][1]).toBe(4.5);
  expect(out[1][2]).toBe(5.5);
  expect(out[1][3]).toBe(6.5);
});

test('add1DArray', () => {
  const out: Array<number> = [];
  const p0 = [1,2,3];
  const p1 = [2,3,4];
  animator.add1DArray(out, p0, p1, 1);

  expect(out[0]).toBe(3);
  expect(out[1]).toBe(5);
  expect(out[2]).toBe(7);
});

test('add2DArray', () => {
  const out: Array<Array<number>> = [];
  const p0 = [[1,2,3], [4,5,6,7]];
  const p1 = [[2,3,4], [5,6,7,8]];

  animator.add2DArray(out, p0, p1, 1);
  expect(out[0][0]).toBe(3);
  expect(out[0][1]).toBe(5);
  expect(out[0][2]).toBe(7);
  expect(out[1][0]).toBe(9);
  expect(out[1][1]).toBe(11);
  expect(out[1][2]).toBe(13);
  expect(out[1][3]).toBe(15);
});

test('fillArray', () => {
  const out: any = [];
  const p0 = [1,2,3,4];
  animator.fillArray(out, p0, 1);
  expect(out[0]).toBe(1);
  expect(out[1]).toBe(2);
  expect(out[2]).toBe(3);
  expect(out[3]).toBe(4);

  const out1: any = [];
  const p1 = [[2,3,4], [4,5]];
  animator.fillArray(out1, p1, 2);
  expect(out1[0][0]).toBe(2);
  expect(out1[0][1]).toBe(3);
  expect(out1[0][2]).toBe(4);
  expect(out1[1][0]).toBe(4);
  expect(out1[1][1]).toBe(5);
  expect(out1[1][2]).toBeUndefined();
});

test('is1DArraySame', () => {
  const a = [1,2];
  const b = [2,3];
  expect(animator.is1DArraySame(a, b)).toBeFalsy();
  expect(animator.is1DArraySame([1,2], [1,2])).toBeTruthy();
  expect(animator.is1DArraySame([1, 2], [1,2,3])).toBeFalsy();
});

test('cloneVaue', () => {
  const a = [1,3];
  const ret = animator.cloneValue(a) as number[];
  expect(a === ret).toBeFalsy();
  expect(ret[0]).toBe(1);
  expect(ret[1]).toBe(3);
  expect(animator.cloneValue('test')).toBe('test');
});

test('rgba2String', () => {
  expect(animator.rgba2String([244, 2, 3])).toBe('rgba(244,2,3)');
});

test('guessArrayDim', () => {
  expect(animator.guessArrayDim([[1]])).toBe(2);
  expect(animator.guessArrayDim([])).toBe(1);
});

test('catmullRomInterpolate', () => {
  expect(animator.catmullRomInterpolate(0, 1, 3, 5, 0, 0, 0)).toBe(1);
  expect(animator.catmullRomInterpolate(0, 1, 3, 5, 1, 1, 1)).toBe(3);
});

test('catmullRomInterpolate1DArray', () => {
  let out: number[] = [];
  animator.catmullRomInterpolate1DArray(out, [1, 2], [3, 4], [5, 6], [7, 8], 0, 0, 0);
  expect(out[0]).toBe(3);
  expect(out[1]).toBe(4);
  out = [];
  animator.catmullRomInterpolate1DArray(out, [1, 2], [3, 4], [5, 6], [7, 8], 1, 1, 1);
  expect(out[0]).toBe(5);
  expect(out[1]).toBe(6);
});

test('catmullRomInterpolate2DArray', () => {
  let out: number[][] = [[]];
  animator.catmullRomInterpolate2DArray(out, [[1, 2], [3,4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]], 0, 0, 0);
  expect(out[0][0]).toBe(5);
  expect(out[0][1]).toBe(6);
  expect(out[1][0]).toBe(7);
  expect(out[1][1]).toBe(8);
  out = [[]];
  animator.catmullRomInterpolate2DArray(out, [[1, 2], [3,4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]], 1, 1, 1);
  expect(out[0][0]).toBe(9);
  expect(out[0][1]).toBe(10);
  expect(out[1][0]).toBe(11);
  expect(out[1][1]).toBe(12);
});