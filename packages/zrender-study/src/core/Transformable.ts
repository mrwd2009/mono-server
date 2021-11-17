import * as matrix from './matrix';
import * as vector from './vector';

type Matrix = matrix.Matrix;
type Vec2 = vector.Vec2;

const EPSILON = 'EPSILON' in Number ? Number.EPSILON : 1e-10;

function isNotAroundZero(val: number) {
  return val > EPSILON || val < -EPSILON;
}

const scaleTemp: vector.Vec2 = [];
const transformTemp: Matrix = [];
const originTransform = matrix.create();
const abs = Math.abs;

class Transformable {
  parent: Transformable;

  x: number;
  y: number;
  
  scaleX: number;
  scaleY: number;

  skewX: number;
  skewY: number;

  rotation: number;

  originX: number;
  originY: number;

  globalScaleRatio: number;

  transform: Matrix;
  invTransform: Matrix;

  static getLocalTransform(target: Transformable, m?: Matrix): Matrix {
    m = m || [];

    const ox = target.originX || 0;
    const oy = target.originY || 0;
    const sx = target.scaleX;
    const sy = target.scaleY;
    const rotation = target.rotation || 0;
    const x = target.x;
    const y = target.y;
    const skewX = target.skewX ? Math.tan(target.skewX) : 0;
    const skewY = target.skewY ? Math.tan(-target.skewY) : 0;
    // The order of transform (-origin * scale * skew * rotate * origin * translate).
    // merge (-origin * scale * skew) into one
    /**
     * [1,     skewX, 0]   [sx, 0, 0]   [1, 0, -ox] 
     * [skewY, 1,     0] * [0, sy, 0] * [0, 1, -oy]
     * [0,     0,     1]   [0,  0, 1]   [0, 0, 1  ] 
     */
    if (ox || oy) {
      m[4] = -ox * sx - skewX * oy * sy;
      m[5] = -oy * sy - skewY * ox * sx;
    } else {
      m[4] = 0;
      m[5] = 0;
    }
    m[0] = sx;
    m[3] = sy;
    m[1] = skewY * sx;
    m[2] = skewX * sy;

    // rotation
    rotation && matrix.rotate(m, m, rotation);

    // back to origin and translate
    m[4] += ox + x;
    m[5] += oy + y;

    return m;
  }

  constructor({
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    originX = 0,
    originY = 0,
    skewX = 0,
    skewY = 0,
    rotation = 0,
    globalScaleRatio = 1
  } = {}) {
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.originX = originX;
    this.originY = originY;
    this.skewX = skewX;
    this.skewY = skewY;
    this.rotation = rotation;
    this.globalScaleRatio = globalScaleRatio;
  }

  getLocalTransform(m?: Matrix) {
    return Transformable.getLocalTransform(this, m);
  }

  setPosition(arr: Vec2) {
    this.x = arr[0];
    this.y = arr[1];
  }

  setScale(arr: Vec2) {
    this.scaleX = arr[0];
    this.scaleY = arr[1];
  }

  setSkew(arr: Vec2) {
    this.skewX = arr[0];
    this.skewY = arr[1];
  }

  setOrigin(arr: Vec2) {
    this.originX = arr[0];
    this.originY = arr[1];
  }

  setRotation(rad: number) {
    // anticlockwise
    this.rotation = -rad;
  }

  needLocalTransform(): boolean {
    return isNotAroundZero(this.rotation)
      || isNotAroundZero(this.x)
      || isNotAroundZero(this.y)
      || isNotAroundZero(this.scaleX - 1)
      || isNotAroundZero(this.scaleY - 1);
  }

  getGlobalScale(out?: Vec2): Vec2 {
    const m = this.transform;
    out = out || [];
    if (!m) {
      out[0] = 1;
      out[1] = 1;
      return out;
    }
    /**
     * reference https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
     * [cos,  sin, 0]   [sx, 0, 0]    [cos*sx,  sin*sy,   0]
     * [-sin, cos, 0] * [0, sy, 0] =  [-sin*sx, cost*sy,  0]
     * [0,      0, 1]   [0,  0, 1]    [0,             0,  1]
     */
    out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
    if (m[0] < 0) {
      out[0] = -out[0];
    }
    if (m[3] < 0) {
      out[1] = -out[1];
    }
    return out;
  }

  private _resolveGlobalScaleRatio(m: Matrix) {
    const globalScaleRadio = this.globalScaleRatio;

    if (globalScaleRadio != null && globalScaleRadio !== 1) {
      this.getGlobalScale(scaleTemp);
      const relX = scaleTemp[0] < 0 ? -1 : 1;
      const relY = scaleTemp[1] < 0 ? -1 : 1;
      const sx = ((scaleTemp[0] - relX) * globalScaleRadio + relX) / scaleTemp[0] || 0;
      const sy = ((scaleTemp[1] - relY) * globalScaleRadio + relY) / scaleTemp[1] || 0;
      
      /**
       * [cos,  sin, 0]   [sx, 0, 0]    [ cos*sx,  sin*sy,   0]
       * [-sin, cos, 0] * [0, sy, 0] =  [-sin*sx, cost*sy,  0]
       * [0,      0, 1]   [0,  0, 1]    [0,             0,  1]
       */
      m[0] *= sx;
      m[1] *= sx;
      m[2] *= sy;
      m[3] *= sy;
    }

    this.invTransform = this.invTransform || matrix.create();
    matrix.invert(this.invTransform, m);
  }

