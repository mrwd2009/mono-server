"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialize=exports.Service=void 0;const core_1=require("@sequelize/core");class Service extends core_1.Model{}exports.Service=Service;const initialize=e=>(Service.init({id:{type:core_1.DataTypes.INTEGER,primaryKey:!0,autoIncrement:!0},name:core_1.DataTypes.STRING,category:core_1.DataTypes.STRING,description:core_1.DataTypes.STRING,command:core_1.DataTypes.STRING,created_at:core_1.DataTypes.DATE,updated_at:core_1.DataTypes.DATE},{sequelize:e,tableName:"services",modelName:"Service",timestamps:!1}),Service);exports.initialize=initialize,exports.default=Service;