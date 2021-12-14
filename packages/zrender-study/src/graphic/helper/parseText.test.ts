import * as parse from './parseText';
import * as util from '../../core/util';

beforeAll(() => {
  util.$override('createCanvas', () => {
    return {
      getContext: () => {
        return {
          measureText: (str: string) => {
            return { width: str.length * 10 };
          }
        }
      }
    }
  });
});

test('truncateSingleLine', () => {
  let arr = new Array(100);
  expect(parse.truncateSingleLine(arr.fill('2').join(''), parse.prepareTruncateOptions(1001, 'sans-serif', '...', { placeholder: '%'}))).toBe(arr.fill('2').join(''));
  expect(parse.truncateSingleLine(arr.fill('2').join(''), parse.prepareTruncateOptions(100, 'sans-serif', '...', { placeholder: '%'}))).toBe('222222...');
  expect(parse.truncateSingleLine(arr.fill('2').join(''), parse.prepareTruncateOptions(101, 'sans-serif', '...', { placeholder: '%'}))).toBe('2222222...');
  expect(parse.truncateSingleLine(arr.fill('2').join(''), parse.prepareTruncateOptions(31, 'sans-serif', '...', { placeholder: '%'}))).toBe('...');
  expect(parse.truncateSingleLine(arr.fill('2').join(''), parse.prepareTruncateOptions(21, 'sans-serif', '...', { placeholder: '%'}))).toBe('22');
  expect(parse.truncateSingleLine(arr.fill('2').join(''), parse.prepareTruncateOptions(9, 'sans-serif', '...', { placeholder: '%'}))).toBe('%');
});

test('truncateText', () => {
  let arr = new Array(100);
  expect(parse.truncateText(arr.fill('1').join(''), 100, 'sans-serif', '...', { placeholder: '$'})).toBe('111111...');
});