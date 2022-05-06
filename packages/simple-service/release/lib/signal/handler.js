"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.triggerInit=exports.removeInitPromise=exports.registerInitPromise=exports.removeCleanupHandler=exports.registerCleanupHandler=void 0;const lodash_1=__importDefault(require("lodash")),signalHandlersMap={cleanup:[],init:[]},registerCleanupHandler=e=>{signalHandlersMap.cleanup.push(e)};exports.registerCleanupHandler=registerCleanupHandler;const removeCleanupHandler=e=>{signalHandlersMap.cleanup=lodash_1.default.filter(signalHandlersMap.cleanup,r=>r!==e)};exports.removeCleanupHandler=removeCleanupHandler;const triggerCleanup=()=>{signalHandlersMap.cleanup.length||process.exit();const e=signalHandlersMap.cleanup;return signalHandlersMap.cleanup=[],Promise.all(lodash_1.default.map(e,r=>r())).then(()=>{process.exit()}).catch(()=>{process.exit(1)})};process.on("SIGINT",triggerCleanup),process.on("SIGTERM",triggerCleanup);const registerInitPromise=e=>{signalHandlersMap.init.push(e)};exports.registerInitPromise=registerInitPromise;const removeInitPromise=e=>{signalHandlersMap.init=lodash_1.default.filter(signalHandlersMap.init,r=>r!==e)};exports.removeInitPromise=removeInitPromise;const triggerInit=()=>{if(!signalHandlersMap.init.length)return;const e=signalHandlersMap.init;return signalHandlersMap.init=[],Promise.all(e).then(()=>{console.log("API Gateway is initialized successfully.")}).catch(()=>{console.error("API Gateway is initialized failed.")})};exports.triggerInit=triggerInit,setTimeout(exports.triggerInit,0);