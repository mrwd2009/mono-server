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
    RbacUserRole: typeof RbacUserRole;
  }
  type RbacUserRoleModel = RbacUserRole;
  type RbacUserRoleModelDef = typeof RbacUserRole;
}

export class RbacUserRole extends Model<InferAttributes<RbacUserRole>, InferCreationAttributes<RbacUserRole>> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare app: string;
  declare role_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  RbacUserRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_rbacuserrole',
      },
      user_id: {
        type: DataTypes.INTEGER,
        field: '_fk_user',
      },
      app: DataTypes.STRING,
      role_id: {
        type: DataTypes.INTEGER,
        field: '_fk_rbacrole',
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
      tableName: 'rbacuserrole',
      modelName: 'RbacUserRole',
      timestamps: false,
    },
  );

  return RbacUserRole;
};

export default RbacUserRole;
