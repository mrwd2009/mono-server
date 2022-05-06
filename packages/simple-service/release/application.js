"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),require("dotenv/config");const koa_1=__importDefault(require("koa")),boot_1=__importDefault(require("./config/boot")),prometheus_1=require("./lib/monitor/prometheus"),defaultPort=process.env.PORT?parseInt(process.env.PORT):4100;class Application{constructor(e){this.port=e?.port||defaultPort,this.app=new koa_1.default}async initialize(e=!1){await Promise.all([(0,boot_1.default)(this.app,this.port),!e&&(0,prometheus_1.initialize)("app")])}}exports.default=Application;