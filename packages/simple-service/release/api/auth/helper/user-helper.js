"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkLockStatus=exports.verfyJwtToken=exports.createJwtToken=void 0;const dayjs_1=__importDefault(require("dayjs")),config_1=__importDefault(require("../../../config/config")),error_1=require("../../../lib/error"),util_1=require("../../../lib/util"),createJwtToken=async e=>await(await util_1.gatewayJwt.createToken(e)).token;exports.createJwtToken=createJwtToken;const verfyJwtToken=async e=>await util_1.gatewayJwt.verfyToken(e);exports.verfyJwtToken=verfyJwtToken;const checkLockStatus=async({user:e,transaction:o,i18n:u,User:a})=>{const{auth:{autoUnlockTime:i}}=config_1.default,t=await a.findOne({where:{id:e.id},transaction:o,lock:o.LOCK.UPDATE});if(!t)return null;if(t.locked_at){const r=dayjs_1.default.utc(t.locked_at).add(i,"minute"),n=dayjs_1.default.utc();if(r.isAfter(n)){const s=Math.ceil((r.unix()-n.unix())/60),c=new error_1.AuthError(u.t("auth.lockedMessage",{count:s}));throw c.public=!0,c}await t.update({failed_attempts:0,locked_at:null,unlock_token:null},{transaction:o})}return t};exports.checkLockStatus=checkLockStatus;