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
    RbacOAuth2UserRole: typeof RbacOAuth2UserRole;
  }
  type RbacOAuth2UserRoleModel = RbacOAuth2UserRole;
  type RbacOAuth2UserRoleModelDef = typeof RbacOAuth2UserRole;
}

export class RbacOAuth2UserRole extends Model<
  InferAttributes<RbacOAuth2UserRole>,
  InferCreationAttributes<RbacOAuth2UserRole>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare app: string;
  declare role_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  RbacOAuth2UserRole.init(
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
      tableName: 'rbac_oauth2_users_roles',
      modelName: 'RbacOAuth2UserRole',
      timestamps: false,
    },
  );

  return RbacOAuth2UserRole;
};

export default RbacOAuth2UserRole;
