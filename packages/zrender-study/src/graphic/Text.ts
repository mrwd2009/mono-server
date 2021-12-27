import { TextAlign, TextVerticalAlign, ImageLike, Dictionary, MapToType } from '../core/types';
import { parseRichText, parsePlainText } from './helper/parseText';
import TSpan, { TSpanStyleProps } from './TSpan';
import { retrieve2, forEach, normalizeCssArray, trim, retrieve3, extend, keys, defaults } from '../core/util';
import { DEFAULT_FONT, adjustTextX, adjustTextY } from '../contain/text';
import ZRImage from './Image';
import Rect from './shape/Rect';
import BoundingRect from '../core/BoundingRect';
import { Matrix } from '../core/matrix';
import Displayable, { DisplayableStatePropNames, DisplayableProps, DEFAULT_COMMON_ANIMATION_PROPS, DisplayableState } from './Displayable';
import { ZRenderType } from '../zrender';
import Animator from '../animation/Animator';
import Transformable from '../core/Transformable';
import { ElementCommonState } from '../Element';
import { GroupLike } from './Group';

type TextContentBlock = ReturnType<typeof parseRichText>;
type TextLine = TextContentBlock['lines'][0];
type TextToken = TextLine['tokens'][0];

export interface TextStylePropsPart {
  text?: string;

  fill?: string;
  stroke?: string;

  opacity?: number;
  fillOpacity?: number;
  strokeOpacity?: number;

  lineWidth?: number;
  lineDash?: false | number[];
  lineDashOffset?: number;
  borderDash?: false | number [];
  borderDashOffset?: number;

  font?: string;
  textFont?: string;

  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fontFamily?: string;

  fontSize?: number | string;

  align?: TextAlign;
  verticalAlign?: TextVerticalAlign;

  lineHeight?: number;
  width?: number | string;

  height?: number;

  tag?: string;

  textShadowColor?: string;
  textShadowBlur?: number;
  textShadowOffsetX?: number;
  textShadowOffsetY?: number;

  backgroundColor?: string | {
    image: ImageLike | string,
  };

  padding?: number | number [];
  margin?: number;

  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number | number[];

  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export interface TextStyleProps extends TextStylePropsPart {
  text?: string;
  
  x?: number;
  y?: number;

  width?: number;
  rich?: Dictionary<TextStylePropsPart>;

  overflow?: 'break' | 'breakAll' | 'truncate' | 'none';

  lineOverflow?: 'truncate';

  ellipsis?: string;

  placeholder?: string;

  truncateMinChar?: number;
}

export interface TextProps extends DisplayableProps {
  style?: TextStyleProps;

  zlevel?: number;
  z?: number;
  z2?: number;

