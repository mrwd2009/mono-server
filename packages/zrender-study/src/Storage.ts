import * as util from './core/util';
import env from './core/env';
import Group, { GroupLike } from './graphic/Group';
import Element from './Element';
import timsort from './core/timsort'; // in most case elements are partially sorted.
import Displayable from './graphic/Displayable';
import Path from './graphic/Path';
import { REDRAW_BIT } from './graphic/constants';

let invalidZErrorLogged = false;
function logInvalidZError() {
    if (invalidZErrorLogged) {
        return;
    }
    invalidZErrorLogged = true;
    console.warn('z / z2 / zlevel of displayable is invalid, which may cause unexpected errors');
}

function shapeCompareFunc(a: Displayable, b: Displayable) {
  if (a.zlevel === b.zlevel) {
    if (a.z === b.z) {
      return a.z2 - b.z2;
    }
    return a.z - b.z;
  }
  return a.zlevel - b.zlevel;
}

export default class Storage {
  private _roots: Element[] = [];
  private _displayList: Displayable[] = [];
  private _displayListLen = 0;

  traverse<T>(cb: (this: T, el: Element) => void, context?: T) {
    for (let i = 0; i < this._roots.length; i++) {
      this._roots[i].traverse(cb, context);
    }
  }

  getDisplayList(update?: boolean, includeIgnore?: boolean): Displayable[] {
    includeIgnore = includeIgnore || false;
    const displayList = this._displayList;
    if (update || !displayList.length) {
      this.updateDisplayList(includeIgnore);
    }
    return displayList;
  }

  updateDisplayList(includeIgnore?: boolean) {
    this._displayListLen = 0;

    const roots = this._roots;
    const displayList = this._displayList;
    for (let i = 0; i < roots.length; i++) {
      this._updateAndAddDisplayable(roots[i], null, includeIgnore);
    }

    displayList.length = this._displayListLen;

    if (env.canvasSupported) {
      timsort(displayList, shapeCompareFunc);
    }
  }

  private _updateAndAddDisplayable(el: Element, clipPaths: Path[], includeIgnore?: boolean) {
    if (el.ignore && !includeIgnore) {
      return;
    }
    el.beforeUpdate();
    el.update();
    el.afterUpdate();

    const userSetClipPath = el.getClipPath();

    if (el.ignoreClip) {
      clipPaths = null;
    } else if (userSetClipPath) {
      if (clipPaths) {
        clipPaths = clipPaths.slice();
      } else {
        clipPaths = [];
      }

      let currentClipPath = userSetClipPath;
      let parentClipPath = el;

      while (currentClipPath) {
        currentClipPath.parent = parentClipPath as Group;
        currentClipPath.updateTransform();
        clipPaths.push(currentClipPath);

        parentClipPath = currentClipPath;
        currentClipPath = currentClipPath.getClipPath();
      }
    }

    if ((el as GroupLike).childrenRef) {
      const children = (el as GroupLike).childrenRef();

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (el.__dirty) {
          child.__dirty |= REDRAW_BIT;
        }

        this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
      }

      el.__dirty = 0;
    } else {
      const disp = el as Displayable;

      if (clipPaths && clipPaths.length) {
        disp.__clipPaths = clipPaths;
      } else if (disp.__clipPaths && disp.__clipPaths.length) {
        disp.__clipPaths = [];
      }

      if (isNaN(disp.z)) {
        logInvalidZError();
        disp.z = 0;
      }

      if (isNaN(disp.z2)) {
        logInvalidZError();
        disp.z2 = 0;
      }

      if (isNaN(disp.zlevel)) {
        logInvalidZError();
        disp.zlevel = 0;
      }

      this._displayList[this._displayListLen++] = disp;
    }

    const decalEl = (el as Path).getDecalElement && (el as Path).getDecalElement();
    if (decalEl) {
      this._updateAndAddDisplayable(decalEl, clipPaths, includeIgnore);
    }

    const textGuide = el.getTextGuideLine();
    if (textGuide) {
      this._updateAndAddDisplayable(textGuide, clipPaths, includeIgnore);
    }

    const textEl = el.getTextContent();
    if (textEl) {
      this._updateAndAddDisplayable(textEl, clipPaths, includeIgnore);
    }
  }

  addRoot(el: Element) {
    if (el.__zr && el.__zr.storage === this) {
      return;
    }
    this._roots.push(el);
  }

  delRoot(el: Element | Element[]) {
    if (el instanceof Array) {
      for (let i = 0; i < el.length; i++) {
        this.delRoot(el[i]);
      }
      return;
    }

    const idx = util.indexOf(this._roots, el);
    if (idx >= 0) {
      this._roots.splice(idx, 1);
    }
  }

  delAllRoots() {
    this._roots = [];
    this._displayList = [];
    this._displayListLen = 0;
  }

  getRoots() {
    return this._roots;
  }

  dispose() {
    this._displayList = null;
    this._roots = null;
    this._displayListLen = 0;
  }

  displayableSortFunc = shapeCompareFunc;
}