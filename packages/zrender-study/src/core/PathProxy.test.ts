import Path, * as PathProxy from './PathProxy';

test('normalizeArcAngles', () => {
  let angles = [-Math.PI / 2, Math.PI / 2];
  // angles = [0, Math.PI / 2];
  PathProxy.normalizeArcAngles(angles, true);
  expect(angles[0] > angles[1]).toBe(true);
});

test('PathProxy', () => {
  const path = new Path();
  path.increaseVersion();
  expect(path.getVersion()).toBe(1);
  path.beginPath();
  path.moveTo(0, 0);
  let data = [];
  data.push(Path.CMD.M, 0, 0);
  expect(path.data).toEqual(data);

  path.lineTo(1, 1);
  data.push(Path.CMD.L, 1, 1);
  expect(path.data).toEqual(data);

  path.bezierCurveTo(2, 2, 3, 1, 4, 0);
  data.push(Path.CMD.C, 2, 2, 3, 1, 4, 0);
  expect(path.data).toEqual(data);

  path.quadraticCurveTo(5, 2, 6, 0);
  data.push(Path.CMD.Q, 5, 2, 6, 0);
  expect(path.data).toEqual(data);

  path.arc(0, 0, 2, 0, 1, false);
  data.push(Path.CMD.A, 0, 0, 2, 2, 0, 1, 0, 1);
  expect(path.data).toEqual(data);

  path.rect(2, 2, 1, 1);
  data.push(Path.CMD.R, 2, 2, 1, 1);
  expect(path.data).toEqual(data);

  path.closePath();
  data.push(Path.CMD.Z);
  expect(path.data).toEqual(data);

  expect(path.getBoundingRect()).toEqual({
    x: 0,
    y: 0,
    width: 6,
    height: 3,
  });

  const path2 = new Path();
  path.rebuildPath(path2 as any as PathProxy.PathRebuilder, 1);
  expect(path.data).toEqual(path2.data);
});