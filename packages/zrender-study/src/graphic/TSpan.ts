import Displayable, {
  DisplayableProps,
  DisplayableStatePropNames,
} from "./Displayable";
import { getBoundingRect, DEFAULT_FONT } from '../contain/text';
import { PathStyleProps, DEFAULT_PATH_STYLE } from './Path';
import { createObject, defaults } from '../core/util';
import type { TextAlign, TextVerticalAlign } from "../core/types";
import BoundingRect from "../core/BoundingRect";

export interface TSpanStyleProps extends PathStyleProps {
  x?: number;
  y?: number;

  text?: string;

  font?: string;

  textAlign?: CanvasTextAlign;

  textBaseline?: CanvasTextBaseline;
}

export const DEFAULT_TSPAN_STYLE: TSpanStyleProps = defaults({
  strokeFirst: true,
  font: DEFAULT_FONT,
  x: 0,
  y: 0,
  textAlign: 'left',
  textBaseLine: 'top',
  miterLimit: 2
} as TSpanStyleProps, DEFAULT_PATH_STYLE);

export interface TSpanProps extends DisplayableProps {
  style?: TSpanStyleProps;
}

export type TSpanState = Pick<TSpanProps, DisplayableStatePropNames>;

class TSpan extends Displayable<TSpanProps> {
  style: TSpanStyleProps;

  constructor() {
    super();
    this.dirtyRectTolerance = 10;
    this.type = 'tspan';
  }

  hasStroke() {
    const style = this.style;
    const stroke = style.stroke;
    return stroke != null && stroke !== 'none' && style.lineWidth > 0;
  }

  hasFill() {
    const style = this.style;
    const fill = style.fill;
    return fill != null && fill !== 'none';
  }

  createStyle(obj?: TSpanStyleProps) {
    return createObject(DEFAULT_TSPAN_STYLE, obj);
  }

  setBoundingRect(rect: BoundingRect) {
    this._rect = rect;
  }

  getBoundingRect(): BoundingRect {
    const style = this.style;

    if (!this._rect) {
      let text = style.text;
      if (text != null) {
        text = `${text}`;
      } else {
        text = '';
      }

      const rect = getBoundingRect(text, style.font, style.textAlign as TextAlign, style.textBaseline as TextVerticalAlign);

      rect.x += style.x || 0;
      rect.y += style.y || 0;

      if (this.hasStroke()) {
        const w = style.lineWidth;
        rect.x -= w / 2;
        rect.y -= w / 2;
        rect.width += w;
        rect.height += w;
      }

      this._rect = rect;
    }

    return this._rect;
  }

  protected static initDefaultProps = (() => {
    TSpan.prototype.dirtyRectTolerance = 10;
  })();
}

export default TSpan;