import { isArray, isNumber } from '../../core/util';

export function normalizeLineDash(lineType: any, lineWidth?: number): number[] | null {
  if (!lineType || lineType === 'solid' || !(lineWidth > 0)) {
    return null;
  }

  lineWidth = lineWidth || 1;

  if (lineType === 'dashed') {
    return [4 * lineWidth, 2 * lineWidth];
  }

  if (lineType === 'dotted') {
    return [lineWidth];
  }

  if (isNumber(lineType)) {
    return [lineType];
  }
  
  if (isArray(lineType)) {
    return lineType;
  }
  
  return null;
}