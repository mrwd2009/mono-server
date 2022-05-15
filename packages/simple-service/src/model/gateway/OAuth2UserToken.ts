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
    OAuth2UserToken: typeof OAuth2UserToken;
  }
  type OAuth2UserTokenModel = OAuth2UserToken;
  type OAuth2UserTokenModelDef = typeof OAuth2UserToken;
}

class OAuth2UserToken extends Model<InferAttributes<OAuth2UserToken>, InferCreationAttributes<OAuth2UserToken>> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare parent_token_id: CreationOptional<number | null>;
  declare child_token_id: CreationOptional<number | null>;
  declare signature: string;
  declare token: string;
  declare status: 'enabled' | 'disabled';
  declare expired_at: CreationOptional<Date | string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  OAuth2UserToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_oauth2usertoken',
      },
      user_id: {
        type: DataTypes.INTEGER,
        field: '_fk_oauth2user',
      },
      parent_token_id: {
        type: DataTypes.INTEGER,
        field: '_fk_usertoken_parent',
      },
      child_token_id: {
        type: DataTypes.INTEGER,
        field: '_fk_usertoken_child',
      },
      signature: DataTypes.STRING,
      token: DataTypes.STRING,
      status: DataTypes.STRING,
      expired_at: DataTypes.DATE,
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
      tableName: 'oauth2usertoken',
      modelName: 'OAuth2UserToken',
      timestamps: false,
    },
  );

  return OAuth2UserToken;
};

export default OAuth2UserToken;
