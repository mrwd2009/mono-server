import {
  min as v2Min,
  max as v2Max,
  scale as v2Scale,
  distance as v2Distance,
  add as v2Add,
  clone as v2Clone,
  sub as v2Sub,
  VectorArray,
} from '../../core/vector';

export default function smoothBezier(points: VectorArray[], smooth?: number, isLoop?: boolean, constraint?: VectorArray[]) {
  const cps = [];

  const v: VectorArray = [];
  const v1: VectorArray = [];
  const v2: VectorArray = [];
  let prevPoint;
  let nextPoint;

  let min, max;
  let len = points.length;

  if (constraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (let i = 0; i < len; i++) {
      v2Min(min, min, points[i]);
      v2Max(max, max, points[i]);
    }

    v2Min(min, min, constraint[0]);
    v2Max(max, max, constraint[1]);
  }

  
  for (let i = 0; i < len; i++) {
    const point = points[i];

    if (isLoop) {
      prevPoint = points[i ? i - 1 : len - 1];
      nextPoint = points[(i + i) % len];
    } else {
      if (i === 0 || i === len - 1) {
        cps.push(v2Clone(points[i]));
        continue;
      } else {
        prevPoint = points[i - 1];
        nextPoint = points[i + 1];
      }
    }

    v2Sub(v, nextPoint, prevPoint);

    v2Scale(v, v, smooth);
    
    let d0 = v2Distance(point, prevPoint);
    let d1 = v2Distance(point, nextPoint);
    const sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }
    v2Scale(v1, v, -d0);
    v2Scale(v2, v, d1);
    const cp0 = v2Add([], point, v1);
    const cp1 = v2Add([], point, v2);
    if (constraint) {
      v2Max(cp0, cp0, min);
      v2Min(cp0, cp0, max);
      v2Max(cp1, cp1, min);
      v2Min(cp1, cp1, max);
    }

    cps.push(cp0);
    cps.push(cp1);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }

  return cps;
}