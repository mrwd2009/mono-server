export type VectorArray = number[];
// abbreviation
export type Vec2 = VectorArray;

export type MatrixArray = number[];
export type Matrix = MatrixArray;

export function create(x: number = 0, y: number = 0): VectorArray {
  return [x, y];
}

export function copy<T extends Vec2>(out: T, v: Vec2): T {
  out[0] = v[0];
  out[1] = v[1];
  return out;
}

export function clone(v: Vec2): Vec2 {
  return [...v];
}

export function set<T extends Vec2>(out: T, a: number, b: number): T {
  out[0] = a;
  out[1] = b;
  return out;
}

export function add<T extends Vec2>(out: T, v1: Vec2, v2: Vec2): T {
  out[0] = v1[0] + v2[0];
  out[1] = v1[1] + v2[1];
  return out;
}

export function scaleAndAdd<T extends Vec2>(out: T, v1: Vec2, v2: Vec2, a: number): T {
  out[0] = v1[0] + v2[0] * a;
  out[1] = v1[1] + v2[1] * a;
  return out;
}

export function sub<T extends Vec2>(out: T, v1: Vec2, v2: Vec2): T {
  out[0] = v1[0] - v2[0];
  out[1] = v1[1] - v2[1];
  return out;
}

export function lenSquare(v: Vec2): number {
  return v[0] * v[0] + v[1] * v[1];
}

export const lengthSquare = lenSquare;

export function len(v: Vec2): number {
  return Math.sqrt(lenSquare(v));
}

export const length = len;

export function mul<T extends Vec2>(out: T, v1: Vec2, v2: Vec2): T {
  out[0] = v1[0] * v2[0];
  out[1] = v1[1] * v2[1];
  return out;
}

export function div<T extends Vec2>(out: T, v1: Vec2, v2: Vec2): T {
  out[0] = v1[0] / v2[0];
  out[1] = v1[1] / v2[1];
  return out;
}

export function dot(v1: Vec2, v2: Vec2): number {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

export function scale<T extends Vec2>(out: T, v: Vec2, s: number): T {
  out[0] = v[0] * s;
  out[1] = v[1] * s;
  return out;
}

export function normalize<T extends Vec2>(out: T, v: Vec2): T {
  const d = len(v);
  if (d === 0) {
    out[0] = 0;
    out[1] = 0;
  } else {
    out[0] = v[0] / d;
    out[1] = v[1] / d;
  }
  return out;
}

export function distance(v1: Vec2, v2: Vec2): number {
  const x = v1[0] - v2[0];
  const y = v1[1] - v2[1];
  return Math.sqrt(x * x + y * y);
}

export const dist = distance;

export function distanceSquare(v1: Vec2, v2: Vec2): number {
  const x = v1[0] - v2[0];
  const y = v1[1] - v2[1];
  return x * x + y * y;
}

export const distSquare = distanceSquare;

export function negate<T extends Vec2>(out: T, v: Vec2): T {
  out[0] = -v[0];
  out[1] = -v[1];
  return out;
}

export function lerp<T extends Vec2>(out: T, v1: Vec2, v2: Vec2, t: number): T {
  out[0] = v1[0] + t * (v2[0] - v1[0]);
  out[1] = v1[1] + t * (v2[1] - v1[1]);
  return out;
}

// column-major matrix
/**
 * 
 *  [0, 2, 4] [x]
 *  [1, 3, 5] [y]
 *            [1]
 */
export function applyTransform<T extends Vec2>(out: T, v: Vec2, m: Matrix): T {
  const x = v[0];
  const y = v[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}

export function min<T extends Vec2>(out: T, v1: Vec2, v2: Vec2): T {
  out[0] = Math.min(v1[0], v2[0]);
  out[1] = Math.min(v1[1], v2[1]);
  return out;
}

export function max<T extends Vec2>(out: T, v1: Vec2, v2: Vec2): T {
  out[0] = Math.max(v1[0], v2[0]);
  out[1] = Math.max(v1[1], v2[1]);
  return out;
}