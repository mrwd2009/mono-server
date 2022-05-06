"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const router_1=__importDefault(require("@koa/router")),fs_1=__importDefault(require("fs")),lodash_1=__importDefault(require("lodash")),path_1=__importDefault(require("path")),middleware_1=require("./middleware"),router_2=require("./router"),loadModuleRouter=()=>{const e=path_1.default.join(__dirname,"..","api"),t=fs_1.default.readdirSync(e,{encoding:"utf-8",withFileTypes:!0});lodash_1.default.forEach(t,r=>{if(r.isDirectory()){const u=fs_1.default.readdirSync(path_1.default.join(e,r.name),{encoding:"utf-8"});lodash_1.default.some(u,o=>lodash_1.default.startsWith(o,"index."))&&require(path_1.default.join(e,r.name,"index"))}})};loadModuleRouter();const commonPrefix="/api",publicRouter=new router_1.default({prefix:commonPrefix}),authCheckingRouter=new router_1.default({prefix:commonPrefix}).use(middleware_1.passport.jwtAuth),dispatch=async e=>{lodash_1.default.forEach((0,router_2.getPublicRouters)(),t=>{publicRouter.use(t.routes())}),lodash_1.default.forEach((0,router_2.getRouters)(),t=>{authCheckingRouter.use(t.routes())}),e.use(publicRouter.routes()).use(authCheckingRouter.routes())};exports.default=dispatch;