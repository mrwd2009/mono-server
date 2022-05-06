"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getSavedNodeList=exports.getContractList=void 0;const lodash_1=__importDefault(require("lodash")),core_1=require("@sequelize/core"),app_1=__importDefault(require("../../../config/model/app")),{matrix:{sequelize,models:{ContractBody}}}=app_1.default,getContractList=async()=>{const t=`
  select __pk_contractbody, contractbody.Name, contractbody._fk_contractroot, SubMarketplace, contractbody.Time_Sequence_ID, contractbody.Version, contractbody.Last_Modified_Date
  from (
    select _fk_contractroot, max(version) as version from contractbody
    where _fk_parent_contractbody is null and source_type = 'instance' group by _fk_contractroot
  ) contract_list 
    inner join contractbody on contract_list._fk_contractroot = contractbody._fk_contractroot and contract_list.version = contractbody.version and _fk_parent_contractbody is null
    inner join contractroot on contractroot.__pk_contractroot = contractbody._fk_contractroot
    order by contractbody.Creation_Date desc
  `,o=await sequelize.query(t,{type:core_1.QueryTypes.SELECT});return lodash_1.default.map(o,r=>({id:r.__pk_contractbody,name:r.Name,type:"contract",root:r._fk_contractroot,version:r.Version}))};exports.getContractList=getContractList;const getSavedNodeList=async()=>{const t=await ContractBody.findAll({attributes:["__pk_contractbody","Name","_fk_contractroot","Version","Type"],where:{_fk_parent_contractbody:null,Source_Type:"umc",Version_Type:"interim"},order:[["Creation_Date","DESC"]]});return lodash_1.default.map(t,o=>({id:o.__pk_contractbody,name:o.Name,type:o.Type,root:o._fk_contractroot,version:o.Version}))};exports.getSavedNodeList=getSavedNodeList;