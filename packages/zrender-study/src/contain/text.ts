import BoundingRect, { RectLike } from '../core/BoundingRect';
import { createCanvas } from '../core/util';
import { Dictionary, PropType, TextAlign, TextVerticalAlign, BuiltinTextPosition } from '../core/types';
import LRU from '../core/LRU';

let textWidthCache: Dictionary<LRU<number>> = {};

export const DEFAULT_FONT = '12px sans-serif';

let _ctx: CanvasRenderingContext2D;
let _cachedFont: string;

function defaultMeasureText(text: string, font?: string): { width: number } {
  if (!_ctx) {
    _ctx = createCanvas().getContext('2d');
  }
  if (_cachedFont !== font) {
    _cachedFont = _ctx.font = font || DEFAULT_FONT;
  }

  return _ctx.measureText(text);
}

let methods: {
  measureText: (text: string, font?: string) => { width: number }
} = {
  measureText: defaultMeasureText,
};

export function $override(name: keyof typeof methods, fn: PropType<typeof methods, keyof typeof methods>) {
  methods[name] = fn;
}

export function getWidth(text: string, font?: string): number {
  font = font || DEFAULT_FONT;
  let cacheOfFont = textWidthCache[font];
  if (!cacheOfFont) {
    cacheOfFont = textWidthCache[font] = new LRU(500);
  }

  let width = cacheOfFont.get(text);
  if (width == null) {
    width = methods.measureText(text, font).width;
    cacheOfFont.put(text, width);
  }

  return width;
}

export function innerGetBoundingRect(text: string, font: string, textAlign?: TextAlign, textBaseline?: TextVerticalAlign): BoundingRect {
  const width = getWidth(text, font);
  const height = getLineHeight(font);

  const x = adjustTextX(0, width, textAlign);
  const y = adjustTextY(0, height, textBaseline);

  const rect = new BoundingRect(x, y, width, height);
  return rect;
}

export function getBoundingRect(text: string, font: string, textAlign?: TextAlign, textBaseline?: TextVerticalAlign) {
  const textLines = `${text || ''}`.split('\n');
  const len = textLines.length;
  if (len === 1) {
    return innerGetBoundingRect(textLines[0], font, textAlign, textBaseline);
  } else {
    const unionedRect = new BoundingRect(0, 0, 0, 0);
    for (let i = 0; i < textLines.length; i++) {
      const rect = innerGetBoundingRect(textLines[i], font, textAlign, textBaseline);
      if (i === 0) {
        unionedRect.copy(rect);
      } else {
        unionedRect.union(rect);
      }
    }
    return unionedRect;
  }
}

export function adjustTextX(x: number, width: number, textAlign: TextAlign): number {
  if (textAlign === 'right') {
    x -= width;
  } else if (textAlign === 'center') {
    x -= width / 2;
  }
  return x;
}

export function adjustTextY(y: number, height: number, verticalAlign: TextVerticalAlign): number {
  if (verticalAlign === 'middle') {
    y -= height / 2;
  } else if (verticalAlign === 'bottom') {
    y -= height;
  }
  return y;
}

// this is a rough computation
export function getLineHeight(font?: string): number {
  return getWidth('国', font);
}

export function measureText(text: string, font?: string): { width: number } {
  return methods.measureText(text, font);
}

export function parsePercent(value: number | string, maxValue: number): number {
  if (typeof value === 'string') {
    if (value.lastIndexOf('%') >= 0) {
      return parseFloat(value) / 100 * maxValue;
    }
    return parseFloat(value);
  }
  return value;
}

export interface TextPositionCalculationResult {
  x: number;
  y: number;
  align: TextAlign;
  verticalAlign: TextVerticalAlign;
}

interface Opts {
  position?: BuiltinTextPosition | (number | string)[];
  distance?: number;
}
export function calculateTextPosition(out: TextPositionCalculationResult, opts: Opts, rect: RectLike): TextPositionCalculationResult {
  const textPosition = opts.position || 'inside';
  const distance = opts.distance != null ? opts.distance : 5;

  const height = rect.height;
  const width = rect.width;
  const halfHeight = height / 2;

  let x = rect.x;
  let y = rect.y;
  
  let textAlign: TextAlign = 'left';
  let textVerticalAlign: TextVerticalAlign = 'top';

  if (textPosition instanceof Array) {
    x += parsePercent(textPosition[0], rect.width);
    y += parsePercent(textPosition[1], rect.height);
    textAlign = null;
    textVerticalAlign = null;
  } else {
    switch (textPosition) {
      case 'left': {
        x -= distance;
        y += halfHeight;
        textAlign = 'right';
        textVerticalAlign = 'middle';
        break;
      }
      case 'right': {
        x += distance + width;
        y += halfHeight;
        textVerticalAlign = 'middle';
        break;
      }
      case 'top': {
        x += width / 2;
        y -= distance;
        textAlign = 'center';
        textVerticalAlign = 'bottom';
        break;
      }
      case 'bottom': {
        x += width / 2;
        y += height + distance;
        textAlign = 'center';
        break;
      }
      case 'inside': {
        x += width / 2;
        y += halfHeight;
        textAlign = 'center';
        textVerticalAlign = 'middle';
        break;
      }
      case 'insideLeft': {
        x += distance;
        y += halfHeight;
        textVerticalAlign = 'middle';
        break;
      }
      case 'insideRight': {
        x += width - distance;
        y += halfHeight;
        textAlign = 'right';
        textVerticalAlign = 'middle';
        break;
      }
      case 'insideTop': {
        x += width / 2;
        y += distance;
        textAlign = 'center';
        break;
      }
      case 'insideBottom': {
        x += width / 2;
        y += height - distance;
        textAlign = 'center';
        textVerticalAlign = 'bottom';
        break;
      }
      case 'insideTopLeft': {
        x += distance;
        y += distance;
        break;
      }
      case 'insideTopRight': {
        x += width - distance;
        y += distance;
        textAlign = 'right';
        break;
      }
      case 'insideBottomLeft': {
        x += distance;
        y += height - distance;
        textVerticalAlign = 'bottom';
        break;
      }
      case 'insideBottomRight': {
        x += width - distance;
        y += height - distance;
        textAlign = 'right';
        textVerticalAlign = 'bottom';
        break;
      }
    }
  }

  out = out || {} as TextPositionCalculationResult;
  out.x = x;
  out.y = y;
  out.align = textAlign;
  out.verticalAlign = textVerticalAlign;

  return out;
}