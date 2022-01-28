import Path, { PathProps } from '../Path';
import PathProxy from '../../core/PathProxy';
import * as polyHelper from '../helper/poly';
import { VectorArray } from '../../core/vector';

export class PolygonShape {
  points: VectorArray[] = null;
  smooth?: number = 0;
  smoothConstraint?: VectorArray[] = null;
}

export interface PolygonProps extends PathProps {
  shape?: Partial<PolygonShape>;
}
class Polygon extends Path<PolygonProps> {
  shape: PolygonShape;

  constructor(opts?: PolygonProps, skipInit: boolean = false) {
    super(opts, true);
    this.type = 'polygon';

    if (!skipInit) {
      this._init(opts);
    }
  }

  getDefaultStyle() {
    return {
      stroke: '#000',
      fill: null as string,
    };
  }

  getDefaultShape() {
    return new PolygonShape();
  }

  buildPath(ctx: PathProxy | CanvasRenderingContext2D, shape: PolygonShape) {
    polyHelper.buildPath(ctx, shape, true);
  }
}

export default Polygon;