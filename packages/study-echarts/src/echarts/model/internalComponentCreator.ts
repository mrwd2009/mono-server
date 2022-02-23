import GlobalModel from './Global';
import { ComponentOption, ComponentMainType } from '../util/types';
import { createHashMap, assert } from 'zrender/src/core/util';
import { isComponentIdInternal } from '../util/model';

const __DEV__ = process.env.NODE_ENV === 'development';

interface InternalOptionCreator {
  (ecModel: GlobalModel): ComponentOption[]
}

const internalOptionCreatorMap = createHashMap<InternalOptionCreator, string>();

export function registerInternalOptionCreator(mainType: ComponentMainType, creator: InternalOptionCreator) {
  assert(internalOptionCreatorMap.get(mainType) == null && creator);
  internalOptionCreatorMap.set(mainType, creator);
}

export function concatInternalOptions(
  ecModel: GlobalModel,
  mainType: ComponentMainType,
  newCmptOptionList: ComponentOption[]
): ComponentOption[] {
  const internalOptionCreator = internalOptionCreatorMap.get(mainType);
  if (!internalOptionCreator) {
    return newCmptOptionList;
  }
  const internalOptions = internalOptionCreator(ecModel);
  if (!internalOptions) {
    return newCmptOptionList;
  }
  if (__DEV__) {
    for (let i = 0; i < internalOptions.length; i++) {
      assert(isComponentIdInternal(internalOptions[i]));
    }
  }
  return newCmptOptionList.concat(internalOptions);
}