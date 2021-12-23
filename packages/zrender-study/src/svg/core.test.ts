import * as core from './core';

test('normalizeColor', () => {
  let result = core.normalizeColor('');
  expect(result.color).toBe('none');
  expect(result.opacity).toBe(1);

  result = core.normalizeColor('rgba(255,0,0, 0.5)');
  expect(result.color).toBe('rgb(255,0,0)');
  expect(result.opacity).toBe(0.5);

  result = core.normalizeColor('rgb(255,0,0)');
  expect(result.color).toBe('rgb(255,0,0)');
  expect(result.opacity).toBe(1);
});