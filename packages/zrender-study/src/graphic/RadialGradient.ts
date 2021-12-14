import Gradient, { GradientColorStop, GradientObject } from './Gradient';

export interface RadialGradientObject extends GradientObject {
  type: 'radial';

  x: number;
  y: number;
  r: number;
}

class RadialGradient extends Gradient {
  type: 'radial';

  x: number;
  y: number;
  r: number;

  constructor(x: number, y: number, r: number, colorStops?: GradientColorStop[], globalCoord?: boolean) {
    super(colorStops);

    this.x = x == null ? 0.5 : x;
    this.y = y == null ? 0.5 : y;
    this.r = r === null ? 0.5 : r;

    this.type = 'radial';
    this.global = globalCoord || false;
  }
}

export default RadialGradient;