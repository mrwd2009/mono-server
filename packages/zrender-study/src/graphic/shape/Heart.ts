import Path, { PathProps } from '../Path';
import PathProxy from '../../core/PathProxy';

export class HeartShape {
  cx = 0;
  cy = 0;
  width = 0;
  height = 0;
}

export interface HeartProps extends PathProps {
  shape?: Partial<HeartShape>
}

class Heart extends Path<HeartProps> {
  shape: HeartShape;

  constructor(opts?: HeartProps, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'heart';

    if (!skipInit) {
      this._init(opts);
    }
  }

  getDefaultShape() {
    return new HeartShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: HeartShape) {
    const x = shape.cx;
    const y = shape.cy;
    const a = shape.width;
    const b = shape.height;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + a / 2, y - b * 2 / 3,
      x + a * 2, y + b / 3,
      x, y + b
    );
    ctx.bezierCurveTo(
      x - a * 2, y + b / 3,
      x - a / 2, y - b * 2 / 3,
      x, y
    );
  }
}

export default Heart;