  culling?: boolean;
  cursor?: string;
}

export type TextState = Pick<TextProps, DisplayableStatePropNames> & ElementCommonState;

export type DefaultTextStyle = Pick<TextStyleProps, 'fill' | 'stroke' | 'align' | 'verticalAlign'> & {
  autoStroke?: boolean;
}

const DEFAULT_RICH_TEXT_COLOR = {
  fill: '#000',
};

const DEFAULT_STROKE_LINE_WIDTH = 2;

export const DEFAULT_TEXT_ANIMATION_PROPS: MapToType<TextProps, boolean> = {
  style: defaults<MapToType<TextStyleProps, boolean>, MapToType<TextStyleProps, boolean>>({
    fill: true,
    stroke: true,
    fillOpacity: true,
    strokeOpacity: true,
    lineWidth: true,
    fontSize: true,
    lineHeight: true,
    width: true,
    height: true,
    textShadowColor: true,
    textShadowBlur: true,
    textShadowOffsetX: true,
    textShadowOffsetY: true,
    backgroundColor: true,
    padding: true,
    borderColor: true,
    borderWidth: true,
    borderRadius: true,
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
}

interface ZRText {
  animate(key?: '', loop?: boolean): Animator<this>
  animate(key: 'style', loop?: boolean): Animator<TextProps['style']>

  getState(stateName: string): TextState
  ensureState(stateName: string): TextState

  states: Dictionary<TextState>
  stateProxy: (stateName: string) => TextState
}

class ZRText extends Displayable<TextProps> implements GroupLike {
  type = 'text';

  style: TextStyleProps;

  overlap: 'hidden' | 'show' | 'blur';

  innerTransformable: Transformable;

  private _children: (ZRImage | Rect | TSpan)[] = [];

  private _childCursor: 0;

  private _defaultStyle: DefaultTextStyle = DEFAULT_RICH_TEXT_COLOR;

  constructor(opts?: TextProps, skipInit: boolean = false) {
    super(opts, true);
    if (!skipInit) {
      this._init(opts);
    }
  }

  childrenRef() {
    return this._children;
  }

  update() {
    super.update();
    if (this.styleChanged()) {
      this._updateSubTexts();
    }

    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i];
      child.zlevel = this.zlevel;
      child.z = this.z;
      child.z2 = this.z2;
      child.culling = this.culling;
      child.cursor = this.cursor;
      child.invisible = this.invisible;
    }
  }

  updateTransform() {
    const innerTransformable = this.innerTransformable;
    if (innerTransformable) {
      innerTransformable.updateTransform();
      if (innerTransformable.transform) {
        this.transform = innerTransformable.transform;
      }
    } else {
      super.updateTransform();
    }
  }

  getLocalTransform(m?: Matrix): Matrix {
    const inner = this.innerTransformable;
    return inner ? inner.getLocalTransform(m) : super.getLocalTransform(m);
  }

  getComputedTransform() {
    if (this.__hostTarget) {
      this.__hostTarget.getComputedTransform();
      this.__hostTarget.updateInnerText(true);
    }
    return super.getComputedTransform();
  }

  private _updateSubTexts() {
    this._childCursor = 0;

    normalizeTextStyle(this.style);
    this.style.rich ? this._updateRichTexts() : this._updatePlainTexts();

    this._children.length = this._childCursor;
    this.styleUpdated();
  }

  addSelfToZr(zr: ZRenderType) {
    super.addSelfToZr(zr);

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].__zr = zr;
    }
  }

  removeSelfFromZr(zr: ZRenderType) {
    super.removeSelfFromZr(zr);
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].__zr = null;
    }
  }

  getBoundingRect(): BoundingRect {
    if (this.styleChanged()) {
      this._updateSubTexts();
    }

    if (!this._rect) {
      const tmpRect = new BoundingRect(0, 0, 0, 0);
      const children = this._children;
      const tmpMat: Matrix = [];
      let rect = null;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childRect = child.getBoundingRect();
        const transform = child.getLocalTransform(tmpMat);

        if (transform) {
          tmpRect.copy(childRect);
          tmpRect.applyTransform(transform);
          rect = rect || tmpRect.clone();
          rect.union(tmpRect);
        } else {
          rect = rect || childRect.clone();
          rect.union(childRect);
        }
      }
      this._rect = rect || tmpRect;
    }

    return this._rect;
  }

  setDefaultTextStyle(defaultTextStyle: DefaultTextStyle) {
    this._defaultStyle = defaultTextStyle || DEFAULT_RICH_TEXT_COLOR;
  }

  setTextContent(textContent: never) {
    throw new Error('Can\'t attach text on another text.');
  }

  protected _mergeStyle(targetStyle: TextStyleProps, sourceStyle: TextStyleProps) {
    if (!sourceStyle) {
      return targetStyle;
    }

    const sourceRich = sourceStyle.rich;
    const targetRich = targetStyle.rich || (sourceRich && {});

    extend(targetStyle, sourceStyle);

    if (sourceRich && targetRich) {
      this._mergeRich(targetRich, sourceRich);
      targetStyle.rich = targetRich;
    } else if (targetRich){ 
      targetStyle.rich = targetRich;
    }

    return targetStyle;
  }

  private _mergeRich(targetRich: TextStyleProps['rich'], sourceRich: TextStyleProps['rich']) {
    const richNames = keys(sourceRich);
    for (let i = 0; i < richNames.length; i++) {
      const richName = richNames[i];
      targetRich[richName] = targetRich[richName] || {};
      extend(targetRich[richName], sourceRich[richName]);
    }
  }

  getAnimationStyleProps() {
    return DEFAULT_TEXT_ANIMATION_PROPS;
  }

  private _getOrCreateChild(Ctor: { new(): TSpan }): TSpan
  private _getOrCreateChild(Ctor: { new(): ZRImage }): ZRImage
  private _getOrCreateChild(Ctor: { new(): Rect }): Rect
  private _getOrCreateChild(Ctor: { new(): TSpan | Rect | ZRImage }): TSpan | Rect | ZRImage {
    let child = this._children[this._childCursor];

    if (!child || !(child instanceof Ctor)) {
      child = new Ctor();
    }
    this._children[this._childCursor++] = child;
    child.__zr = this.__zr;
    child.parent = this as any;
    return child;
  }

  private _updatePlainTexts() {
    const style = this.style;
    const textFont = style.font || DEFAULT_FONT;
    const textPadding = style.padding as number[];
    
    const text = getStyleText(style);
    const contentBlock = parsePlainText(text, style);
    const needDrawBg = needDrawBackground(style);
    const bgColorDrawn = !!(style.backgroundColor);

    let outerHeight = contentBlock.outerHeight;
    const textLines = contentBlock.lines;
    const lineHeight = contentBlock.lineHeight;

    const defaultStyle = this._defaultStyle;

    const baseX = style.x || 0;
    const baseY = style.y || 0;
    const textAlign = style.align || defaultStyle.align || 'left';
    const verticalAlign = style.verticalAlign || defaultStyle.verticalAlign || 'top';

    let textX = baseX;
    let textY = adjustTextY(baseY, contentBlock.contentHeight, verticalAlign);

    if (needDrawBg || textPadding) {
      let outerWidth = contentBlock.width;
      textPadding && (outerWidth += textPadding[1] + textPadding[3]);
      const boxX = adjustTextX(baseX, outerWidth, textAlign);
      const boxY = adjustTextY(baseY, outerHeight, verticalAlign);

      needDrawBg && this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
    }

    textY += lineHeight / 2;

    if (textPadding) {
      textX = getTextXForPadding(baseX, textAlign, textPadding);
      if (verticalAlign === 'top') {
        textY += textPadding[0];
      } else if (verticalAlign === 'bottom') {
        textY -= textPadding[2];
      }
    }

    let defaultlineWidth = 0;
    let useDefaultFill = false;
    const textFill = getFill('fill' in style ? style.fill : (useDefaultFill = true, defaultStyle.fill));
    const textStroke = getStroke('stroke' in style ? style.stroke : ((!bgColorDrawn && (!defaultStyle.autoStroke || useDefaultFill) ? (defaultlineWidth = DEFAULT_STROKE_LINE_WIDTH, defaultStyle.stroke) : null)));

    const hasShadow = style.textShadowBlur > 0;
    const fixedBoundingRect = style.width != null && (style.overflow === 'truncate' || style.overflow === 'break' || style.overflow === 'breakAll');
    const calculatedLineHeight = contentBlock.calculatedLineHeight;

    for (let i =0; i < textLines.length; i++) {
      const el = this._getOrCreateChild(TSpan);

      const subElStyle: TSpanStyleProps = el.createStyle();
      el.useStyle(subElStyle);
      subElStyle.text = textLines[i];
      subElStyle.x = textX;
      subElStyle.y = textY;

      if (textAlign) {
        subElStyle.textAlign = textAlign;
      }

      subElStyle.textBaseline = 'middle';
      subElStyle.opacity = style.opacity;
      subElStyle.strokeFirst = true;

      if (hasShadow) {
        subElStyle.shadowBlur = style.textShadowBlur || 0;
        subElStyle.shadowColor = style.textShadowColor || 'transparent';
        subElStyle.shadowOffsetX = style.textShadowOffsetX || 0;
        subElStyle.shadowOffsetY = style.textShadowOffsetY || 0;
      }

      if (textStroke) {
        subElStyle.stroke = textStroke as string;
        subElStyle.lineWidth = style.lineWidth || defaultlineWidth;
        subElStyle.lineDash = style.lineDash;
        subElStyle.lineDashOffset = style.lineDashOffset || 0;
      }

      if (textFill) {
        subElStyle.fill = textFill as string;
      }

      subElStyle.font = textFont;

      textY += lineHeight;

      if (fixedBoundingRect) {
        el.setBoundingRect(new BoundingRect(
          adjustTextX(subElStyle.x, style.width, subElStyle.textAlign as TextAlign),
          adjustTextY(subElStyle.y, calculatedLineHeight, subElStyle.textBaseline as TextVerticalAlign),
          style.width,
          calculatedLineHeight,
        ));
      }
    }
  }

  private _updateRichTexts() {
    const style = this.style;

    const text = getStyleText(style);
    const contentBlock = parseRichText(text, style);

    const contentWidth = contentBlock.width;
    const outerWidth = contentBlock.outerWidth;
    const outerHeight = contentBlock.outerHeight;
    const textPadding = style.padding as number[];

    const baseX = style.x || 0;
    const baseY = style.y || 0;
    const defaultStyle = this._defaultStyle;
    const textAlign = style.align || defaultStyle.align;
    const verticalAlign = style.verticalAlign || defaultStyle.verticalAlign;

    const boxX = adjustTextX(baseX, outerWidth, textAlign);
    const boxY = adjustTextY(baseY, outerHeight, verticalAlign);
    let xLeft = boxX;
    let lineTop = boxY;

    if (textPadding) {
      xLeft += textPadding[3];
      lineTop += textPadding[0];
    }

    let xRight = xLeft + contentWidth;

    if (needDrawBackground(style)) {
      this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
    }

    const bgColorDrawn = !!(style.backgroundColor);

    for (let i = 0; i < contentBlock.lines.length; i++) {
      const line = contentBlock.lines[i];
      const tokens = line.tokens;
      const tokenCount = tokens.length;
      const lineHeight = line.lineHeight;

      let remainedWidth = line.width;
      let leftIndex = 0;
      let lineXLeft = xLeft;
      let lineXRight = xRight;
      let rightIndex = tokenCount - 1;
      let token;

      while (leftIndex < tokenCount && (token = tokens[leftIndex], !token.align || token.align === 'left')) {
        this._placeToken(token, style, lineHeight, lineTop, lineXLeft, 'left', bgColorDrawn);
        remainedWidth -= token.width;
        lineXLeft += token.width;
        leftIndex++;
      }

      while (rightIndex >= 0 && (token = tokens[rightIndex], token.align === 'right')) {
        this._placeToken(token, style, lineHeight, lineTop, lineXRight, 'right', bgColorDrawn);
        remainedWidth -= token.width;
        lineXRight -= token.width;
        rightIndex--;
      }

      lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - remainedWidth) / 2;
      while(leftIndex <= rightIndex) {
        token = tokens[leftIndex];
        this._placeToken(token, style, lineHeight, lineTop, lineXLeft + token.width / 2, 'center', bgColorDrawn);
        lineXLeft += token.width;
        leftIndex++;
      }

      lineTop += lineHeight;
    }
  }

  private _placeToken(token: TextToken, style: TextStyleProps, lineHeight: number, lineTop: number, x: number, textAlign: string, parentBgColorDrawn: boolean) {
    const tokenStyle = style.rich[token.styleName] || {};
    tokenStyle.text = token.text;
    
    const verticalAlign = token.verticalAlign;
    let y = lineTop + lineHeight / 2;
    if (verticalAlign === 'top') {
      y = lineTop + token.height / 2;
    } else if (verticalAlign === 'bottom') {
      y = lineTop + lineHeight - token.height / 2;
    }

    const needDrawBg = !token.isLineHolder && needDrawBackground(tokenStyle);
    needDrawBg && this._renderBackground(tokenStyle, style, textAlign === 'right' ? x - token.width : ( textAlign === 'center' ?  x - token.width / 2 : x), y - token.height / 2, token.width, token.height);
    const bgColorDrawn = !!tokenStyle.backgroundColor;

    const textPadding = token.textPadding;
    if (textPadding) {
      x = getTextXForPadding(x, textAlign, textPadding);
      y -= token.height / 2 - textPadding[0] - token.innerHeight / 2;
    }

    const el = this._getOrCreateChild(TSpan);
    const subElStyle: TSpanStyleProps = el.createStyle();
    el.useStyle(subElStyle);

    const defaultStyle = this._defaultStyle;
    let useDefaultFill = false;
    let defaultLineWidth = 0;

    const textFill = getFill('fill' in tokenStyle ? tokenStyle.fill : ('fill' in style ? style. fill : (useDefaultFill = true, defaultStyle.fill)));
    const textStroke = getStroke('stroke' in tokenStyle ? tokenStyle.stroke : ('stroke' in style ? style.stroke : (!bgColorDrawn && !parentBgColorDrawn && (!defaultStyle.autoStroke || useDefaultFill)) ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, defaultStyle.stroke) : null));

    const hasShadow = tokenStyle.textShadowBlur > 0 || style.textShadowBlur > 0;

    subElStyle.text = token.text;
    subElStyle.x = x;
    subElStyle.y = y;

    if (hasShadow) {
      subElStyle.shadowBlur = tokenStyle.textShadowBlur || style.textShadowBlur || 0;
      subElStyle.shadowColor = tokenStyle.textShadowColor || style.textShadowColor || 'transparent';
      subElStyle.shadowOffsetX = tokenStyle.textShadowOffsetX || style.textShadowOffsetX || 0;
      subElStyle.shadowOffsetY = tokenStyle.textShadowOffsetY | style.textShadowOffsetY || 0;
    }

    subElStyle.textAlign = textAlign as CanvasTextAlign;
    subElStyle.textBaseline = 'middle';
    subElStyle.font = token.font || DEFAULT_FONT;
    subElStyle.opacity = retrieve3(tokenStyle.opacity, style.opacity, 1);

    if (textStroke) {
      subElStyle.lineWidth = retrieve3(tokenStyle.lineWidth, style.lineWidth, defaultLineWidth);
      subElStyle.lineDash = retrieve2(tokenStyle.lineDash, style.lineDash);
      subElStyle.lineDashOffset = style.lineDashOffset || 0;
      subElStyle.stroke = textStroke;
    }

    if (textFill) {
      subElStyle.fill = textFill;
    }

    const textWidth = token.contentWidth;
    const textHeight = token.contentHeight;
    el.setBoundingRect(new BoundingRect(
      adjustTextX(subElStyle.x, textWidth, subElStyle.textAlign as TextAlign),
      adjustTextY(subElStyle.y, textHeight, subElStyle.textBaseline as TextVerticalAlign),
      textWidth,
      textHeight,
    ));
  }

  private _renderBackground(style: TextStylePropsPart, topStyle: TextStylePropsPart, x: number, y: number, width: number, height: number) {
    const textBackgroundColor = style.backgroundColor;
    const textBorderWdith = style.borderWidth;
    const textBorderColor = style.borderColor;
    const isImageBg = textBackgroundColor && (textBackgroundColor as { image: ImageLike }).image;
    const isPlainGradientBg = textBackgroundColor && !isImageBg;
    const textBorderRadius = style.borderRadius;

    let rectEl: Rect;
    let imgEl: ZRImage;

    if (isPlainGradientBg || style.lineHeight || (textBorderWdith && textBorderColor)) {
      rectEl = this._getOrCreateChild(Rect);
      rectEl.useStyle(rectEl.createStyle());
      rectEl.style.fill = null;
      
      const rectShape = rectEl.shape;
      rectShape.x = x;
      rectShape.y = y;
      rectShape.width = width;
      rectShape.height = height;
      rectShape.r = textBorderRadius;
      rectEl.dirtyShape();
    }

    if (isPlainGradientBg) {
      const rectStyle = rectEl.style;
      rectStyle.fill = textBackgroundColor as string || null;
      rectStyle.fillOpacity = retrieve2(style.fillOpacity, 1);
    } else if (isImageBg) {
      imgEl = this._getOrCreateChild(ZRImage);
      // not called in svg painter, for background it's enough to display
      imgEl.onload = () => {
        this.dirtyStyle();
      };
      const imageStyle = imgEl.style;
      imageStyle.image = (textBackgroundColor as { image: ImageLike }).image;
      imageStyle.x = x;
      imageStyle.y = y;
      imageStyle.width = width;
      imageStyle.height = height;
    }

    if (textBorderWdith && textBorderColor) {
      const rectStyle = rectEl.style;
      rectStyle.lineWidth = textBorderWdith;
      rectStyle.stroke = textBorderColor;
      rectStyle.strokeOpacity = retrieve2(style.strokeOpacity, 1);
      rectStyle.lineDash = style.borderDash;
      rectStyle.lineDashOffset = style.borderDashOffset || 0;
      rectEl.strokeContainThreshold = 0;

      if (rectEl.hasFill() && rectEl.hasStroke()) {
        rectStyle.strokeFirst = true;
        rectStyle.lineWidth += 2;
      }
    }

    const commonStyle = (rectEl || imgEl).style;
    commonStyle.shadowBlur = style.shadowBlur || 0;
    commonStyle.shadowColor = style.shadowColor || 'transparent';
    commonStyle.shadowOffsetX = style.shadowOffsetX || 0;
    commonStyle.shadowOffsetY = style.shadowOffsetY || 0;
    commonStyle.opacity = retrieve3(style.opacity, topStyle.opacity, 1);
  }

  static makeFont(style: TextStylePropsPart): string {
    let font = '';
    if (style.fontSize || style.fontFamily || style.fontWeight) {
      let fontSize = '';
      if (typeof style.fontSize === 'string' && (style.fontSize.indexOf('px') !== -1 || style.fontSize.indexOf('rem') !== -1 || style.fontSize.indexOf('em') !== -1)) {
        fontSize = style.fontSize;
      } else if (!isNaN(+style.fontSize)) {
        fontSize = `${style.fontSize}px`
      } else {
        fontSize = '12px';
      }

      font = [
        style.fontStyle,
        style.fontWeight,
        fontSize,
        style.fontFamily || 'sans-serif'
      ].join(' ');
    }

    return font && trim(font) || style.textFont || style.font;
  }
}

