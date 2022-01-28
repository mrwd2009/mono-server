import Path, { PathProps } from '../Path';
import PathProxy from '../../core/PathProxy';

export class RingShape {
  cx = 0;
  cy = 0;
  r = 0;
  r0 = 0;
}

export interface RingProps extends PathProps {
  shape?: Partial<RingShape>;
}
class Ring extends Path<RingProps> {
  shape: RingShape;

  constructor(opts?: RingProps, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'ring';

    if (!skipInit) {
      this._init(opts);
    }
  }

  getDefaultShape() {
    return new RingShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: RingShape) {
    const x = shape.cx;
    const y = shape.cy;
    const PI2 = Math.PI * 2;
    ctx.moveTo(x + shape.r, y);
    ctx.arc(x, y, shape.r, 0, PI2, false);
    ctx.moveTo(x + shape.r0, y);
    ctx.arc(x, y, shape.r0, 0, PI2, true);
  }
}

export default Ring;