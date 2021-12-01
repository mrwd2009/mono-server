import { Matrix } from './matrix';

export interface PointLike {
  x: number;
  y: number;
}

export default class Point {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  copy(other: PointLike) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  equal(other: PointLike) {
    return other.x === this.x && other.y === this.y;
  }

  add(other: PointLike) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
}