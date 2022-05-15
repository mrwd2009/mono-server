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
    RbacPermission: typeof RbacPermission;
  }
  type RbacPermissionModel = RbacPermission;
  type RbacPermissionModelDef = typeof RbacPermission;
}

export class RbacPermission extends Model<InferAttributes<RbacPermission>, InferCreationAttributes<RbacPermission>> {
  declare id: CreationOptional<number>;
  declare parent_id: number | null;
  declare type: string;
  declare name: string;
  declare sequence_id: string;
  declare description: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  RbacPermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_rbacpermission',
      },
      parent_id: {
        type: DataTypes.INTEGER,
        field: '_fk_rbacpermission_parent',
      },
      type: DataTypes.STRING, // 'category', 'permission'
      name: DataTypes.STRING,
      sequence_id: DataTypes.STRING,
      description: DataTypes.STRING,
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
      tableName: 'rbacpermission',
      modelName: 'RbacPermission',
      timestamps: false,
    },
  );

  return RbacPermission;
};

export default RbacPermission;
