"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getI18n=exports.supportedLangs=void 0;const i18next_1=__importDefault(require("i18next")),locale_1=__importDefault(require("../../config/locale"));exports.supportedLangs=["en-US"];const cachedI18n={},getI18n=async e=>{e=e||"en-US",locale_1.default[e]||(e="en-US");let t=cachedI18n[e];return t||(t=i18next_1.default.createInstance(),cachedI18n[e]=t,await t.init({lng:e,resources:{[e]:locale_1.default[e]}}),t)};exports.getI18n=getI18n,exports.default=exports.getI18n;