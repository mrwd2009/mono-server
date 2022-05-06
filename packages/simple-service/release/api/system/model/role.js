"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.assignPermissions=exports.getAssignedPermissions=exports.deleteRole=exports.reparentRole=exports.updateRole=exports.createRole=exports.getAvailableRoles=exports.getRoles=void 0;const lodash_1=__importDefault(require("lodash")),core_1=require("@sequelize/core"),app_1=__importDefault(require("../../../config/model/app")),database_tree_data_1=require("../../../lib/util/database-tree-data"),{gateway:{models:{RbacRole,RbacPermission,RbacRolePermission},sequelize}}=app_1.default,getRoles=async()=>{const e=await RbacRole.findAll({attributes:["id","parent_id","name","sequence_id","description","enabled"]}),t=lodash_1.default.map(e,s=>({id:s.id,parent_id:s.parent_id,name:s.name,sequence_id:s.sequence_id,data:{description:s.description,enabled:s.enabled}}));return(0,database_tree_data_1.getTreeData)({items:t})};exports.getRoles=getRoles;const getAvailableRoles=async()=>{const e=await RbacRole.findAll({attributes:["id","name"],where:{enabled:!0}});return lodash_1.default.map(e,t=>({id:t.id,name:t.name}))};exports.getAvailableRoles=getAvailableRoles;const createRole=async e=>(await sequelize.transaction(async t=>{await(0,database_tree_data_1.createTreeItem)({values:{enabled:e.enabled,name:e.name,description:e.description},targetId:e.targetId,position:e.position,Model:RbacRole,transaction:t})}),!0);exports.createRole=createRole;const updateRole=async e=>{const t=lodash_1.default.pickBy({enabled:e.enabled,name:e.name,description:e.description},a=>a!==void 0),[s]=await RbacRole.update(t,{where:{id:e.id}});return s};exports.updateRole=updateRole;const reparentRole=async e=>(await sequelize.transaction(async t=>{await(0,database_tree_data_1.reparent)({targetId:e.targetId,sourceId:e.sourceId,position:e.position,Model:RbacRole,transaction:t})}),!0);exports.reparentRole=reparentRole;const deleteRole=async({id:e})=>(await sequelize.transaction(async t=>{await(0,database_tree_data_1.deleteTreeItem)({id:e,Model:RbacRole,transaction:t})}),!0);exports.deleteRole=deleteRole;const getAssignedPermissions=async({id:e})=>{const[t,s]=await Promise.all([RbacPermission.findAll({attributes:["id","parent_id","name","sequence_id","type"]}),RbacRolePermission.findAll({attributes:[[(0,core_1.fn)("distinct",(0,core_1.col)("permission_id")),"p_id"]],where:{role_id:e}})]),a=lodash_1.default.map(t,n=>({id:n.id,parent_id:n.parent_id,name:n.name,sequence_id:n.sequence_id,data:{type:n.type}})),{roots:i}=(0,database_tree_data_1.getTreeData)({items:a});return{checkedKeys:lodash_1.default.map(s,n=>n.get("p_id")),roots:i}};exports.getAssignedPermissions=getAssignedPermissions;const assignPermissions=async({id:e,permissionIds:t})=>(await sequelize.transaction(async s=>{const a=lodash_1.default.map(t,i=>({role_id:e,permission_id:i}));await RbacRolePermission.destroy({where:{role_id:e},transaction:s}),await RbacRolePermission.bulkCreate(a,{transaction:s})}),!0);exports.assignPermissions=assignPermissions;