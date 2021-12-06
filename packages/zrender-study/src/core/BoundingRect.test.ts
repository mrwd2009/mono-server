import BoundingRect from "./BoundingRect";
import Point from './Point';
import * as matrix from './matrix';

test('BoundingRect#constructor', () => {
  const b1 = new BoundingRect(1, 2, 3, 4);
  expect(b1.x).toBe(1);
  expect(b1.y).toBe(2);
  expect(b1.width).toBe(3);
  expect(b1.height).toBe(4);
  const b2 = new BoundingRect(1, 2, -3, -4);
  expect(b2.x).toBe(-2);
  expect(b2.y).toBe(-2);
  expect(b2.width).toBe(3);
  expect(b2.height).toBe(4);
});

test('BoundingRect#union', () => {
  const b1 = new BoundingRect(1, 2, 3, 4);
  const b2 = new BoundingRect(0, 0, 4, 4);
  b1.union(b2);
  expect(b1.x).toBe(0);
  expect(b1.y).toBe(0);
  expect(b1.width).toBe(4);
  expect(b1.height).toBe(6);
});

test('BoundingRect#calculateTransform', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  const b = new BoundingRect(2, 2, 4, 4);
  const m = a.calculateTransform(b);
  expect(m[0]).toBe(2);
  expect(m[1]).toBe(0);
  expect(m[2]).toBe(0);
  expect(m[3]).toBe(2);
  expect(m[4]).toBe(2);
  expect(m[5]).toBe(2);
});

test('BoundingRect#intersect', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  const b = new BoundingRect(1, 1, 3, 3);
  const pt = new Point();
  expect(a.intersect(b, pt)).toBe(true);
  expect(pt.x).toBe(1);
  expect(pt.y).toBe(0);
});

test('BoundingRect#contain', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  expect(a.contain(0.5, 0.5)).toBe(true);
  expect(a.contain(4, 5)).toBe(false);
});

test('BoundingRect#clone', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  const b = a.clone();
  expect(b.x).toBe(0);
  expect(b.width).toBe(2);
});


test('BoundingRect#copy', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  const b = new BoundingRect(4, 5, 8, 10);
  a.copy(b);
  expect(a.x).toBe(4);
  expect(a.width).toBe(8);
});

test('BoundingRect#plain', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  const b = a.plain();
  expect(b.x).toBe(0);
  expect(b.width).toBe(2);
});

test('BoundingRect#isFinite', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  expect(a.isFinite()).toBe(true);
  a.width = Infinity;
  expect(a.isFinite()).toBe(false);
});

test('BoundingRect#isZero', () => {
  const a = new BoundingRect(0, 0, 2, 2);
  expect(a.isZero()).toBe(false);
  a.width = 0;
  a.height = 0;
  expect(a.isZero()).toBe(true);
});

test('BoundingRect.create', () => {
  const a = { x: 2, y: 2, width: 2, height: 3 };
  const b = BoundingRect.create(a);
  expect(b.x).toBe(2);
  expect(b.width).toBe(2);
  expect(b.height).toBe(3);
  expect(b.y).toBe(2);
});

test('BoudingRect.applyTransform', () => {
  let a = new BoundingRect(-1, -1, 2, 2);
  let m = matrix.create();
  matrix.scale(m, m, [2, 2]);
  matrix.translate(m, m, [1, 1]);
  BoundingRect.applyTransform(a, a, m);
  expect(a.x).toBe(-1);
  expect(a.y).toBe(-1);
  expect(a.width).toBe(4);
  expect(a.height).toBe(4);

  a = new BoundingRect(-1, -1, 2, 2);
  m = matrix.create();
  matrix.rotate(m, m, Math.PI / 2);
  BoundingRect.applyTransform(a, a, m);
  expect(a.x).toBe(-1);
  expect(a.y).toBe(-1);
  expect(a.width).toBe(2);
  expect(a.height).toBe(2);
});