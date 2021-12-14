import * as text from './text';
import * as util from '../core/util';

beforeAll(() => {
  util.$override('createCanvas', () => {
    return {
      getContext: () => {
        return {
          measureText: () => {
            return { width: 20 };
          }
        }
      }
    }
  });
});

test('getWidth', () => {
  expect(text.getWidth('test')).toBe(20);
});

test('innerGetBoundingRect', () => {
  let rect = text.innerGetBoundingRect('test', 'sans-serif');
  expect(rect.x).toBe(0);
  expect(rect.y).toBe(0);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(20);

  rect = text.innerGetBoundingRect('test', 'sans-serif', 'center', 'middle');
  expect(rect.x).toBe(-10);
  expect(rect.y).toBe(-10);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(20);
});


test('getBoundingRect', () => {
  let rect = text.getBoundingRect('test', 'sans-serif');
  expect(rect.x).toBe(0);
  expect(rect.y).toBe(0);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(20);

  rect = text.getBoundingRect('test\ntest2\ntest3', 'sans-serif', 'center', 'middle');
  expect(rect.x).toBe(-10);
  expect(rect.y).toBe(-10);
  expect(rect.width).toBe(20);
  expect(rect.height).toBe(20);
});

test('adjustTextX', () => {
  expect(text.adjustTextX(0, 20, 'left')).toBe(0);
  expect(text.adjustTextX(0, 20, 'right')).toBe(-20);
  expect(text.adjustTextX(0, 20, 'center')).toBe(-10);
});

test('adjustTextY', () => {
  expect(text.adjustTextY(0, 20, 'top')).toBe(0);
  expect(text.adjustTextY(0, 20, 'bottom')).toBe(-20);
  expect(text.adjustTextY(0, 20, 'middle')).toBe(-10);
});


test('getLineHeight', () => {
  expect(text.getLineHeight()).toBe(20);
});

test('measureText', () => {
  expect(text.measureText('test').width).toBe(20);
});

test('parsePercent', () => {
  expect(text.parsePercent('10%', 100)).toBe(10);
  expect(text.parsePercent('20', 100)).toBe(20);
  expect(text.parsePercent(30, 100)).toBe(30);
});

test('calculateTextPosition', () => {
  let out: text.TextPositionCalculationResult = { x: 0, y: 0, align: null, verticalAlign: null };
  text.calculateTextPosition(out, { position: ['50%', '50%'] }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe(null);
  expect(out.verticalAlign).toBe(null);

  text.calculateTextPosition(out, { position: 'left', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(-10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('right');
  expect(out.verticalAlign).toBe('middle');

  text.calculateTextPosition(out, { position: 'right', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(30);
  expect(out.y).toBe(10);
  expect(out.align).toBe('left');
  expect(out.verticalAlign).toBe('middle');

  text.calculateTextPosition(out, { position: 'top', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(-10);
  expect(out.align).toBe('center');
  expect(out.verticalAlign).toBe('bottom');

  text.calculateTextPosition(out, { position: 'bottom', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(30);
  expect(out.align).toBe('center');
  expect(out.verticalAlign).toBe('top');

  text.calculateTextPosition(out, { position: 'inside', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('center');
  expect(out.verticalAlign).toBe('middle');

  text.calculateTextPosition(out, { position: 'insideLeft', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('left');
  expect(out.verticalAlign).toBe('middle');

  text.calculateTextPosition(out, { position: 'insideRight', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('right');
  expect(out.verticalAlign).toBe('middle');

  text.calculateTextPosition(out, { position: 'insideTop', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('center');
  expect(out.verticalAlign).toBe('top');

  text.calculateTextPosition(out, { position: 'insideBottom', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('center');
  expect(out.verticalAlign).toBe('bottom');

  text.calculateTextPosition(out, { position: 'insideTopLeft', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('left');
  expect(out.verticalAlign).toBe('top');

  text.calculateTextPosition(out, { position: 'insideTopRight', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('right');
  expect(out.verticalAlign).toBe('top');

  text.calculateTextPosition(out, { position: 'insideBottomLeft', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('left');
  expect(out.verticalAlign).toBe('bottom');

  text.calculateTextPosition(out, { position: 'insideBottomRight', distance: 10 }, { x: 0, y: 0, width: 20, height: 20 });
  expect(out.x).toBe(10);
  expect(out.y).toBe(10);
  expect(out.align).toBe('right');
  expect(out.verticalAlign).toBe('bottom');
});