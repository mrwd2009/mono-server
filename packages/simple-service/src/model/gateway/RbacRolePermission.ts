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
        field: '__pk_rbacrolepermission',
      },
      role_id: {
        type: DataTypes.INTEGER,
        field: '_fk_rbacrole',
      },
      permission_id: {
        type: DataTypes.INTEGER,
        field: '_fk_rbacpermission',
      },
      created_at: {
        type: DataTypes.DATE,
        field: 'creation_date',
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'last_modified_date',
      },
    },
    {
      sequelize,
      tableName: 'rbacrolepermission',
      modelName: 'RbacRolePermission',
      timestamps: false,
    },
  );

  return RbacRolePermission;
};

export default RbacRolePermission;
