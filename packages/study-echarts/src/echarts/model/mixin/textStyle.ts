import * as graphicUtil from '../../util/graphic';
import { getFont } from '../../label/labelStyle';
import Model from '../Model';
import { LabelOption, ColorString } from '../../util/types';
import ZRText, { TextStyleProps } from 'zrender/src/graphic/Text';

const PATH_COLOR = ['textStyle', 'color'] as const;
export type LabelFontOption = Pick<LabelOption, 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>;
type LabelRectRelatedOption = Pick<LabelOption,
  'align' | 'verticalAlign' | 'padding' | 'lineHeight' | 'baseline' | 'rich'
  | 'width' | 'height' | 'overflow'
> & LabelFontOption;

const textStyleParams = [
  'fontStyle', 'fontWeight', 'fontSize', 'fontFamily', 'padding',
  'lineHeight', 'rich', 'width', 'height', 'overflow'
] as const;

const tmpText = new ZRText();
class TextStyleMixin {
  /**
   * Get color property or get color from option.textStyle.color
   */
  // TODO Callback
  getTextColor(this: Model, isEmphasis?: boolean): ColorString {
    const ecModel = this.ecModel;
    return this.getShallow('color')
      || (
        (!isEmphasis && ecModel) ? ecModel.get(PATH_COLOR as any) : null
      );
  }

  /**
   * Create font string from fontStyle, fontWeight, fontSize, fontFamily
   * @return {string}
   */
  getFont(this: Model<LabelFontOption>) {
    return getFont({
      fontStyle: this.getShallow('fontStyle'),
      fontWeight: this.getShallow('fontWeight'),
      fontSize: this.getShallow('fontSize'),
      fontFamily: this.getShallow('fontFamily')
    }, this.ecModel!);
  }

  getTextRect(this: Model<LabelRectRelatedOption> & TextStyleMixin, text: string): graphicUtil.BoundingRect {
    const style: TextStyleProps = {
      text: text,
      verticalAlign: this.getShallow('verticalAlign')
        || this.getShallow('baseline')
    };
    for (let i = 0; i < textStyleParams.length; i++) {
      (style as any)[textStyleParams[i]] = this.getShallow(textStyleParams[i]);
    }
    tmpText.useStyle(style);
    tmpText.update();
    return tmpText.getBoundingRect();
  }
};

export default TextStyleMixin;
