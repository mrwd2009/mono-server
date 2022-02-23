import * as zrUtil from 'zrender/src/core/util';
import { Dictionary } from 'zrender/src/core/types';
import { PathStyleProps } from 'zrender/src/graphic/Path';
import Model from '../Model';

export default function makeStyleMapper(properties: readonly string[][], ignoreParent?: boolean) {
  // Normalize
  for (let i = 0; i < properties.length; i++) {
    if (!properties[i][1]) {
      properties[i][1] = properties[i][0];
    }
  }

  ignoreParent = ignoreParent || false;

  return function (model: Model, excludes?: readonly string[], includes?: readonly string[]) {
    const style: Dictionary<any> = {};
    for (let i = 0; i < properties.length; i++) {
      const propName = properties[i][1];
      if ((excludes && zrUtil.indexOf(excludes, propName) >= 0)
        || (includes && zrUtil.indexOf(includes, propName) < 0)
      ) {
        continue;
      }
      const val = model.getShallow(propName, ignoreParent);
      if (val != null) {
        style[properties[i][0]] = val;
      }
    }
    // TODO Text or image?
    return style as PathStyleProps;
  };
}