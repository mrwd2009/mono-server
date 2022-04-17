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
      },
      user_id: DataTypes.INTEGER,
      parent_token_id: DataTypes.INTEGER,
      child_token_id: DataTypes.INTEGER,
      signature: DataTypes.STRING,
      token: DataTypes.STRING,
      status: DataTypes.STRING,
      expired_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'user_tokens',
      modelName: 'UserToken',
      timestamps: false,
    },
  );

  return UserToken;
};

export default UserToken;
