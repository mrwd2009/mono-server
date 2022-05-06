"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.validator=void 0;const joi_1=__importDefault(require("joi")),keys_1=__importDefault(require("lodash/keys")),get_1=__importDefault(require("lodash/get")),error_1=require("../../lib/error"),validator=(e,i={})=>{const t=e(joi_1.default),a={allowUnknown:!0,presence:"required",...i},s=joi_1.default.isSchema(t),l=s?["mergedParams"]:(0,keys_1.default)(t),u=s?{mergedParams:t}:t;return async(o,c)=>{try{for(const r of l)await(0,get_1.default)(u,r).validateAsync((0,get_1.default)(o,r),a);a.formatData&&(o.validatorFormattedData=a.formatData(o)),await c()}catch(r){throw joi_1.default.isError(r)?new error_1.ParamError(r.message):r}}};exports.validator=validator,exports.default=exports.validator;