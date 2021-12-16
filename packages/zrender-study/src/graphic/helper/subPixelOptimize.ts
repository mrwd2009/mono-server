import { PathStyleProps } from '../Path';

const round = Math.round;

type LineShape = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
};

type RectShape = {
  x: number,
  y: number,
  width: number,
  height: number,
  r?: number | number[],
}

export function subPixelOptimizeLine(outputShape: Partial<LineShape>, inputShape: LineShape, style: Pick<PathStyleProps, 'lineWidth'>): LineShape {
  if (!inputShape) {
    return;
  }
  const {
    x1,
    x2,
    y1,
    y2,
  } = inputShape;

  outputShape.x1 = x1;
  outputShape.x2 = x2;
  outputShape.y1 = y1;
  outputShape.y2 = y2;

  const lineWidth = style && style.lineWidth;
  if (!lineWidth) {
    return outputShape as LineShape;
  }

  if (round(x1 * 2) === round(x2 * 2)) {
    outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
  }

  if (round(y1 * 2) === round(y2 * 2)) {
    outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
  }

  return outputShape as LineShape;
}

export function subPixelOptimizeRect(outputShape: Partial<RectShape>, inputShape: RectShape, style: Pick<PathStyleProps, 'lineWidth'>): RectShape {
  if (!inputShape) {
    return;
  }

  const originX = inputShape.x;
  const originY = inputShape.y;
  const originWidth = inputShape.width;
  const originHeight = inputShape.height;

  outputShape.x = originX;
  outputShape.y = originY;
  outputShape.width = originWidth;
  outputShape.height = originHeight;

  const lineWidth = style && style.lineWidth;

  if (!lineWidth) {
    return outputShape as RectShape;
  }

  outputShape.x = subPixelOptimize(originX, lineWidth, true);
  outputShape.y = subPixelOptimize(originY, lineWidth, true);
  outputShape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
  outputShape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);

  return outputShape as RectShape;
}

export function subPixelOptimize(position: number, lineWidth?: number, positiveOrNegative?: boolean) {
  if (!lineWidth) {
    return position;
  }
  const doubledPostion = round(position * 2);
  if ((doubledPostion + round(lineWidth)) % 2 === 0) {
    return doubledPostion / 2;
  }
  return (doubledPostion + (positiveOrNegative ? 1 : -1)) / 2;
}