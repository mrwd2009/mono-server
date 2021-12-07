import Element, { ElementProps } from '../Element';
import BoundingRect from '../core/BoundingRect';
import { Matrix } from '../core/matrix';
import Displayable from './Displayable';
import { indexOf } from '../core/util';

export interface GroupProps extends ElementProps {

}

class Group extends Element<GroupProps> {
  readonly isGroup = true;

  private _children: Element[] = [];

  constructor(opts?: GroupProps) {
    super();
    this.attr(opts);
  }

  childrenRef() {
    return this._children;
  }

  children() {
    return this._children.slice();
  }

  childAt(idx: number): Element {
    return this._children[idx];
  }

  childOfName(name: string): Element {
    const children = this._children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].name === name) {
        return children[i];
      }
    }
  }

  childCount(): number {
    return this._children.length;
  }

  add(child: Element): Group {
    if (child) {
      if (child !== this && child.parent !== this) {
        this._children.push(child);
        this._doAdd(child);
      }
      if (child.__hostTarget) {
        throw new Error('This element has been used as an attachment');
      }
    }

    return this;
  }

  addBefore(child: Element, nextSibling: Element) {
    if (child && child !== this && child.parent !== this && nextSibling && nextSibling.parent === this) {
      const children = this._children;
      const idx = indexOf(children, nextSibling);

      if (idx >= 0) {
        children.splice(idx, 0, child);
        this._doAdd(child);
      }
    }
    return this;
  }

  replace(oldChild: Element, newChild: Element) {
    const idx = indexOf(this._children, oldChild);
    if (idx >= 0) {
      this.replaceAt(newChild, idx);
    }
    return this;
  }

  replaceAt(child: Element, index: number) {
    const children = this._children;
    const old = children[index];

    if (child && child !== this && child.parent !== this && child !== old) {
      children[index] = child;
      old.parent = null;
      const zr = this.__zr;
      if (zr) {
        old.removeSelfFromZr(zr);
      }

      this._doAdd(child);
    }

    return this;
  }

  _doAdd(child: Element) {
    if (child.parent) {
      (child.parent as Group).remove(child);
    }

    child.parent = this;
    const zr = this.__zr;
    if (zr && zr !== (child as Group).__zr) {
      child.addSelfToZr(zr);
    }
    zr?.refresh();
  }

  remove(child: Element) {
    const zr = this.__zr;
    const children = this._children;

    const idx = indexOf(children, child);
    if (idx < 0) {
      return this;
    }
    children.splice(idx, 1);
    child.parent = null;

    if (zr) {
      child.removeSelfFromZr(zr);
    }
    zr?.refresh();

    return this;
  }

  removeAll() {
    const children = this._children;
    const zr = this.__zr;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (zr) {
        child.removeSelfFromZr(zr);
      }
      child.parent = null;
    }

    children.length = 0;
    return this;
  }

  eachChild<Context>(cb: (this: Context, el: Element, index?: number) => void, context?: Context) {
    const children = this._children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      cb.call(context, child, i);
    }
    return this;
  }

  traverse<T>(cb: (this: T, el: Element) => boolean | void, context?: T) {
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i];
      const stopped = cb.call(context, child);
      if (child.isGroup && !stopped) {
        child.traverse(cb, context);
      }
    }
    return this;
  }

  addSelfToZr(zr: ZRenderType) {
    super.addSelfToZr(zr);
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i];
      child.addSelfToZr(zr);
    }
  }

  removeSelfFromZr(zr: ZRenderType) {
    super.removeSelfFromZr(zr);
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children[i];
      child.removeSelfFromZr(zr);
    }
  }

  getBoundingRect(includeChildren?: Element[]): BoundingRect {
    const tmpRect = new BoundingRect(0, 0, 0, 0);
    const children = includeChildren || this._children;
    const tmpMat: Matrix = [];
    let rect = null;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.ignore || (child as Displayable).invisible) {
        continue;
      }
      const childRect = child.getBoundingRect();
      const transform = child.getLocalTransform(tmpMat);

      if (transform) {
        BoundingRect.applyTransform(tmpRect, childRect, transform);
        rect = rect || tmpRect.clone();
        rect.union(tmpRect);
      } else {
        rect = rect || childRect.clone();
        rect.union(childRect);
      }
    }

    return rect || tmpRect;
  }
}

Group.prototype.type = 'group';

export interface GroupLike extends Element {
  childrenRef(): Element []
}

export default Group;