import Path, { PathProps } from '../Path';
import PathProxy from '../../core/PathProxy';

const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;

export class IsogonShape {
  x = 0;
  y = 0;
  r = 0;
  n = 0;
}

export interface IsogonProps extends PathProps {
  shape?: Partial<IsogonShape>;
}

class Isogon extends Path<IsogonProps> {
  shape: IsogonShape;

  constructor(opts?: IsogonProps, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'isogon';

    if (!skipInit) {
      this._init(opts);
    }
  }

  getDefaultShape() {
    return new IsogonShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: IsogonShape) {
    const n = shape.n;
    if (!n || n < 2) {
      return;
    }

    const {
      x,
      y,
      r,
    } = shape;

    const dStep = 2 * PI / n;
    let deg = -PI / 2;

    ctx.moveTo(x + r * cos(deg), y + r * sin(deg));
    for (let i = 0, end = n - 1; i < end; i++) {
      deg += dStep;
      ctx.lineTo(x + r * cos(deg), y + r * sin(deg));
    }

    ctx.closePath();

    return;
  }
}

export default Isogon;