import Path, { PathProps } from '../Path';
import PathProxy from '../../core/PathProxy';

export class CircleShape {
  cx = 0;
  cy = 0;
  r = 0;
}

export interface CircleProps extends PathProps {
  shape?: Partial<CircleShape>;
}
class Circle extends Path<CircleProps> {
  shape: Circle;

  constructor(opts?: CircleProps, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'circle';

    if (!skipInit) {
      this.attr(opts);
    }
  }

  getDefaultShape() {
    return new CircleShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: CircleShape) {
    ctx.moveTo(shape.cx + shape.r, shape.cy);
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
  }
}

export default Circle;