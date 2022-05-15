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
    UserToken: typeof UserToken;
  }
  type UserTokenModel = UserToken;
  type UserTokenModelDef = typeof UserToken;
}

export class UserToken extends Model<InferAttributes<UserToken>, InferCreationAttributes<UserToken>> {
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
  UserToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_usertoken',
      },
      user_id: {
        type: DataTypes.INTEGER,
        field: '_fk_user',
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
      tableName: 'usertoken',
      modelName: 'UserToken',
      timestamps: false,
    },
  );

  return UserToken;
};

export default UserToken;
