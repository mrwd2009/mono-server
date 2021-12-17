import Path, { PathProps } from '../Path';
import * as polyHelper from '../helper/poly';
import { VectorArray } from '../../core/vector';

export class PolylineShape {
  points: VectorArray[] = null;

  // used by animation
  percent?: number = 1;
  smooth?: number | 'spline' = 0;
  smoothConstraint?: VectorArray[] = null;
}

export interface PolylineProps extends PathProps {
  shape?: Partial<PolylineProps>;
}

class Polyline extends Path<PolylineProps> {
  shape: PolylineShape;

  constructor(opts?: PolylineProps) {
    super(opts);
  }

  getDefaultStyle() {
    return {
      stroke: '#000',
      fill: null as string,
    };
  }

  getDefaultShape() {
    return new PolylineShape();
  }

  buildPath(ctx: CanvasRenderingContext2D, shape: PolylineShape) {
    polyHelper.buildPath(ctx, shape, false);
  }
}

Polyline.prototype.type = 'polyLine';
export default Polyline;