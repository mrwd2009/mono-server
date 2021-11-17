import Transformable from "./Transformable";
import * as vector from './vector';
import * as matrix from './matrix';

test('setLocalTransform', () => {
  const t = new Transformable();
  const tb = (rDeg: number, sDeg: number) => {
    const scale = matrix.create();
    matrix.scale(scale, scale, [2, 2]);
    const rotate = matrix.create();
    const rotateRad = rDeg / 180 * Math.PI;
    matrix.rotate(rotate, rotate, rotateRad);
    const skewRad = sDeg/ 180 * Math.PI;
    const skew = matrix.create(1, 0, Math.tan(skewRad), 1, 0, 0);
    const newMatrix = matrix.create();
    matrix.mul(newMatrix, scale, newMatrix);
    matrix.mul(newMatrix, skew, newMatrix);
    matrix.mul(newMatrix, rotate, newMatrix);
    t.setLocalTransform(newMatrix);
    expect(Math.abs(t.skewX - skewRad)).toBeLessThan(0.0001);
    expect(Math.abs(t.scaleX - 2)).toBeLessThan(0.0001);
    expect(Math.abs(t.scaleY - 2)).toBeLessThan(0.0001);
    expect(Math.abs(t.skewY)).toBe(0);
    expect(Math.abs(t.rotation - rotateRad)).toBeLessThan(0.0001);
  };
  t.setLocalTransform();
  tb(-45, -55);
  tb(130, 75);
  tb(-130, -75);
});

test('static#getLocalTransform', () => {
  const t = new Transformable();
  t.originX = 0;
  t.originY = 0;
  t.scaleX = 1;
  t.scaleY = 1;
  t.x = 0;
  t.y = 0;
  t.skewX = 0;
  t.skewY = 0;
  const m = matrix.create();
  Transformable.getLocalTransform(t, m);
  expect(m[0]).toBe(1);
  expect(m[1]).toBe(0);
  expect(m[2]).toBe(0);
  expect(m[3]).toBe(1);
  expect(m[4]).toBe(0);
  expect(m[5]).toBe(0);
  t.originY = 2;
  t.originX = 2;
  t.scaleX = 2;
  t.scaleY = 2;
  t.rotation = 30 / 180 * Math.PI;
  t.x = 2;
  t.y = 2;
  t.skewX = 45 / 180 * Math.PI;
  t.skewY = 45 / 180 * Math.PI;
  Transformable.getLocalTransform(t, m);
  expect(m[0] - 0.73).toBeLessThan(0.1);
  expect(m[1] + 2.73).toBeLessThan(0.1);
  expect(m[2] - 2.73).toBeLessThan(0.1);
  expect(m[3] - 0.73).toBeLessThan(0.1);
  expect(m[4] + 2.92).toBeLessThan(0.1);
  expect(m[5] - 7.99).toBeLessThan(0.1);
});

test('getLocalTransform', () => {
  const t = new Transformable();
  const m = t.getLocalTransform();
  expect(m[0]).toBe(1);
  expect(m[1]).toBe(0);
  expect(m[2]).toBe(0);
  expect(m[3]).toBe(1);
  expect(m[4]).toBe(0);
  expect(m[5]).toBe(0);
});

test('setPosition', () => {
  const t = new Transformable();
  t.setPosition([1, 2]);
  expect(t.x).toBe(1);
  expect(t.y).toBe(2);
});

test('setScale', () => {
  const t = new Transformable();
  t.setScale([1, 2]);
  expect(t.scaleX).toBe(1);
  expect(t.scaleY).toBe(2);
});

test('setSkew', () => {
  const t = new Transformable();
  t.setSkew([1, 2]);
  expect(t.skewX).toBe(1);
  expect(t.skewY).toBe(2);
});

test('setOrigin', () => {
  const t = new Transformable();
  t.setOrigin([1, 2]);
  expect(t.originX).toBe(1);
  expect(t.originY).toBe(2);
});

test('setRotation', () => {
  const t = new Transformable();
  t.setRotation(3);
  expect(t.rotation).toBe(-3);
});

test('needLocalTransform', () => {
  const t = new Transformable();
  t.rotation = 1;
  expect(t.needLocalTransform()).toBeTruthy();
  t.rotation = 0;
  expect(t.needLocalTransform()).toBeFalsy();
  t.x = 1;
  expect(t.needLocalTransform()).toBeTruthy();
  t.x = 0;
  expect(t.needLocalTransform()).toBeFalsy();
  t.y = 1;
  expect(t.needLocalTransform()).toBeTruthy();
  t.y = 0;
  expect(t.needLocalTransform()).toBeFalsy();
  t.scaleX = 1.1;
  expect(t.needLocalTransform()).toBeTruthy();
  t.scaleX = 1;
  expect(t.needLocalTransform()).toBeFalsy();
  t.scaleY = 1.1;
  expect(t.needLocalTransform()).toBeTruthy();
  t.scaleY = 1;
  expect(t.needLocalTransform()).toBeFalsy();
});

test('getGlobalScale', () => {
  const t = new Transformable();
  const v = vector.create();
  t.getGlobalScale(v);
  expect(v[0]).toBe(1);
  expect(v[1]).toBe(1);
  t.transform = matrix.create(2, 0, 0, 2, 0, 0);
  t.getGlobalScale(v);
  expect(v[0]).toBe(2);
  expect(v[1]).toBe(2);
  t.transform = matrix.create(-2, 0, 0, -2, 0, 0);
  t.getGlobalScale(v);
  expect(v[0]).toBe(-2);
  expect(v[1]).toBe(-2);
});

