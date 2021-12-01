import Point from './Point';

test('Point', () => {
  const p = new Point();
  expect(p.x).toBe(0);
  expect(p.y).toBe(0);

  const p2 = new Point(1, 2);
  p.copy(p2);
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);

  const p3 = p.clone();
  expect(p3.x).toBe(1);
  expect(p3.y).toBe(2);

  p.set(4, 5);
  expect(p.x).toBe(4);
  expect(p.y).toBe(5);
  
  expect(p.equal(p)).toBe(true);
  expect(p.equal(p3)).toBe(false);

  p.add(p2);
  expect(p.x).toBe(5);
  expect(p.y).toBe(7);

  p.set(2, 4);
  p.scale(0.5);
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);

  p.scaleAndAdd({ x: 1, y: 1}, 2);
  expect(p.x).toBe(3);
  expect(p.y).toBe(4);

  p.sub({ x: 1, y: 2 });
  expect(p.x).toBe(2);
  expect(p.y).toBe(2);

  expect(p.dot({ x: 2, y: 2})).toBe(8);

  expect(p.len()).toBeCloseTo(Math.sqrt(8));
  expect(p.lenSquare()).toBe(8);

  p.normalize();
  expect(p.x).toBeCloseTo(2 / Math.sqrt(8));
  expect(p.y).toBeCloseTo(2 / Math.sqrt(8));

  p.set(2, 2);
  expect(p.distance({ x: 3, y: 3 })).toBeCloseTo(Math.sqrt(2));

  expect(p.distanceSquare({ x: 3, y: 3})).toBe(2);

  p.negate();
  expect(p.x).toBe(-2);
  expect(p.y).toBe(-2);

  p.transform([1, 0, 0, 1, 2, 4]);
  expect(p.x).toBe(0);
  expect(p.y).toBe(2);

  expect(p.toArray()).toEqual([0, 2]);

  p.fromArray([2, 4]);
  expect(p.x).toBe(2);
  expect(p.y).toBe(4);
});

test('Point static method', () => {
  const p = new Point();
  Point.set(p, 2, 3);
  expect(p.x).toBe(2);
  expect(p.y).toBe(3);

  const p1 = new Point(4, 5);
  Point.copy(p, p1);
  expect(p.x).toBe(4);
  expect(p.y).toBe(5);

  expect(Point.len({ x: 1, y: 1})).toBeCloseTo(Math.sqrt(2));
  expect(Point.lenSquare({ x: 1, y: 1})).toBe(2);

  expect(Point.dot({x: 1, y: 1}, {x: 2, y: 2})).toBe(4);

  p.set(1, 2);
  p1.set(2, 3);
  Point.add(p, p, p1);
  expect(p.x).toBe(3);
  expect(p.y).toBe(5);

  Point.sub(p, p, p1);
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);

  Point.scale(p, p, 2);
  expect(p.x).toBe(2);
  expect(p.y).toBe(4);

  Point.scaleAndAdd(p, p, p1, 1);
  expect(p.x).toBe(4);
  expect(p.y).toBe(7);

  Point.lerp(p, p, {x: 6, y: 9}, 0.5);
  expect(p.x).toBe(5);
  expect(p.y).toBe(8);
})