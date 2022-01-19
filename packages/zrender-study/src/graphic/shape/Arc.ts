import Path, { PathProps } from '../Path';
import PathProxy from '../../core/PathProxy';

export class ArcShape {
  cx = 0;
  cy = 0;
  r = 0;
  startAngle = 0;
  endAngle = Math.PI * 2;
  clockwise? = true;
}

export interface ArcProps extends PathProps {
  shape?: Partial<ArcShape>;
}

class Arc extends Path<ArcProps> {
  shape: ArcShape;

  constructor(opts?: ArcProps, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'arc';

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
    return new ArcShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: ArcShape) {
    const r = Math.max(shape.r, 0);
    const {
      cx: x,
      cy: y,
      startAngle,
      endAngle,
      clockwise,
    } = shape;

    const unitX = Math.cos(startAngle);
    const unitY = Math.sin(startAngle);

    ctx.moveTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
  }
}

export default Arc;