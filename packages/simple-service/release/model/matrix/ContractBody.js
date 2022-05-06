"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialize=exports.ContractBody=void 0;const core_1=require("@sequelize/core");class ContractBody extends core_1.Model{}exports.ContractBody=ContractBody,ContractBody.associate=a=>{ContractBody.belongsTo(a.ContractRoot,{foreignKey:"_fk_contractroot",constraints:!1}),ContractBody.hasMany(a.ContractParameter,{foreignKey:"_fk_contractbody",constraints:!1}),ContractBody.hasMany(a.ContractRuleModel,{foreignKey:"_fk_contractbody",constraints:!1})};const initialize=a=>(ContractBody.init({__pk_contractbody:{type:core_1.DataTypes.INTEGER,primaryKey:!0,autoIncrement:!0},_fk_contractroot:core_1.DataTypes.INTEGER,_fk_parent_contractbody:core_1.DataTypes.INTEGER,Name:core_1.DataTypes.STRING,Type:core_1.DataTypes.STRING,Branch_Type:core_1.DataTypes.STRING,Conditional:core_1.DataTypes.STRING,Charge_Type:core_1.DataTypes.STRING,Source_Contract_Root:core_1.DataTypes.INTEGER,Source_Contract_Version:core_1.DataTypes.INTEGER,Source_Reusable_Type:core_1.DataTypes.STRING,Source_Type:core_1.DataTypes.STRING,Source_Reference:core_1.DataTypes.INTEGER,IsReusableRoot:core_1.DataTypes.BOOLEAN,HasRateModel:core_1.DataTypes.BOOLEAN,HasAggregationModel:core_1.DataTypes.BOOLEAN,HasUsageModel:core_1.DataTypes.BOOLEAN,HasGrouping:core_1.DataTypes.BOOLEAN,HasCategorization:core_1.DataTypes.BOOLEAN,Sequence_ID:core_1.DataTypes.STRING,Start_Date:core_1.DataTypes.DATE,End_Date:core_1.DataTypes.DATE,Time_Sequence_ID:core_1.DataTypes.INTEGER,Version:core_1.DataTypes.INTEGER,Version_Type:core_1.DataTypes.STRING,Hidden_Flag:core_1.DataTypes.BOOLEAN,Completion_Flag:core_1.DataTypes.BOOLEAN,Validation_Output:core_1.DataTypes.STRING,Unbundled_Flag:core_1.DataTypes.BOOLEAN,SID:core_1.DataTypes.INTEGER,UID:core_1.DataTypes.STRING,Last_Modified_Date:core_1.DataTypes.DATE},{sequelize:a,tableName:"contractbody",modelName:"ContractBody",timestamps:!1}),ContractBody);exports.initialize=initialize,exports.default=ContractBody;