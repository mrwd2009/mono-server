"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialize=exports.i18n=void 0;const util_1=require("../../lib/util"),accept_lang_parser_1=require("../../lib/util/accept-lang-parser"),i18n=async(e,i)=>{const t=e.headers["accept-language"],a=(0,accept_lang_parser_1.pick)(util_1.locale.supportedLangs,t),n=await util_1.locale.getI18n(a);e.i18n=n,await i()};exports.i18n=i18n;const initialize=async e=>{await e.use(exports.i18n)};exports.initialize=initialize,exports.default=exports.initialize;