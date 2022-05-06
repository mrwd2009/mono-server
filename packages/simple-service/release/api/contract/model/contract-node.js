"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createContractNode=exports.deleteContractNode=exports.updateContractNode=exports.getContractNode=void 0;const lodash_1=__importDefault(require("lodash")),app_1=__importDefault(require("../../../config/model/app")),helper_1=require("../helper"),error_1=require("../../../lib/error"),{matrix:{models:{ContractBody,ContractRoot},sequelize},main:{models:{ChargeType}}}=app_1.default,getContractNode=async({node:e})=>{const t=await ContractBody.findOne({where:{__pk_contractbody:e}});if(!t)throw new error_1.DataError("Contract node is not found.");let o=[];t.Charge_Type&&(o=t.Charge_Type.split(","));const a=await helper_1.commonListHelper.getChargeTypeList({ChargeType});return{isRootNode:t.Sequence_ID==="1",name:t.Name,type:t.Type,hiddenFlag:t.Hidden_Flag,chargeType:o,chargeTypeList:a,condition:[{label:"true",value:"true"}]}};exports.getContractNode=getContractNode;const updateContractNode=async({node:e,field:t,value:o})=>{const a=await ContractBody.findOne({where:{__pk_contractbody:e}});if(!a)throw new error_1.DataError("Node is not found.");await sequelize.transaction(async c=>{a.Sequence_ID==="1"&&t==="Name"&&await ContractRoot.update({Name:o},{where:{__pk_contractroot:a._fk_contractroot},transaction:c});const[r]=await ContractBody.update({[t]:o},{where:{__pk_contractbody:e},transaction:c});return r})};exports.updateContractNode=updateContractNode;const deleteContractNode=async({node:e})=>await ContractBody.destroy({where:{__pk_contractbody:e}});exports.deleteContractNode=deleteContractNode;const createContractNode=async e=>{const{name:t,type:o,sourceType:a,parent:c}=e;return await sequelize.transaction(async r=>{let i;o==="contract"&&(i=(await ContractRoot.create({Name:t,Type:"instance",RootType:o,Status:"active",ActiveVersion:1},{transaction:r})).__pk_contractroot);let d=null,_=null;if(o==="contract")d=1,_="1";else{const n=await ContractBody.findOne({where:{__pk_contractbody:c},transaction:r});if(!n)throw new error_1.DataError("Node is not found.");if(n.Version_Type==="approved")throw new error_1.LogicError("Adding node on approved contract is not allowed.");d=n.Version,i=n._fk_contractroot;let s=n.Sequence_ID;s==="1"&&(s="");const p=await ContractBody.findOne({where:{_fk_parent_contractbody:null,Version:n.Version,_fk_contractroot:n._fk_contractroot},transaction:r});if(!p)throw new error_1.DataError("Root node is not found.");await ContractBody.findOne({where:{__pk_contractbody:p.__pk_contractbody},transaction:r,lock:r.LOCK.UPDATE});const u=await ContractBody.count({where:{_fk_parent_contractbody:c,_fk_contractroot:i,Version:d},transaction:r});if(u>=99)throw new error_1.LogicError("Maximum child node count is 99");_=s+lodash_1.default.padStart(`${u+1}`,2,"0")}return await ContractBody.create({Name:t,Version_Type:"interim",Hidden_Flag:!1,Source_Type:a,Version:d,Type:o,Charge_Type:o==="charge"||o==="contract"?"general":"",_fk_contractroot:i,_fk_parent_contractbody:c,Start_Date:new Date("2000-01-01 00:00:00"),End_Date:new Date("2099-12-31 23:59:59"),Time_Sequence_ID:1,Sequence_ID:_},{transaction:r}),{root:i,version:d}})};exports.createContractNode=createContractNode;