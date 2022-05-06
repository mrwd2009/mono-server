"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialize=void 0;const cors_1=__importDefault(require("@koa/cors")),endsWith_1=__importDefault(require("lodash/endsWith")),some_1=__importDefault(require("lodash/some")),url_1=require("url"),config_1=__importDefault(require("../config")),initialize=async e=>{await e.use((0,cors_1.default)({origin:i=>{const t=i.get("Origin");if(config_1.default.isDev)return t;const o=new url_1.URL(t);if((0,some_1.default)(config_1.default.cors.allowedDomain,s=>(0,endsWith_1.default)(o.hostname,s)))return t;const r=new Error(`Origin(${t}) is not allowed to access current service.`);throw r.status=403,r.expose=!0,r},allowHeaders:["Content-Type","App-Locale","CSRF-Token"],credentials:!0}))};exports.initialize=initialize,exports.default=exports.initialize;