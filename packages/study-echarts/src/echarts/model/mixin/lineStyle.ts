import makeStyleMapper from './makeStyleMapper';
import Model from '../Model';
import { LineStyleOption } from '../../util/types';
import { PathStyleProps } from 'zrender/src/graphic/Path';

export const LINE_STYLE_KEY_MAP = [
  ['lineWidth', 'width'],
  ['stroke', 'color'],
  ['opacity'],
  ['shadowBlur'],
  ['shadowOffsetX'],
  ['shadowOffsetY'],
  ['shadowColor'],
  ['lineDash', 'type'],
  ['lineDashOffset', 'dashOffset'],
  ['lineCap', 'cap'],
  ['lineJoin', 'join'],
  ['miterLimit']
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
];

const getLineStyle = makeStyleMapper(LINE_STYLE_KEY_MAP);

type LineStyleKeys = 'lineWidth'
  | 'stroke'
  | 'opacity'
  | 'shadowBlur'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'shadowColor'
  | 'lineDash'
  | 'lineDashOffset'
  | 'lineCap'
  | 'lineJoin'
  | 'miterLimit';

export type LineStyleProps = Pick<PathStyleProps, LineStyleKeys>;

class LineStyleMixin {

  getLineStyle(
    this: Model,
    excludes?: readonly (keyof LineStyleOption)[]
  ): LineStyleProps {
    return getLineStyle(this, excludes);
  }

};

export { LineStyleMixin };