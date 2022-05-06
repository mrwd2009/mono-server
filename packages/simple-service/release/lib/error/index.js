"use strict";var __importDefault=this&&this.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ForbiddenError=exports.ParamError=exports.LogicError=exports.DataError=exports.GatewayError=exports.BackendError=exports.AuthError=void 0;const auth_error_1=__importDefault(require("./auth-error"));exports.AuthError=auth_error_1.default;const backend_error_1=__importDefault(require("./backend-error"));exports.BackendError=backend_error_1.default;const gateway_error_1=__importDefault(require("./gateway-error"));exports.GatewayError=gateway_error_1.default;const data_error_1=__importDefault(require("./data-error"));exports.DataError=data_error_1.default;const logic_error_1=__importDefault(require("./logic-error"));exports.LogicError=logic_error_1.default;const param_error_1=__importDefault(require("./param-error"));exports.ParamError=param_error_1.default;const forbidden_error_1=__importDefault(require("./forbidden-error"));exports.ForbiddenError=forbidden_error_1.default,exports.default=gateway_error_1.default;