import * as util from './core/util';
import * as vec2 from './core/vector';
// import Draggable from './mixin/Draggable';
import Eventful from './core/Eventful';
import * as eventTool from './core/event';
import { GestureMgr } from './core/GestureMgr';
import Displayable from './graphic/Displayable';
import { PainterBase  } from './PainterBase';
import HandlerDomProxy, { HandlerProxyInterface } from './dom/HandlerProxy';
import { ZRRawEvent, ZRPinchEvent, ElementEventName, ElementEventNameWithOn, ZRRawTouchEvent } from './core/types';
import Storage from './Storage';
import Element, { ElementEvent } from './Element';


const SILENT = 'silent';

function makeEventPacket(eveType: ElementEventName, targetInfo: {
    target?: Element
    topTarget?: Element
}, event: ZRRawEvent): ElementEvent {
    return {
        type: eveType,
        event: event,
        // target can only be an element that is not silent.
        target: targetInfo.target,
        // topTarget can be a silent element.
        topTarget: targetInfo.topTarget,
        cancelBubble: false,
        offsetX: event.zrX,
        offsetY: event.zrY,
        gestureEvent: (event as ZRPinchEvent).gestureEvent,
        pinchX: (event as ZRPinchEvent).pinchX,
        pinchY: (event as ZRPinchEvent).pinchY,
        pinchScale: (event as ZRPinchEvent).pinchScale,
        wheelDelta: event.zrDelta,
        zrByTouch: event.zrByTouch,
        which: event.which,
        stop: stopEvent
    };
}

function stopEvent(this: ElementEvent) {
    eventTool.stop(this.event);
}

class EmptyProxy extends Eventful {
    handler: Handler = null
    dispose() {}
    setCursor() {}
}

class HoveredResult {
    x: number
    y: number
    target: Displayable
    topTarget: Displayable
    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }
}