const VALID_TEXT_ALIGN = { left: true, right: 1, center: 1 };
const VALID_TEXT_VERTICAL_ALIGN = { top: 1, bottom: 1, middle: 1 };

export function normalizeTextStyle(style: TextStyleProps): TextStyleProps {
  normalizeStyle(style);
  forEach(style.rich, normalizeStyle);
  return style;
}

function normalizeStyle(style: TextStylePropsPart) {
  if (style) {
    style.font = ZRText.makeFont(style);
    let textAlign = style.align;
    (textAlign as string) === 'middle' && (textAlign = 'center');
    style.align = (textAlign == null || VALID_TEXT_ALIGN[textAlign]) ? textAlign : 'left';

    let verticalAlign = style.verticalAlign;
    (verticalAlign as string) === 'center' && (verticalAlign = 'middle');
    style.verticalAlign = (verticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[verticalAlign]) ? verticalAlign : 'top';

    const textPadding = style.padding;
    if (textPadding) {
      style.padding = normalizeCssArray(style.padding);
    }
  }
}

function getStroke(stroke?: TextStylePropsPart['stroke'], lineWidth?: number) {
  return (stroke == null || lineWidth <= 0 || stroke === 'transparent' || stroke === 'none') ? null : (((stroke as any).image || (stroke as any).colorStops) ? '#000' : stroke);
}

function getFill(fill?: TextStylePropsPart['fill']) {
  return (fill == null || fill === 'none') ? null : (((fill as any).image || (fill as any).colorStops) ? '#000' : fill);
}

function getTextXForPadding(x: number, textAlign: string, textPadding: number[]): number {
  if (textAlign === 'right') {
    return x - textPadding[1];
  }

  if (textAlign === 'center') {
    return x + textPadding[3] / 2 - textPadding[1] / 2;
  }

  return x + textPadding[3];
}

function getStyleText(style: TextStylePropsPart): string {
  let text = style.text;
  if (text != null) {
    text += '';
  }
  return text;
}

function needDrawBackground(style: TextStylePropsPart): boolean {
  return !!(style.backgroundColor || style.lineHeight || (style.borderWidth && style.borderColor));
}

export default ZRText;