test('updateTransform', () => {
  const parent = new Transformable();
  parent.updateTransform();

  let t = new Transformable();
  t.updateTransform();
  expect(t.transform[0]).toBe(1);
  expect(t.transform[1]).toBe(0);
  expect(t.transform[2]).toBe(0);
  expect(t.transform[3]).toBe(1);
  expect(t.transform[4]).toBe(0);
  expect(t.transform[5]).toBe(0);

  t.updateTransform();
  expect(t.transform[0]).toBe(1);
  expect(t.transform[1]).toBe(0);
  expect(t.transform[2]).toBe(0);
  expect(t.transform[3]).toBe(1);
  expect(t.transform[4]).toBe(0);
  expect(t.transform[5]).toBe(0);

  t.parent = parent;
  t.updateTransform();
  expect(t.transform[0]).toBe(1);
  expect(t.transform[1]).toBe(0);
  expect(t.transform[2]).toBe(0);
  expect(t.transform[3]).toBe(1);
  expect(t.transform[4]).toBe(0);
  expect(t.transform[5]).toBe(0);

  t.scaleX = 2;
  t.updateTransform();
  expect(t.transform[0]).toBe(2);
  expect(t.transform[1]).toBe(0);
  expect(t.transform[2]).toBe(0);
  expect(t.transform[3]).toBe(1);
  expect(t.transform[4]).toBe(0);
  expect(t.transform[5]).toBe(0);

  t.globalScaleRatio = 2;
  t.scaleX = 2;
  t.updateTransform();
  expect(t.transform[0]).toBe(3);
  expect(t.transform[1]).toBe(0);
  expect(t.transform[2]).toBe(0);
  expect(t.transform[3]).toBe(1);
  expect(t.transform[4]).toBe(0);
  expect(t.transform[5]).toBe(0);

  t.globalScaleRatio = -2;
  t.scaleX = -2;
  t.updateTransform();
  expect(t.transform[0]).toBe(1);
  expect(t.transform[1]).toBe(0);
  expect(t.transform[2]).toBe(0);
  expect(t.transform[3]).toBe(1);
  expect(t.transform[4]).toBe(0);
  expect(t.transform[5]).toBe(0);
});

test('getComputedTransform', () => {
  const parent = new Transformable({ scaleX: 2 });
  parent.updateTransform();

  let t = new Transformable();
  t.updateTransform();
  t.parent = parent;

  const m = t.getComputedTransform();
  expect(m[0]).toBe(2);
  expect(m[1]).toBe(0);
  expect(m[2]).toBe(0);
  expect(m[3]).toBe(1);
  expect(m[4]).toBe(0);
  expect(m[5]).toBe(0);
});

test('decomposeTransform', () => {
  // expect(new Transformable().decomposeTransform()).toBeUndefined();
  const t = new Transformable({ skewX: 0.3, x: 5, y: 6, rotation: 30 * Math.PI / 180, scaleX: 3, scaleY: 5 });
  t.decomposeTransform();
  const parent = new Transformable({
    scaleX: 2,
    scaleY: 3,
    rotation: 30 * Math.PI / 180,
    originX: 2,
    originY: 3,
    x: 5,
    y: 6,
  });
  t.parent = parent;
  t.getComputedTransform();
  // const str = (_t: Transformable) => {
  //   return `scaleX: ${_t.scaleX};scaleY: ${_t.scaleY};rotation: ${_t.rotation / Math.PI * 180};originX: ${_t.originX};originY: ${_t.originY};x: ${_t.x};y: ${_t.y}`
  // };
  t.decomposeTransform();

  expect(t.scaleX).toBeCloseTo(3);
  expect(t.scaleY).toBeCloseTo(5);
  expect(t.x).toBeCloseTo(5);
  expect(t.y).toBeCloseTo(6);
  expect(t.rotation).toBeCloseTo(30 * Math.PI / 180);
  expect(t.skewX).toBeCloseTo(0.3);
});

test('transformCoodToLocal', () => {
  const t = new Transformable({ scaleX: 2, x: 5, y: 6 });
  t.updateTransform();
  const v = t.transformCoordToLocal(9, 10);
  expect(v[0]).toBe(2);
  expect(v[1]).toBe(4);
});

test('transformCoordToGlobal', () => {
  const t = new Transformable({ scaleX: 2, x: 5, y: 6 });
  t.updateTransform();
  const v = t.transformCoordToGlobal(2, 4);
  expect(v[0]).toBe(9);
  expect(v[1]).toBe(10);
});

test('getLineScale', () => {
  const t = new Transformable({ scaleX: 2 });
  t.updateTransform();
  expect(t.getLineScale()).toBe(1);
  t.scaleY = 2;
  t.updateTransform();
  expect(t.getLineScale()).toBe(2);
});

test('copyTransform', () => {
  const t = new Transformable({ skewX: 0.3, x: 5, y: 6, rotation: 30 * Math.PI / 180, scaleX: 3, scaleY: 5 });
  const parent = new Transformable({
    scaleX: 2,
    scaleY: 3,
    rotation: 30 * Math.PI / 180,
    originX: 2,
    originY: 3,
    x: 5,
    y: 6,
  });
  t.copyTransform(parent);
  expect(t.scaleX).toBe(2);
  expect(t.scaleY).toBe(3);
  expect(t.rotation).toBe(30 * Math.PI / 180);
  expect(t.originX).toBe(2);
  expect(t.originY).toBe(3);
  expect(t.x).toBe(5);
  expect(t.y).toBe(6);
});