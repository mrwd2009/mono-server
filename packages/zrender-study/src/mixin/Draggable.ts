import Handler from '../Handler';
import Element, { ElementEvent } from '../Element';
import Displayable from '../graphic/Displayable';

class Param {
  target: Element;
  topTarget: Element;

  constructor(target: Element, e?: ElementEvent) {
    this.target = target;
    this.topTarget = e && e.topTarget;
  }
}

export default class Draggable {
  handler: Handler;

  _draggingTarget: Element;
  _dropTarget: Element;

  _x: number;
  _y: number;

  constructor(handler: Handler) {
    this.handler = handler;

    handler.on('mousedown', this._dragStart, this);
    handler.on('mousemove', this._drag, this);
    handler.on('mouseup', this._dragEnd, this);
  }

  _dragStart(e: ElementEvent) {
    let draggingTarget = e.target;
    while (draggingTarget && !draggingTarget.draggable) {
      draggingTarget = draggingTarget.parent || draggingTarget.__hostTarget;
    }

    if (draggingTarget) {
      this._draggingTarget = draggingTarget;
      draggingTarget.dragging = true;
      this._x = e.offsetX;
      this._y = e.offsetY;

      this.handler.dispatchToElement(new Param(draggingTarget, e), 'dragstart', e.event);
    }
  }

  _drag(e: ElementEvent) {
    const draggingTarget = this._draggingTarget;
    if (draggingTarget) {
      const x = e.offsetX;
      const y = e.offsetY;
      const dx = x - this._x;
      const dy = y - this._y;
      this._x = x;
      this._y = y;

      draggingTarget.drift(dx, dy, e);

      this.handler.dispatchToElement(new Param(draggingTarget, e), 'drag', e.event);

      const dropTarget = this.handler.findHover(x, y, draggingTarget as Displayable).target;
      const lastDropTarget = this._dropTarget;
      this._dropTarget = dropTarget;

      if (draggingTarget !== dropTarget) {
        if (lastDropTarget && dropTarget !== lastDropTarget) {
          this.handler.dispatchToElement(new Param(lastDropTarget, e), 'dragleave', e.event);
        }

        if (dropTarget && dropTarget !== lastDropTarget) {
          this.handler.dispatchToElement(new Param(dropTarget, e), 'dragenter', e.event);
        }
      }
    }
  }

  _dragEnd(e: ElementEvent) {
    const draggingTarget = this._draggingTarget;

    if (draggingTarget) {
      draggingTarget.dragging = false;
    }

    this.handler.dispatchToElement(new Param(draggingTarget, e), 'dragend', e.event);

    if (this._dropTarget) {
      this.handler.dispatchToElement(new Param(this._dropTarget, e), 'drop', e.event);
    }

    this._draggingTarget = null;
    this._dropTarget = null;
  }
}