const handlerNames = [
    'click', 'dblclick', 'mousewheel', 'mouseout',
    'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

type HandlerName = 'click' |'dblclick' |'mousewheel' |'mouseout' |
    'mouseup' |'mousedown' |'mousemove' |'contextmenu';


// TODO draggable
class Handler extends Eventful {

    storage: Storage
    painter: PainterBase
    painterRoot: HTMLElement

    proxy: HandlerProxyInterface

    private _hovered = new HoveredResult(0, 0)

    private _gestureMgr: GestureMgr

    // private _draggingMgr: Draggable

    _downEl: Element
    _upEl: Element
    _downPoint: [number, number]

    constructor(
        storage: Storage,
        painter: PainterBase,
        proxy: HandlerProxyInterface,
        painterRoot: HTMLElement
    ) {
        super();

        this.storage = storage;

        this.painter = painter;

        this.painterRoot = painterRoot;

        proxy = proxy || new EmptyProxy();

        /**
         * Proxy of event. can be Dom, WebGLSurface, etc.
         */
        this.proxy = null;

        this.setHandlerProxy(proxy);

        // this._draggingMgr = new Draggable(this);
    }

    setHandlerProxy(proxy: HandlerProxyInterface) {
        if (this.proxy) {
            this.proxy.dispose();
        }

        if (proxy) {
            util.each(handlerNames, function (name) {
                proxy.on && proxy.on(name, this[name as HandlerName], this);
            }, this);
            // Attach handler
            proxy.handler = this;
        }
        this.proxy = proxy;
    }

    mousemove(event: ZRRawEvent) {
        const x = event.zrX;
        const y = event.zrY;

        const isOutside = isOutsideBoundary(this, x, y);

        let lastHovered = this._hovered;
        let lastHoveredTarget = lastHovered.target;

        // If lastHoveredTarget is removed from zr (detected by '__zr') by some API call
        // (like 'setOption' or 'dispatchAction') in event handlers, we should find
        // lastHovered again here. Otherwise 'mouseout' can not be triggered normally.
        // See #6198.
        if (lastHoveredTarget && !lastHoveredTarget.__zr) {
            lastHovered = this.findHover(lastHovered.x, lastHovered.y);
            lastHoveredTarget = lastHovered.target;
        }

        const hovered = this._hovered = isOutside ? new HoveredResult(x, y) : this.findHover(x, y);
        const hoveredTarget = hovered.target;

        const proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : 'default');

        // Mouse out on previous hovered element
        if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(lastHovered, 'mouseout', event);
        }

        // Mouse moving on one element
        this.dispatchToElement(hovered, 'mousemove', event);

        // Mouse over on a new element
        if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
            this.dispatchToElement(hovered, 'mouseover', event);
        }
    }

    mouseout(event: ZRRawEvent) {
        const eventControl = event.zrEventControl;

        if (eventControl !== 'only_globalout') {
            this.dispatchToElement(this._hovered, 'mouseout', event);
        }

        if (eventControl !== 'no_globalout') {
            // FIXME: if the pointer moving from the extra doms to realy "outside",
            // the `globalout` should have been triggered. But currently not.
            this.trigger('globalout', {type: 'globalout', event: event});
        }
    }

    /**
     * Resize
     */
    resize() {
        this._hovered = new HoveredResult(0, 0);
    }

    /**
     * Dispatch event
     */
    dispatch(eventName: HandlerName, eventArgs?: any) {
        const handler = this[eventName];
        handler && handler.call(this, eventArgs);
    }

    /**
     * Dispose
     */
    dispose() {

        this.proxy.dispose();

        this.storage = null;
        this.proxy = null;
        this.painter = null;
    }

    /**
     * 设置默认的cursor style
     * @param cursorStyle 例如 crosshair，默认为 'default'
     */
    setCursorStyle(cursorStyle: string) {
        const proxy = this.proxy;
        proxy.setCursor && proxy.setCursor(cursorStyle);
    }

    /**
     * 事件分发代理
     *
     * @private
     * @param {Object} targetInfo {target, topTarget} 目标图形元素
     * @param {string} eventName 事件名称
     * @param {Object} event 事件对象
     */
    dispatchToElement(targetInfo: {
        target?: Element
        topTarget?: Element
    }, eventName: ElementEventName, event: ZRRawEvent) {

        targetInfo = targetInfo || {};

        let el = targetInfo.target as Element;
        if (el && el.silent) {
            return;
        }
        const eventKey = ('on' + eventName) as ElementEventNameWithOn;
        const eventPacket = makeEventPacket(eventName, targetInfo, event);

        while (el) {
            el[eventKey]
                && (eventPacket.cancelBubble = !!el[eventKey].call(el, eventPacket));

            el.trigger(eventName, eventPacket);

            // Bubble to the host if on the textContent.
            // PENDING
            el = el.__hostTarget ? el.__hostTarget : el.parent;

            if (eventPacket.cancelBubble) {
                break;
            }
        }

        if (!eventPacket.cancelBubble) {
            // 冒泡到顶级 zrender 对象
            this.trigger(eventName, eventPacket);
            // // 分发事件到用户自定义层
            // // 用户有可能在全局 click 事件中 dispose，所以需要判断下 painter 是否存在
            // if (this.painter && (this.painter as CanvasPainter).eachOtherLayer) {
            //     (this.painter as CanvasPainter).eachOtherLayer(function (layer) {
            //         if (typeof (layer[eventKey]) === 'function') {
            //             layer[eventKey].call(layer, eventPacket);
            //         }
            //         if (layer.trigger) {
            //             layer.trigger(eventName, eventPacket);
            //         }
            //     });
            // }
        }
    }

    findHover(x: number, y: number, exclude?: Displayable): HoveredResult {
        const list = this.storage.getDisplayList();
        const out = new HoveredResult(x, y);

        for (let i = list.length - 1; i >= 0; i--) {
            let hoverCheckResult;
            if (list[i] !== exclude
                // getDisplayList may include ignored item in VML mode
                && !list[i].ignore
                && (hoverCheckResult = isHover(list[i], x, y))
            ) {
                !out.topTarget && (out.topTarget = list[i]);
                if (hoverCheckResult !== SILENT) {
                    out.target = list[i];
                    break;
                }
            }
        }

        return out;
    }

    processGesture(event: ZRRawEvent, stage?: 'start' | 'end' | 'change') {
        if (!this._gestureMgr) {
            this._gestureMgr = new GestureMgr();
        }
        const gestureMgr = this._gestureMgr;

        stage === 'start' && gestureMgr.clear();

        const gestureInfo = gestureMgr.recognize(
            event as ZRRawTouchEvent,
            this.findHover(event.zrX, event.zrY, null).target,
            (this.proxy as HandlerDomProxy).dom
        );

        stage === 'end' && gestureMgr.clear();

        // Do not do any preventDefault here. Upper application do that if necessary.
        if (gestureInfo) {
            const type = gestureInfo.type;
            (event as ZRPinchEvent).gestureEvent = type;

            let res = new HoveredResult();
            res.target = gestureInfo.target;
            this.dispatchToElement(res, type as ElementEventName, gestureInfo.event as ZRRawEvent);
        }
    }

    click: (event: ZRRawEvent) => void
    mousedown: (event: ZRRawEvent) => void
    mouseup: (event: ZRRawEvent) => void
    mousewheel: (event: ZRRawEvent) => void
    dblclick: (event: ZRRawEvent) => void
    contextmenu: (event: ZRRawEvent) => void
}

