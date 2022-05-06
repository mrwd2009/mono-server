"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getInfo=void 0;const lodash_1=__importDefault(require("lodash")),app_1=__importDefault(require("../../../config/model/app")),config_1=__importDefault(require("../../../config")),middleware_1=require("../../../config/middleware"),{gateway:{models:{UserProfile}}}=app_1.default,getInfo=async e=>{const r=await UserProfile.findOne({attributes:["display_name"],where:{user_id:e.user.id}}),s=[],i=await middleware_1.rbac.getUserPermissions(e.user.id);return lodash_1.default.forEach(middleware_1.rbac.permissions,(t,n)=>{lodash_1.default.includes(i,t)&&s.push(n)}),{appEnv:config_1.default.appEnv,user:e.user.email,username:r?.display_name,permissions:s}};exports.getInfo=getInfo;