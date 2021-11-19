import * as color from './color';

test('clampCssByte', () => {
  expect(color.clampCssByte(-1)).toBe(0);
  expect(color.clampCssByte(1)).toBe(1);
  expect(color.clampCssByte(256)).toBe(255);
});

test('clampCssAngle', () => {
  expect(color.clampCssAngle(-1)).toBe(0);
  expect(color.clampCssAngle(1)).toBe(1);
  expect(color.clampCssAngle(367)).toBe(360);
});

test('clampCssFloat', () => {
  expect(color.clampCssFloat(-1)).toBe(0);
  expect(color.clampCssFloat(1.1)).toBeCloseTo(1.0);
  expect(color.clampCssFloat(0.4)).toBeCloseTo(0.4);
});

test('parseCssInt', () => {
  expect(color.parseCssInt('50%')).toBe(128);
  expect(color.parseCssInt('50')).toBe(50);
});

test('parseCssFloat', () => {
  expect(color.parseCssFloat('50%')).toBeCloseTo(0.5);
  expect(color.parseCssFloat('0.4')).toBeCloseTo(0.4);
});

test('lerpNumber', () => {
  expect(color.lerpNumber(1, 2, 0.5)).toBeCloseTo(1.5);
});

test('setRgba', () => {
  const out: number[] = [];
  color.setRgba(out, 1, 2,3, 1);
  expect(out[0]).toBe(1);
  expect(out[1]).toBe(2);
  expect(out[2]).toBe(3);
  expect(out[3]).toBe(1);
});

test('coyRgba', () => {
  const out: number[] = [];
  const inV = [1,2,3,1];
  color.copyRgba(out, inV);
  expect(out[0]).toBe(1);
  expect(out[1]).toBe(2);
  expect(out[2]).toBe(3);
  expect(out[3]).toBe(1);
});

test('parse', () => {
  expect(color.parse('rgb(1,2,3)')).toEqual([1,2,3,1]);
  expect(color.parse('rgba(1,2,3,0.2)')).toEqual([1,2,3,0.2]);
  expect(color.parse('#fff')).toEqual([255,255,255,1]);
  expect(color.parse('#ffffff')).toEqual([255,255,255,1]);
  expect(color.parse('hsl(20,50%,50%)')).toEqual([191,106,64,1]);
  expect(color.parse('hsla(20,50%,50%, 50%)')).toEqual([191,106,64,0.5]);
});

test('lift', () => {
  expect(color.lift('rgb(115, 115, 115)', 0.5)).toBe('rgba(185,185,185,1)');
  expect(color.lift('rgb(100, 100, 100)', -0.5)).toBe('rgba(150,150,150,1)');
});

test('toHex', () => {
  expect(color.toHex('rgb(255,255,255)')).toBe('ffffff');
});

test('lerp', () => {
  const list = ['rgb(100, 100, 100)', 'rgb(150, 150, 150)'];
  expect(color.lerp(0.5, list)).toBe('rgba(125,125,125,1)')
});

test('modifyAlpha', () => {
  expect(color.modifyAlpha('rgba(123,234,144,0.3)', 0.5)).toBe('rgba(123,234,144,0.5)')
});