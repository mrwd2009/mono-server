"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialize=exports.RbacUserRole=void 0;const core_1=require("@sequelize/core");class RbacUserRole extends core_1.Model{}exports.RbacUserRole=RbacUserRole;const initialize=e=>(RbacUserRole.init({id:{type:core_1.DataTypes.INTEGER,primaryKey:!0,autoIncrement:!0},user_id:core_1.DataTypes.INTEGER,app:core_1.DataTypes.STRING,role_id:core_1.DataTypes.INTEGER,created_at:core_1.DataTypes.DATE,updated_at:core_1.DataTypes.DATE},{sequelize:e,tableName:"rbac_users_roles",modelName:"RbacUserRole",timestamps:!1}),RbacUserRole);exports.initialize=initialize,exports.default=RbacUserRole;