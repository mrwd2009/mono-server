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
      },
      user_id: DataTypes.INTEGER,
      app: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'rbac_users_roles',
      modelName: 'RbacUserRole',
      timestamps: false,
    },
  );

  return RbacUserRole;
};

export default RbacUserRole;