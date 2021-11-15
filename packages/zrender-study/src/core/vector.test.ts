import * as vec from './vector';

test('create', () => {
  const v = vec.create(1, 2);
  expect(v[0]).toBe(1);
  expect(v[1]).toBe(2);
});

test('copy', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create();
  vec.copy(v2, v1);
  expect(v2[0]).toBe(1);
  expect(v2[1]).toBe(2);
});

test('clone', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.clone(v1);
  expect(v2[0]).toBe(1);
  expect(v2[1]).toBe(2);
});

test('set', () => {
  const v1 = vec.create(1, 2);
  vec.set(v1, 3, 4);
  expect(v1[0]).toBe(3);
  expect(v1[1]).toBe(4);
});

test('add', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  const out = vec.create();
  vec.add(out, v1, v2);
  expect(out[0]).toBe(4);
  expect(out[1]).toBe(6);
});

test('scaleAndAdd', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  const out = vec.create();
  vec.scaleAndAdd(out, v1, v2, 2);
  expect(out[0]).toBe(7);
  expect(out[1]).toBe(10);
});

test('sub', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  const out = vec.create();
  vec.sub(out, v1, v2);
  expect(out[0]).toBe(-2);
  expect(out[1]).toBe(-2);
});

test('lenSquare', () => {
  const v1 = vec.create(1, 2);
  expect(vec.lenSquare(v1)).toBe(5);
});

test('len', () => {
  const v1 = vec.create(2, 2);
  expect(vec.len(v1) - Math.sqrt(8)).toBeLessThan(0.01);
});

test('mul', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  const out = vec.create();
  vec.mul(out, v1, v2);
  expect(out[0]).toBe(3);
  expect(out[1]).toBe(8);
});

test('div', () => {
  const v1 = vec.create(3, 4);
  const v2 = vec.create(1, 2);
  const out = vec.create();
  vec.div(out, v1, v2);
  expect(out[0]).toBe(3);
  expect(out[1]).toBe(2);
});

test('dot', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  expect(vec.dot(v1, v2)).toBe(11);
});

test('scale', () => {
  const v1 = vec.create(1, 2);
  const out = vec.create();
  vec.scale(out, v1, 2);
  expect(out[0]).toBe(2);
  expect(out[1]).toBe(4);
});

test('normalize', () => {
  const v1 = vec.create(2, 2);
  const out = vec.create();
  vec.normalize(out, v1);
  expect(out[0] - 2 / Math.sqrt(8)).toBeLessThan(0.01);
  expect(out[1] - 2 / Math.sqrt(8)).toBeLessThan(0.01);

  const v2 = vec.create(0, 0);
  vec.normalize(out, v2);
  expect(out[0]).toBe(0);
  expect(out[1]).toBe(0);
});

test('distance', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  expect(vec.distance(v1, v2) - Math.sqrt(8)).toBeLessThan(0.01);
});

test('distanceSquare', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(3, 4);
  expect(vec.distanceSquare(v1, v2)).toBe(8);
});

test('negate', () => {
  const v1 = vec.create(1, 2);
  const out = vec.create();
  vec.negate(out, v1);
  expect(out[0]).toBe(-1);
  expect(out[1]).toBe(-2);
});

test('lerp', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(4, 6);
  const out = vec.create();
  vec.lerp(out, v1, v2, 0.5);
  expect(out[0]).toBe(2.5);
  expect(out[1]).toBe(4);
});

test('applyTransform', () => {
  const matrix = [0, 1, 2, 3, 4, 5];
  const v1 = vec.create(2, 3);
  const out = vec.create();
  vec.applyTransform(out, v1, matrix);
  expect(out[0]).toBe(10);
  expect(out[1]).toBe(16);
});

test('min', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(2, 1);
  const out = vec.create();
  vec.min(out, v1, v2);
  expect(out[0]).toBe(1);
  expect(out[1]).toBe(1);
});

test('max', () => {
  const v1 = vec.create(1, 2);
  const v2 = vec.create(2, 1);
  const out = vec.create();
  vec.max(out, v1, v2);
  expect(out[0]).toBe(2);
  expect(out[1]).toBe(2);
});