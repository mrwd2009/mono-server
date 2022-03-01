import Element from 'zrender/src/Element';

export function findEventDispatcher(
  target: Element,
  det: (target: Element) => boolean,
  returnFirstMatch?: boolean
) {
  let found;
  while (target) {
    if (det(target)) {
      found = target;
      if (returnFirstMatch) {
        break;
      }
    }

    target = target.__hostTarget || target.parent;
  }
  return found;
}