import { _ as __rest } from './tslib.es6-e6488692.js';
import { r as react } from './index-7cda8b13.js';

var IconSize;
(function (IconSize) {
    IconSize["sm"] = "sm";
    IconSize["md"] = "md";
    IconSize["lg"] = "lg";
    IconSize["xl"] = "xl";
})(IconSize || (IconSize = {}));
const getSize = (size) => {
    switch (size) {
        case IconSize.sm:
            return '1em';
        case IconSize.md:
            return '1.5em';
        case IconSize.lg:
            return '2em';
        case IconSize.xl:
            return '3em';
        default:
            return '1em';
    }
};
let currentId = 0;
/**
 * Factory to create Icon class components for consumers
 */
function createIcon({ name, xOffset = 0, yOffset = 0, width, height, svgPath }) {
    var _a;
    return _a = class SVGIcon extends react.Component {
            constructor() {
                super(...arguments);
                this.id = `icon-title-${currentId++}`;
            }
            render() {
                const _a = this.props, { size, color, title, noVerticalAlign } = _a, props = __rest(_a, ["size", "color", "title", "noVerticalAlign"]);
                const hasTitle = Boolean(title);
                const heightWidth = getSize(size);
                const baseAlign = -0.125 * Number.parseFloat(heightWidth);
                const style = noVerticalAlign ? null : { verticalAlign: `${baseAlign}em` };
                const viewBox = [xOffset, yOffset, width, height].join(' ');
                return (react.createElement("svg", Object.assign({ style: style, fill: color, height: heightWidth, width: heightWidth, viewBox: viewBox, "aria-labelledby": hasTitle ? this.id : null, "aria-hidden": hasTitle ? null : true, role: "img" }, props),
                    hasTitle && react.createElement("title", { id: this.id }, title),
                    react.createElement("path", { d: svgPath })));
            }
        },
        _a.displayName = name,
        _a.defaultProps = {
            color: 'currentColor',
            size: IconSize.sm,
            noVerticalAlign: false
        },
        _a;
}

const TimesIconConfig = {
  name: 'TimesIcon',
  height: 512,
  width: 352,
  svgPath: 'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z',
  yOffset: 0,
  xOffset: 0,
};

const TimesIcon = createIcon(TimesIconConfig);

export { TimesIcon as T, createIcon as c };
