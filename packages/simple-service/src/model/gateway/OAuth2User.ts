import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, OAuth2UserTokenModel, RbacOAuth2UserRoleModel } from '../types';

declare module '../types' {
  interface AppModels {
    OAuth2User: typeof OAuth2User;
  }
  type OAuth2UserModel = OAuth2User;
  type OAuth2UserModelDef = typeof OAuth2User;
}

class OAuth2User extends Model<InferAttributes<OAuth2User>, InferCreationAttributes<OAuth2User>> {
  static associate = (models: AppModels) => {
    OAuth2User.hasMany(models.OAuth2UserToken, { foreignKey: 'user_id', constraints: false });
    OAuth2User.hasMany(models.RbacOAuth2UserRole, { foreignKey: 'user_id', constraints: false });
  };
  declare id: CreationOptional<number>;
  declare email: CreationOptional<string | null>;
  declare name: CreationOptional<string | null>;
  declare sub: CreationOptional<string | null>;
  declare picture: CreationOptional<string | null>;
  declare access_token: CreationOptional<string | null>;
  declare token_type: CreationOptional<string | null>;
  declare refresh_token: CreationOptional<string | null>;
  declare token_info: CreationOptional<string | null>;
  declare user_info: CreationOptional<string | null>;
  declare enabled: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date | string>;
  declare updated_at: CreationOptional<Date | string>;
  declare OAuth2UserTokens?: NonAttribute<OAuth2UserTokenModel[]>;
  declare RbacOAuth2UserRoles?: NonAttribute<RbacOAuth2UserRoleModel[]>;
}

export const initialize = (sequelize: Sequelize) => {
  OAuth2User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      sub: DataTypes.STRING,
      picture: DataTypes.STRING,
      access_token: DataTypes.STRING,
      token_type: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      token_info: DataTypes.STRING,
      user_info: DataTypes.STRING,
      enabled: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'oauth2_users',
      modelName: 'OAuth2User',
      timestamps: false,
    },
  );

  return OAuth2User;
};

export default OAuth2User;
