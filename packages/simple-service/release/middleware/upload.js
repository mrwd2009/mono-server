"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.smUpload=exports.mdUpload=exports.lgUpload=void 0;const multer_1=__importDefault(require("@koa/multer")),config_1=__importDefault(require("../config/config")),lgUpload=(0,multer_1.default)({dest:config_1.default.upload.path,limits:{fileSize:1024*1024*60,files:1}}).any();exports.lgUpload=lgUpload;const mdUpload=(0,multer_1.default)({dest:config_1.default.upload.path,limits:{fileSize:1024*1024*30,files:1}}).any();exports.mdUpload=mdUpload;const smUpload=(0,multer_1.default)({dest:config_1.default.upload.path,limits:{fileSize:1024*1024*5,files:1}}).any();exports.smUpload=smUpload;