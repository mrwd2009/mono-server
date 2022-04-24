import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';

declare module '../types' {
  interface AppModels {
    RbacRolePermission: typeof RbacRolePermission;
  }
  type RbacRolePermissionModel = RbacRolePermission;
  type RbacRolePermissionModelDef = typeof RbacRolePermission;
}

export class RbacRolePermission extends Model<
  InferAttributes<RbacRolePermission>,
  InferCreationAttributes<RbacRolePermission>
> {
  declare id: CreationOptional<number>;
  declare role_id: number;
  declare permission_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  RbacRolePermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: DataTypes.INTEGER,
      permission_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'rbac_roles_permissions',
      modelName: 'RbacRolePermission',
      timestamps: false,
    },
  );

  return RbacRolePermission;
};

export default RbacRolePermission;