  updateTransform() {
    const parentTransform = this.parent && this.parent.transform;
    const needLocalTransform = this.needLocalTransform();

    let m = this.transform;

    if (!(needLocalTransform || parentTransform)) {
      m && matrix.identity(m);
    }

    m = m || matrix.create();

    if (needLocalTransform) {
      this.getLocalTransform(m);
    } else {
      matrix.identity(m);
    }

    if (parentTransform) {
      if (needLocalTransform) {
        matrix.mul(m, parentTransform, m);
      } else {
        matrix.copy(m, parentTransform);
      }
    }

    this.transform = m;
    this._resolveGlobalScaleRatio(m);
  }

  getComputedTransform() {
    let transformNode: Transformable = this;
    const ancestors: Transformable[] = [];

    while (transformNode) {
      ancestors.push(transformNode);
      transformNode = transformNode.parent;
    }

    // from top to bottom
    while (transformNode = ancestors.pop()) {
      transformNode.updateTransform();
    }

    return this.transform;
  }

  setLocalTransform(m?: Matrix) {
    if (!m) {
      return;
    }

    /**
     * [cos,  sin, 0]   [1,     skewX, 0]   [sx, 0, 0]   [cos*sx + sin*sx*skewY,  cos*sy*skewX + sin*sy,  1]
     * [-sin, cos, 0] * [skewY,     1, 0] * [0, sy, 0] = [-sin*sx + cos*sx*skewY, -sin*sy*skewX + cos*sy, 1]
     * [0,      0, 1]   [0,         0, 1]   [0,  0, 1]   [0,                                           0, 1]
     * If skewY = 0
     * [cos,  sin, 0]   [1,     skewX, 0]   [sx, 0, 0]   [ cos*sx,  cos*sy*skewX + sin*sy, 1]
     * [-sin, cos, 0] * [0,         1, 0] * [0, sy, 0] = [-sin*sx, -sin*sy*skewX + cos*sy, 1]
     * [0,      0, 1]   [0,         0, 1]   [0,  0, 1]   [      0,                      0, 1]
     * 
     * cos*sy*skewX + sin*sy    cos(a)*sin(b)/cos(b) + sin(a)    cost(a)*sin(b) + sin(a)*cos(b)    sin(a + b)
     * ---------------------  = -----------------------------  = ------------------------------ = ----------- = tan(a + b)
     * -sin*sy*skewX + cos*sy    -sin(a)*sin(b)/cos(b) + cos(a)  -sin(a)*sin(b) + cos(a)*cos(b)    cost(a + b)
     */
    let sx = m[0] * m[0] + m[1] * m[1];
    let sy = m[2] * m[2] + m[3] * m[3];

    const rotation = Math.atan2(-m[1], m[0]); // -PI ~ PI
    // TODO I think formula in zrender isn't correct.
    let shearX = (Math.atan2(m[2], m[3]) - rotation); // -PI/2 ~ PI/2
    if (shearX < -Math.PI/2) {
      shearX += Math.PI * 2;
    }
    if (shearX > Math.PI/2) {
      shearX -= Math.PI * 2;
    }
    sx = Math.sqrt(sx);
    sy = Math.sqrt(sy) * Math.cos(shearX);

    this.skewX = shearX;
    this.skewY = 0;
    this.rotation = rotation;
    
    this.x = +m[4];
    this.y = +m[5];
    this.scaleX = sx;
    this.scaleY = sy;

    this.originX = 0;
    this.originY = 0;
  }

  // transform can't have originX, originY and skewY
  decomposeTransform() {
    if (!this.transform) {
      return;
    }

    const parent = this.parent;
    let m = this.transform;

    if (parent && parent.transform) {
      matrix.mul(transformTemp, parent.invTransform, m);
      m = transformTemp;
    }

    const ox = this.originX;
    const oy = this.originY;
    // this is useless
    // if (ox || oy) {
    //   originTransform[4] = ox;
    //   originTransform[5] = oy;
    //   matrix.mul(transformTemp, m, originTransform);
    //   transformTemp[4] -= ox;
    //   transformTemp[5] -= oy;
    //   m = transformTemp;
    // }

    this.setLocalTransform(m);
  }

  transformCoordToLocal(x: number, y: number): number[] {
    const v2 = [x, y];
    const invT = this.invTransform;
    if (invT) {
      vector.applyTransform(v2, v2, invT);
    }
    return v2;
  }

  transformCoordToGlobal(x: number, y: number): number[] {
    const v2 = [x, y];
    const transform = this.transform;
    if (transform) {
      vector.applyTransform(v2, v2, transform);
    }
    return v2;
  }

  getLineScale() {
    const m = this.transform;
    return m && isNotAroundZero(m[0] - 1) && isNotAroundZero(m[3] - 1) ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1])) : 1;
  }

  copyTransform(source: Transformable) {
    const target = this;
    for (let i = 0; i < TRANSFORMABLE_PROPS.length; i++) {
      const propName = TRANSFORMABLE_PROPS[i];
      target[propName] = source[propName];
    }
  }

}

export const TRANSFORMABLE_PROPS = [
  'x', 'y', 'originX', 'originY', 'rotation', 'scaleX', 'scaleY', 'skewX', 'skewY'
] as const;

export default Transformable;