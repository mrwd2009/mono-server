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

interface Polyline {
  // if you want to make parent class property type more accurately, you must define in same name interface. If you do it in class, it will be overwritten to be void 0 in new ts version.
  shape: PolylineShape;
}

class Polyline extends Path<PolylineProps> {
  shape: PolylineShape;

  constructor(opts?: PolylineProps, skipInit: boolean = false) {
    super(opts, skipInit);
    this.type = 'polyLine';
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

export default Polyline;