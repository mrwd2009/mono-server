import makeStyleMapper from './makeStyleMapper';
import Model from '../Model';
import { AreaStyleOption } from '../../util/types';
import { PathStyleProps } from 'zrender/src/graphic/Path';
import { ModuleDeclaration } from '@babel/types';

export const AREA_STYLE_KEY_MAP = [
  ['fill', 'color'],
  ['shadowBlur'],
  ['shadowOffsetX'],
  ['shadowOffsetY'],
  ['opacity'],
  ['shadowColor']
];

const getAreaStyle = makeStyleMapper(AREA_STYLE_KEY_MAP);

type AreaStyleProps = Pick<PathStyleProps,
  'fill' |
  'shadowBlur' |
  'shadowOffsetX' |
  'shadowOffsetY' |
  'opacity' |
  'shadowColor'
>;

class AreaStyleMixin{
  getAreaStyle(this: ModuleDeclaration, excludes?: readonly (keyof AreaStyleOption)[], includes?: readonly (keyof AreaStyleOption)[]): AreaStyleProps {
    return getAreaStyle(this, excludes, includes);
  }
};

export { AreaStyleMixin };