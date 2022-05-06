"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.validateEmailDomains=void 0;const lodash_1=__importDefault(require("lodash")),error_1=require("../../lib/error"),config_1=__importDefault(require("../../config/config")),validateEmailDomains=e=>{const a=e?.error,s=e?.field||"email";return async(i,t)=>{const o=i.mergedParams[s];if(!o)return await t();if(lodash_1.default.some(config_1.default.auth.validEmailDomains,r=>lodash_1.default.endsWith(o,r)))await t();else{const r=i.i18n;throw a&&r.exists(a)?new error_1.ParamError(r.t(a)):new error_1.ParamError(r.t("common.invalidEmail"))}}};exports.validateEmailDomains=validateEmailDomains,exports.default=exports.validateEmailDomains;