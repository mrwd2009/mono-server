import * as matrix from './matrix';

test('create', () => {
  const a = matrix.create();
  expect(a[0]).toBe(1);
  expect(a[1]).toBe(0);
  expect(a[2]).toBe(0);
  expect(a[3]).toBe(1);
  expect(a[4]).toBe(0);
  expect(a[5]).toBe(0);
});

test('identity', () => {
  const b = matrix.create(2, 1, 1, 2, 3, 4);
  let a = matrix.identity(b);
  expect(a[0]).toBe(1);
  expect(a[1]).toBe(0);
  expect(a[2]).toBe(0);
  expect(a[3]).toBe(1);
  expect(a[4]).toBe(0);
  expect(a[5]).toBe(0);

  a = matrix.identity();
  expect(a[0]).toBe(1);
  expect(a[1]).toBe(0);
  expect(a[2]).toBe(0);
  expect(a[3]).toBe(1);
  expect(a[4]).toBe(0);
  expect(a[5]).toBe(0);
});

test('copy', () => {
  const b = matrix.create(2, 1, 1, 2, 3, 4);
  const a = matrix.create();
  matrix.copy(a, b);
  expect(a[0]).toBe(2);
  expect(a[1]).toBe(1);
  expect(a[2]).toBe(1);
  expect(a[3]).toBe(2);
  expect(a[4]).toBe(3);
  expect(a[5]).toBe(4);
});

test('mul', () => {
  const b = matrix.create(2, 1, 1, 2, 3, 4);
  const c = matrix.create();
  const a = matrix.create();
  matrix.mul(a, b, c);
  expect(a[0]).toBe(2);
  expect(a[1]).toBe(1);
  expect(a[2]).toBe(1);
  expect(a[3]).toBe(2);
  expect(a[4]).toBe(3);
  expect(a[5]).toBe(4);
});

test('translate', () => {
  const b = matrix.create(2, 1, 1, 2, 3, 4);
  const c = [2, 1];
  const a = matrix.create();
  matrix.translate(a, b, c);
  expect(a[0]).toBe(2);
  expect(a[1]).toBe(1);
  expect(a[2]).toBe(1);
  expect(a[3]).toBe(2);
  expect(a[4]).toBe(5);
  expect(a[5]).toBe(5);
});

test('rotate', () => {
  const a = matrix.create(0, 1, 2, 3, 4, 5);
  matrix.rotate(a, a, Math.PI / 2);
  expect(a[0]).toBe(1);
  expect(a[1]).toBeLessThan(0.001);
  expect(a[2]).toBe(3);
  expect(Math.abs(a[3] + 2)).toBeLessThan(0.001);
  expect(a[4]).toBe(5);
  expect(Math.abs(a[5] + 4)).toBeLessThan(0.001);
});

test('scale', () => {
  const a = matrix.create();
  const b = [0.5, 0.5];
  matrix.scale(a, a, b);
  expect(a[0]).toBe(0.5);
  expect(a[1]).toBe(0);
  expect(a[2]).toBe(0);
  expect(a[3]).toBe(0.5);
  expect(a[4]).toBe(0);
  expect(a[5]).toBe(0);
});

test('invert', () => {
  const a = matrix.create();
  matrix.invert(a, a);
  expect(a[0]).toBe(1);
  expect(Math.abs(a[1])).toBe(0);
  expect(Math.abs(a[2])).toBe(0);
  expect(a[3]).toBe(1);
  expect(Math.abs(a[4])).toBe(0);
  expect(Math.abs(a[5])).toBe(0);
});

test('clone', () => {
  const a = matrix.create(2, 1, 1, 2, 3, 4);
  matrix.clone(a);
  expect(a[0]).toBe(2);
  expect(a[1]).toBe(1);
  expect(a[2]).toBe(1);
  expect(a[3]).toBe(2);
  expect(a[4]).toBe(3);
  expect(a[5]).toBe(4);
});