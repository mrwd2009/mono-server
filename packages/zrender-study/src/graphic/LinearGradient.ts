import Gradient, { GradientObject, GradientColorStop } from './Gradient';

export interface LinearGradientObject extends GradientObject {
  type: 'linear';

  x: number;
  y: number;
  x2: number;
  y2: number;
}

export default class LinearGradient extends Gradient {
  type: 'linear';
  
  x: number;
  y: number;
  x2: number;
  y2: number;

  constructor(x: number, y: number, x2: number, y2: number, colorStops?: GradientColorStop[], globalCoord?: boolean) {
    super(colorStops);

    this.x = x == null ? 0 : x;
    this.y = y == null ? 0 : y;
    this.x2 = x2 == null ? 1 : x2;
    this.y2 = y2 == null ? 0 : y2;

    this.type = 'linear';

    this.global = globalCoord || false;
  }
}