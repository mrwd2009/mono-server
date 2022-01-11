import { buildTransformer } from './fourPointsTransform';
import * as matrix from './matrix';
import * as vec from './vector';

test('fourPointsTransform.buildTransformer', () => {
  const point1 = vec.create(50, 50);
  const point2 = vec.create(150, 50);
  const point3 = vec.create(150, 150);
  const point4 = vec.create(50, 150);

  const mat = matrix.create(1.2, 0.5, 0.8, 1.22, -20, -20);

  const nPoint1 = vec.applyTransform(vec.create(), point1, mat);
  const nPoint2 = vec.applyTransform(vec.create(), point2, mat);
  const nPoint3 = vec.applyTransform(vec.create(), point3, mat);
  const nPoint4 = vec.applyTransform(vec.create(), point4, mat);

  const localP = vec.create(100, 100);
  const viewP = vec.applyTransform(vec.create(), localP, mat);

  const transform = buildTransformer([...nPoint1, ...nPoint2, ...nPoint3, ...nPoint4], [...point1, ...point2, ...point3, ...point4]);
  const out = vec.create();
  transform(out, viewP[0], viewP[1]);
  expect(out[0]).toBeCloseTo(100);
  expect(out[1]).toBeCloseTo(100);
});