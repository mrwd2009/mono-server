"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.deletePermission=exports.reparentPermission=exports.updatePermission=exports.createPermission=exports.getPermissions=void 0;const lodash_1=__importDefault(require("lodash")),app_1=__importDefault(require("../../../config/model/app")),database_tree_data_1=require("../../../lib/util/database-tree-data"),{gateway:{models:{RbacPermission},sequelize}}=app_1.default,getPermissions=async()=>{const e=await RbacPermission.findAll({attributes:["id","parent_id","name","sequence_id","type","description"]}),t=lodash_1.default.map(e,i=>({id:i.id,parent_id:i.parent_id,name:i.name,sequence_id:i.sequence_id,data:{type:i.type,description:i.description}}));return(0,database_tree_data_1.getTreeData)({items:t})};exports.getPermissions=getPermissions;const createPermission=async e=>(await sequelize.transaction(async t=>{await(0,database_tree_data_1.createTreeItem)({values:{type:e.type,name:e.name,description:e.description},targetId:e.targetId,position:e.position,Model:RbacPermission,transaction:t})}),!0);exports.createPermission=createPermission;const updatePermission=async e=>{const t=lodash_1.default.pickBy({type:e.type,name:e.name,description:e.description}),[i]=await RbacPermission.update(t,{where:{id:e.id}});return i};exports.updatePermission=updatePermission;const reparentPermission=async e=>(await sequelize.transaction(async t=>{await(0,database_tree_data_1.reparent)({targetId:e.targetId,sourceId:e.sourceId,position:e.position,Model:RbacPermission,transaction:t})}),!0);exports.reparentPermission=reparentPermission;const deletePermission=async({id:e})=>(await sequelize.transaction(async t=>{await(0,database_tree_data_1.deleteTreeItem)({id:e,Model:RbacPermission,transaction:t})}),!0);exports.deletePermission=deletePermission;