"use strict";var __importDefault=this&&this.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.RedisFactory=void 0;const ioredis_1=__importDefault(require("ioredis")),crypto_1=require("crypto"),config_1=__importDefault(require("../../config/config")),error_1=require("../error"),handler_1=require("../signal/handler");class RedisFactory{constructor(e,t,i){this.url=e,this.prefix=t,this.expired=i,this.cachedStore=new Map,this.handleSignalClose=async()=>{this.redisClient&&(await this.redisClient.quit(),this.redisClient=void 0)},(0,handler_1.registerCleanupHandler)(async()=>{await this.close()})}getClient(){return this.redisClient?this.redisClient:(this.redisClient=new ioredis_1.default(this.url,{keyPrefix:this.prefix}),this.redisClient)}async get(e){if(config_1.default.isDev)throw new error_1.DataError("Value is not found(development).");const i=await this.getClient().get(e);if(i===null)throw new error_1.DataError("Value is not found.");return i}async set(e,t,i=this.expired){if(config_1.default.isDev)return;await this.getClient().set(e,t,"EX",i)}async del(e){if(config_1.default.isDev)return;await this.getClient().del(e)}async getMemoizedData(e,t=this.expired){return config_1.default.isDev?{get:e.value}:{get:async()=>{const l=this.cachedStore.get(e.cachedKey);let a=l?.id;const n=this.getClient();if(a){const c=await n.hget(e.cachedKey,"id");if(a===c)return l?.value}else{const c=await n.hget(e.cachedKey,"id");if(c){const h=await n.hget(e.cachedKey,"value");if(h){const u=JSON.parse(h);return this.cachedStore.set(e.cachedKey,{id:c,value:u}),u}}}const r=await e.value(),o=e.id(r),d=(0,crypto_1.createHash)("sha256");return d.update(o),a=d.digest("hex"),this.cachedStore.set(e.cachedKey,{id:a,value:r}),await n.multi().hset(e.cachedKey,"id",a,"value",JSON.stringify(r)).expire(e.cachedKey,t).exec(),r}}}async close(){this.redisClient&&((0,handler_1.removeCleanupHandler)(this.handleSignalClose),await this.redisClient.quit(),this.redisClient=void 0)}}exports.RedisFactory=RedisFactory,exports.default=RedisFactory;