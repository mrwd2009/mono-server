"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.registerSelf=exports.getAPIToken=exports.runService=exports.running=void 0;const lodash_1=__importDefault(require("lodash")),axios_1=__importDefault(require("axios")),dayjs_1=__importDefault(require("dayjs")),app_1=__importDefault(require("../../../config/model/app")),util_1=require("../../../lib/util"),error_1=require("../../../lib/error"),config_1=__importDefault(require("../../../config/config")),logger_1=__importDefault(require("../../../lib/logger")),{gateway:{models}}=app_1.default,DeploymentLog=models.DeploymentLog,Service=models.Service,Agent=models.Agent;let processing=!1;async function running(){if(processing)return;processing=!0;let e;try{const t=util_1.ip.getLocalIPs()[0],r=await DeploymentLog.findOne({where:{status:"ready"},order:["created_at","desc"],include:[{model:Agent,where:{ip:t},required:!0},{model:Service,required:!0}]});if(!r)return;await r.update({status:"in progress"});const n=JSON.parse(r.Service.command);e=new util_1.bashRunner.BashRunner;const{github:{username:l,password:u}}=config_1.default;let a="";for(let i=0;i<n.length;i++){const o=n[i];let c="";try{o.type==="git-pull"?c=await e.exec(o.value.replace("USERNAME",l).replace("PASSWORD",u)):o.type==="bash"&&(c=await e.exec(o.value)),a=`${a}${a?`
`:""}${o.value}
${c}`,i>=n.length-1?await r.update({output:a,percentage:100,status:"completed"}):await r.update({output:a,percentage:Math.floor((i+1)/n.length*100)})}catch(s){if(lodash_1.default.isString(s)){a=`${a}${a?`
`:""}${o.value}
${s}`,await r.update({output:a,percentage:Math.floor((i+1)/n.length*100),status:"failed"});break}await r.update({status:"failed",output:`${a}${a?`
`:""}${o.value}
${s.message}`}),logger_1.default.error(s.message,{response:s});break}}}catch(t){throw logger_1.default.error(t.message,{response:t}),t}finally{processing=!1,e?.close()}await running()}exports.running=running;async function runService(e){const{serviceId:t,email:r}=e,n=util_1.ip.getLocalIPs()[0],[l,u]=await Promise.all([Agent.findOne({where:{ip:n}}),Service.findOne({where:{id:t}})]);if(!l)throw new error_1.DataError(`Agent(${n}) is not found.`);if(!u)throw new error_1.DataError(`Service(${t}) is not found.`);await DeploymentLog.create({agent_id:l.id,service_id:u.id,email:r,status:"ready",percentage:0}),running()}exports.runService=runService;let apiToken;async function getAPIToken(){if(!apiToken||apiToken.expired<(0,dayjs_1.default)().unix()){const e="test",t=(0,dayjs_1.default)().unix()+config_1.default.jwt.expireHour*3600;return apiToken={token:e,expired:t},`${config_1.default.jwt.cookieKey}=${e}`}return`${config_1.default.jwt.cookieKey}=${apiToken.token}`}exports.getAPIToken=getAPIToken;async function registerSelf(){const e=util_1.ip.getLocalIPs()[0];if(!e)return;const t=util_1.ip.getLocalHostName(),r=await getAPIToken();await axios_1.default.post(`${config_1.default.deployment.adminHost}/api/deployment-server/agent`,{name:t,ip:e},{headers:{Cookie:r}})}exports.registerSelf=registerSelf;const intervalRegister=async()=>{try{await registerSelf()}catch(e){logger_1.default.error(e)}};if(config_1.default.deployment.isClient){const e=async()=>{await util_1.common.delay(config_1.default.deployment.updateInternal),await intervalRegister(),await e()};e()}