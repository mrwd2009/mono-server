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
    UserLoginHistory: typeof UserLoginHistory;
  }
  type UserLoginHistoryModel = UserLoginHistory;
  type UserLoginHistoryModelDef = typeof UserLoginHistory;
}

export class UserLoginHistory extends Model<
  InferAttributes<UserLoginHistory>,
  InferCreationAttributes<UserLoginHistory>
> {
  declare id: CreationOptional<number>;
  declare node_env: CreationOptional<string>;
  declare app_env: CreationOptional<string>;
  declare sso_env: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare ip: CreationOptional<string>;
  declare user_agent: CreationOptional<string>;
  declare referer: CreationOptional<string>;
  declare device_type: CreationOptional<string>;
  declare os: CreationOptional<string>;
  declare browser: CreationOptional<string>;
  declare timezone: CreationOptional<string>;
  declare other: CreationOptional<string | null>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  UserLoginHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_userloginhistory',
      },
      node_env: DataTypes.STRING,
      app_env: DataTypes.STRING,
      sso_env: DataTypes.STRING,
      email: DataTypes.STRING,
      ip: DataTypes.STRING,
      user_agent: DataTypes.STRING,
      referer: DataTypes.STRING,
      device_type: DataTypes.STRING,
      os: DataTypes.STRING,
      browser: DataTypes.STRING,
      timezone: DataTypes.STRING,
      other: DataTypes.STRING,
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
      tableName: 'userloginhistory',
      modelName: 'UserLoginHistory',
      timestamps: false,
    },
  );

  return UserLoginHistory;
};

export default UserLoginHistory;
