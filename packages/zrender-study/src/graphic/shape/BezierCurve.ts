import Path, { PathProps } from '../Path';
import * as vec2 from '../../core/vector';
import {
  quadraticSubdivide,
  cubicSubdivide,
  quadraticAt,
  cubicAt,
  quadraticDerivativeAt,
  cubicDerivativeAt,
} from '../../core/curve';
import PathProxy from '../../core/PathProxy';

const out: number[] = [];

export class BezierCurveShape {
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  cpx1 = 0;
  cpy1 = 0;
  cpx2?: number;
  cpy2?: number;
  percent = 1;
};

function someVectorAt(shape: BezierCurveShape, t: number, isTangent: boolean) {
  const {
    x1,
    x2,
    y1,
    y2,
    cpx1,
    cpy1,
    cpx2,
    cpy2,
  } = shape;
  if (cpx2 != null || cpy2 != null) {
    return [
      (isTangent ? cubicDerivativeAt : cubicAt)(x1, cpx1, cpx2, x2, t),
      (isTangent ? cubicDerivativeAt : cubicAt)(y1, cpy1, cpy2, y2, t)
    ];
  }

  return [
    (isTangent ? quadraticDerivativeAt : quadraticAt)(x1, cpx1, x2, t),
    (isTangent ? quadraticDerivativeAt : quadraticAt)(y1, cpy1, y2, t)
  ];
}

export interface BezierCurveProps extends PathProps {
  shape?: Partial<BezierCurveShape>,
}
class BezierCurve extends Path<BezierCurveProps> {
  shape: BezierCurveShape;

  constructor(opts?: BezierCurveProps, skipInit = false) {
    super(opts, true);
    this.type = 'bezier-curve';

    if (!skipInit) {
      this.attr(opts);
    }
  }

  getDefaultStyle() {
    return {
      stroke: '#000',
      fill: null as string,
    };
  }

  getDefaultShape() {
    return new BezierCurveShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: BezierCurveShape) {
    let {
      x1,
      y1,
      x2,
      y2,
      cpx1,
      cpy1,
      cpx2,
      cpy2,
      percent,
    } = shape;

    if (percent === 0) {
      return;
    }

    ctx.moveTo(x1, y1);

    if (cpx2 == null || cpy2 == null) {
      if (percent < 1) {
        quadraticSubdivide(x1, cpx1, x2, percent, out);
        cpx1 = out[1];
        x2 = out[2];
        quadraticSubdivide(y1, cpy1, y2, percent, out);
        cpy1 = out[1];
        y2 = out[2];
      }

      ctx.quadraticCurveTo(cpx1, cpy1, x2, y2);
    } else {
      if (percent < 1) {
        cubicSubdivide(x1, cpx1, cpx2, x2, percent,out);
        cpx1 = out[1];
        cpx2 = out[2];
        x2 = out[3];
        cubicSubdivide(y1, cpy1, cpy2, y2, percent, out);
        cpy1 = out[1];
        cpy2 = out[2];
        y2 = out[3];
      }
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }
  }

  pointAt(t: number) {
    return someVectorAt(this.shape, t, false);
  }

  tangentAt(t: number) {
    const p = someVectorAt(this.shape, t, true);
    return vec2.normalize(p, p);
  }
}

export default BezierCurve;