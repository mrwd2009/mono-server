"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,i){i===void 0&&(i=r);var u=Object.getOwnPropertyDescriptor(t,r);(!u||("get"in u?!t.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,i,u)}:function(e,t,r,i){i===void 0&&(i=r),e[i]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialize=void 0;const api_1=require("@bull-board/api"),bullAdapter_1=require("@bull-board/api/bullAdapter"),koa_1=require("@bull-board/koa"),job=__importStar(require("./job")),config_1=__importDefault(require("../config/config")),getQueues=()=>[new bullAdapter_1.BullAdapter(job.job1),new bullAdapter_1.BullAdapter(job.job2)],initialize=async e=>{const t=new koa_1.KoaAdapter;return(0,api_1.createBullBoard)({queues:getQueues(),serverAdapter:t}),t.setBasePath(config_1.default.queue.dashboard.basePath),e.use(t.registerPlugin()),e};exports.initialize=initialize;