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

test('parsePlainText', () => {
  let result = parse.parsePlainText('correct', {});
  expect(result).toEqual({
    lines: [ 'correct' ],
    height: 10,
    outerHeight: 10,
    lineHeight: 10,
    calculatedLineHeight: 10,
    contentHeight: 10,
    width: 70,
  });

  result = parse.parsePlainText('correct', {
    overflow: 'break',
    height: 50,
    width: 40,
    padding: [10, 10, 10, 10],
    font: 'sans-serif',
    lineHeight: 20,
    lineOverflow: null,
    ellipsis: '+++',
    truncateMinChar: 3,
    placeholder: '$',
  });
  expect(result).toEqual({
    lines: [ 'corr', 'ect' ],
    height: 50,
    outerHeight: 70,
    lineHeight: 20,
    calculatedLineHeight: 10,
    contentHeight: 40,
    width: 40,
  });

  result = parse.parsePlainText('correct', {
    overflow: 'break',
    height: 10,
    width: 40,
    padding: [10, 10, 10, 10],
    font: 'sans-serif',
    lineHeight: 20,
    lineOverflow: null,
    ellipsis: '+++',
    truncateMinChar: 3,
    placeholder: '$',
  });
  expect(result).toEqual({
    lines: [ 'corr', 'ect' ],
    height: 10,
    outerHeight: 30,
    lineHeight: 20,
    calculatedLineHeight: 10,
    contentHeight: 40,
    width: 40,
  });

  result = parse.parsePlainText('correct', {
    overflow: 'truncate',
    height: 10,
    width: 60,
    padding: [10, 10, 10, 10],
    font: 'sans-serif',
    lineHeight: 20,
    lineOverflow: null,
    ellipsis: '++',
    truncateMinChar: 3,
    placeholder: '$',
  });
  expect(result).toEqual({
    lines: [ 'cor++' ],
    height: 10,
    outerHeight: 30,
    lineHeight: 20,
    calculatedLineHeight: 10,
    contentHeight: 20,
    width: 60,
  });

  result = parse.parsePlainText('correct\nyoyoyoyoyo', {
    height: 10,
    padding: [10, 10, 10, 10],
    font: 'sans-serif',
    lineHeight: 20,
    lineOverflow: null,
    ellipsis: '++',
    truncateMinChar: 3,
    placeholder: '$',
  });
  expect(result).toEqual({
    lines: [ 'correct', 'yoyoyoyoyo' ],
    height: 10,
    outerHeight: 30,
    lineHeight: 20,
    calculatedLineHeight: 10,
    contentHeight: 40,
    width: 100,
  });

  result = parse.parsePlainText('correct\nyoyoyoyoyo\ncorrect', {
    height: 40,
    padding: [10, 10, 10, 10],
    font: 'sans-serif',
    lineHeight: 20,
    lineOverflow: 'truncate',
    ellipsis: '++',
    truncateMinChar: 3,
    placeholder: '$',
  });
  expect(result).toEqual({
    lines: [ 'correct', 'yoyoyoyoyo' ],
    height: 40,
    outerHeight: 60,
    lineHeight: 20,
    calculatedLineHeight: 10,
    contentHeight: 60,
    width: 100,
  });
});

test('wrapText', () => {
  let result = parse.wrapText('correct', 'sans-serif', 40, false, 0);
  expect(result).toEqual({
    accumWidth: 30,
    lines: ['corr', 'ect'],
    linesWidths: [0, 30],
  });

  result = parse.wrapText('correct', 'sans-serif', 40, true, 0);
  expect(result).toEqual({
    accumWidth: 30,
    lines: ['corr', 'ect'],
    linesWidths: [40, 30],
  });

  result = parse.wrapText('correct', 'sans-serif', 100, true, 0);
  expect(result).toEqual({
    accumWidth: 70,
    lines: ['correct'],
    linesWidths: [70],
  });

  result = parse.wrapText('cor\nrect', 'sans-serif', 40, true, 0);
  expect(result).toEqual({
    accumWidth: 40,
    lines: ['cor', 'rect'],
    linesWidths: [30, 40],
  });

  result = parse.wrapText('correct rightyo', 'sans-serif', 100, false, 0);
  expect(result).toEqual({
    accumWidth: 70,
    lines: ['correct ', 'rightyo'],
    linesWidths: [80, 70],
  });

  result = parse.wrapText('cct4 r123,i123&g123?h123/t123;y123]o', 'sans-serif', 50, false, 0);
  expect(result).toEqual({
    accumWidth: 10,
    lines: ['cct4 ', 'r123,', 'i123&', 'g123?', 'h123/', 't123;', 'y123]', 'o'],
    linesWidths: [50, 50, 50, 50, 50, 50, 50, 10],
  });
});

test('pushTokens', () => {
  let block = new parse.RichTextContentBlock();
  parse.pushTokens(block, 'correct', {
    font: 'sans-serif',
  }, {
    width: 60,
    accumWidth: 0,
    breakAll: true,
  });
  expect(block.lines[0].tokens[0].width).toBe(60);
  expect(block.lines[0].tokens[0].text).toBe('correc');
  expect(block.lines[1].tokens[0].width).toBe(10);
  expect(block.lines[1].tokens[0].text).toBe('t');
})

test('parseRichToken', () => {
  let result = parse.parseRichText('correct', {
    overflow: 'breakAll',
    height: 10,
    width: 60,
    padding: [10, 10, 10, 10],
    font: 'sans-serif',
    lineHeight: 20,
    lineOverflow: null,
    ellipsis: '++',
    truncateMinChar: 3,
    placeholder: '$',
  });
  expect(result.lines[0].width).toBe(60);
  expect(result.lines[0].lineHeight).toBe(20);
  expect(result.lines[0].tokens[0].contentWidth).toBe(60);
  expect(result.lines[0].tokens[0].text).toBe('correc');
  expect(result.lines[1].width).toBe(10);
  expect(result.lines[1].lineHeight).toBe(20);
  expect(result.lines[1].tokens[0].contentWidth).toBe(10);
  expect(result.lines[1].tokens[0].text).toBe('t');
});