// Common handlers
util.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name: HandlerName) {
    Handler.prototype[name] = function (event) {
        const x = event.zrX;
        const y = event.zrY;
        const isOutside = isOutsideBoundary(this, x, y);

        let hovered;
        let hoveredTarget;

        if (name !== 'mouseup' || !isOutside) {
            // Find hover again to avoid click event is dispatched manually. Or click is triggered without mouseover
            hovered = this.findHover(x, y);
            hoveredTarget = hovered.target;
        }

        if (name === 'mousedown') {
            this._downEl = hoveredTarget;
            this._downPoint = [event.zrX, event.zrY];
            // In case click triggered before mouseup
            this._upEl = hoveredTarget;
        }
        else if (name === 'mouseup') {
            this._upEl = hoveredTarget;
        }
        else if (name === 'click') {
            if (this._downEl !== this._upEl
                // Original click event is triggered on the whole canvas element,
                // including the case that `mousedown` - `mousemove` - `mouseup`,
                // which should be filtered, otherwise it will bring trouble to
                // pan and zoom.
                || !this._downPoint
                // Arbitrary value
                || vec2.dist(this._downPoint, [event.zrX, event.zrY]) > 4
            ) {
                return;
            }
            this._downPoint = null;
        }

        this.dispatchToElement(hovered, name, event);
    };
});

function isHover(displayable: Displayable, x: number, y: number) {
    if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
        let el: Element = displayable;
        let isSilent;
        let ignoreClip = false;
        while (el) {
            // Ignore clip on any ancestors.
            if (el.ignoreClip) {
                ignoreClip = true;
            }
            if (!ignoreClip) {
                let clipPath = el.getClipPath();
                // If clipped by ancestor.
                // FIXME: If clipPath has neither stroke nor fill,
                // el.clipPath.contain(x, y) will always return false.
                if (clipPath && !clipPath.contain(x, y)) {
                    return false;
                }
                if (el.silent) {
                    isSilent = true;
                }
            }
            // Consider when el is textContent, also need to be silent
            // if any of its host el and its ancestors is silent.
            const hostEl = el.__hostTarget;
            el = hostEl ? hostEl : el.parent;
        }
        return isSilent ? SILENT : true;
    }

    return false;
}

/**
 * See [DRAG_OUTSIDE].
 */
function isOutsideBoundary(handlerInstance: Handler, x: number, y: number) {
    const painter = handlerInstance.painter;
    return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
}

export default Handler;