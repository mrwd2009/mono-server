import { Vec2 } from './vector';

export type MatrixArray = number[];
export type Matrix = MatrixArray;

export function create(a0 = 1, a1 =0, a2 = 0, a3 = 1, a4 = 0, a5 = 0): Matrix {
  return [a0, a1, a2, a3, a4, a5];
}

export function identity(out?: Matrix): Matrix {
  if (!out) {
    return create();
  }
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

export function copy(out: Matrix, m: Matrix): Matrix {
  out[0] = m[0];
  out[1] = m[1];
  out[2] = m[2];
  out[3] = m[3];
  out[4] = m[4];
  out[5] = m[5];
  return out;
}

/** 
 * [0, 2, 4]   [0, 2, 4] [x]
 * [1, 3, 5] * [1, 3, 5] [y]
 * [0, 0, 1]   [0, 0, 1] [1]
 */

export function  mul(out: Matrix, m1: Matrix, m2: Matrix): Matrix {
  // out maybe is same as m1 or m2, we must use temp value
  const out0 = m1[0] * m2[0] + m1[2] * m2[1];
  const out1 = m1[1] * m2[0] + m1[3] * m2[1];
  const out2 = m1[0] * m2[2] + m1[2] * m2[3];
  const out3 = m1[1] * m2[2] + m1[3] * m2[3];
  const out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
  const out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = out3;
  out[4] = out4;
  out[5] = out5;
  return out;
}

export function translate(out: Matrix, a: Matrix, v: Vec2): Matrix {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4] + v[0];
  out[5] = a[5] + v[1];
  return out;
}

/** 
 * clockwise rotation
 * 
 * [cos,  sin,  0]   [0, 2, 4]  [x]
 * [-sin, cos, 0] *  [1, 3, 5]  [y]
 * [0,    0,    1]   [0, 0, 1]  [1]
 */
export function rotate(out: Matrix, a: Matrix, rad: number): Matrix {
  // out maybe is same as a
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const a0 = a[0];
  const a1 = a[1];
  const a2 = a[2];
  const a3 = a[3];
  const a4 = a[4];
  const a5 = a[5];

  out[0] = cos * a0 + sin * a1;
  out[1] = -sin * a0 + cos * a1;
  out[2] = cos * a2 + sin * a3;
  out[3] = -sin * a2 + cos * a3;
  out[4] = cos * a4 + sin * a5;
  out[5] = -sin * a4 + cos * a5;

  return out;
}

/** 
 * 
 * [x, 0, 0]   [0, 2, 4] 
 * [0, y, 0] * [1, 3, 5] 
 * [0, 0, 1]   [0, 0, 1]
 */
export function scale(out: Matrix, a: Matrix, v: Vec2): Matrix {
  const [x, y] = v;
  out[0] = a[0] * x;
  out[1] = a[1] * y;
  out[2] = a[2] * x;
  out[3] = a[3] * y;
  out[4] = a[4] * x;
  out[5] = a[5] * y;
  return out;
}
/** 
 * 
 * [0, 2, 4] 
 * [1, 3, 5] 
 * [0, 0, 1]
 */
// calculate inverse of a matrix
// reference https://www.cuemath.com/algebra/inverse-of-a-matrix/
export function invert(out: Matrix, a: Matrix): Matrix | null {
  // calculate determinate
  // https://www.cuemath.com/algebra/determinants/
  /**
   * [a0, a2, a4]
   * [a1, a3, a5]
   * [0,  0,  1]
   */
  // const determinate = a[0] * (a[3] * 1 - 0 * a[5]) - a[2] * (a[1] * 1 - 0 * a[5]) + a[4] * (a[1] * 0 - 0 * a[3]);
  const a0 = a[0];
  const a1 = a[1];
  const a2 = a[2];
  const a3 = a[3];
  const a4 = a[4];
  const a5 = a[5];
  const determinate = a0 * a3 - a2 * a1;
  if (determinate === 0) {
    return null;
  }
  // get co-factor matrix
  // https://www.cuemath.com/algebra/cofactor-matrix/
  /**
   * [coFactor0,    coFactor2,    coFactor4]
   * [coFactor1,    coFactor3,    coFactor5]
   * [coFactor3_0,  coFactor3_1,  coFactor3_2]
   */
  const coFactor0 = a3; // a3 * 1 - 0 * a5;
  const coFactor1 = -a2; // -(a2 * 1 - 0 * a4);
  const coFactor2 = -a1; // -(a1 * 1 - 0 * a5);
  const coFactor3 = a0; // a0 * 1 - 0 * a4;
  // const coFactor4 = 0; // a1 * 0 - 0 * a3;
  // const coFactor5 = 0; // -(a0 * 0 - 0 * a2);
  const coFactor3_0 = a2 * a5 - a3 * a4;
  const coFactor3_1 = a1 * a4 - a0 * a5; // -(a0 * a5 - a1 * a4);
  // const coFactor3_2 = a0 * a3 - a1 * a2;

  // Transpose of cofactor matrix
  /**
   * [coFactor0,  coFactor1,  colFactor3_0]
   * [coFactor2,  coFactor3,  colFactor3_1]
   * [coFactor4,  coFactor5,  colFactor3_2]
   * 
   * inverse = 1 / determinate * Transpose_of_cofactor_matrix
   * 
   * [coFactor0 / determinate,  coFactor1 / determinate,  colFactor3_0 / determinate]
   * [coFactor2 / determinate,  coFactor3 / determinate,  colFactor3_1 / determinate]
   * [0,                        0,                        1] 
   */ 
  // reciprocal
  const rec = 1.0 / determinate;
  out[0] = coFactor0 * rec;
  out[1] = coFactor2 * rec;
  out[2] = coFactor1 * rec;
  out[3] = coFactor3 * rec;
  out[4] = coFactor3_0 * rec;
  out[5] = coFactor3_1 * rec;

  return out;
}

export function clone(a: Matrix): Matrix {
  const b = create();
  copy(b, a);
  return b;
}

