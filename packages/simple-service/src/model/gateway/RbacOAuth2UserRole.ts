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
        field: '__pk_rbacoauth2userrole',
      },
      user_id: {
        type: DataTypes.INTEGER,
        field: '_fk_oauth2user',
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
      tableName: 'rbacoauth2userrole',
      modelName: 'RbacOAuth2UserRole',
      timestamps: false,
    },
  );

  return RbacOAuth2UserRole;
};

export default RbacOAuth2UserRole;
