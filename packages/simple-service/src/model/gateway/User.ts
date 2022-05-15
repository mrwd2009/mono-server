import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import lib from '../../lib';
import { AppModels, UserProfileModel, UserTokenModel, RbacUserRoleModel } from '../types';

declare module '../types' {
  interface AppModels {
    User: typeof User;
  }
  type UserModel = User;
  type UserModelDef = typeof User;
}

const hashPassword = async (user: User) => {
  if (user.isNewRecord || user.changed('password')) {
    user.password = await lib.password.hashPassword(user.password);
  }
};

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  static associate = (models: AppModels) => {
    User.hasOne(models.UserProfile, { foreignKey: 'user_id', constraints: false });
    User.hasMany(models.UserToken, { foreignKey: 'user_id', constraints: false });
    User.hasMany(models.RbacUserRole, { foreignKey: 'user_id', constraints: false });
  };
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: CreationOptional<string>;
  declare reset_password_token: CreationOptional<string | null>;
  declare reset_password_sent_at: CreationOptional<Date | string | null>;
  declare confirmation_token: CreationOptional<string | null>;
  declare confirmed_at: CreationOptional<Date | string>;
  declare confirmation_sent_at: CreationOptional<Date | string>;
  declare unconfirmed_email: CreationOptional<string | null>;
  declare latest_sign_in_token: CreationOptional<string | null>;
  declare sign_in_count: CreationOptional<number>;
  declare current_sign_in_at: CreationOptional<Date | string>;
  declare last_sign_in_at: CreationOptional<Date | string>;
  declare current_sign_in_ip: CreationOptional<string>;
  declare last_sign_in_ip: CreationOptional<string>;
  declare failed_attempts: CreationOptional<number>;
  declare locked_at: CreationOptional<Date | string | null>;
  declare unlock_token: CreationOptional<string | null>;
  declare last_change_pass_at: CreationOptional<Date | string | null>;
  declare enabled: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date | string>;
  declare updated_at: CreationOptional<Date | string>;
  declare UserProfile?: NonAttribute<UserProfileModel>;
  declare UserTokens?: NonAttribute<UserTokenModel[]>;
  declare RbacUserRoles?: NonAttribute<RbacUserRoleModel[]>;
}

export const initialize = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_user',
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      reset_password_token: DataTypes.STRING,
      reset_password_sent_at: DataTypes.DATE,
      confirmation_token: DataTypes.STRING,
      confirmed_at: DataTypes.DATE,
      confirmation_sent_at: DataTypes.DATE,
      unconfirmed_email: DataTypes.STRING,
      latest_sign_in_token: DataTypes.STRING,
      sign_in_count: DataTypes.INTEGER,
      current_sign_in_at: DataTypes.DATE,
      last_sign_in_at: DataTypes.DATE,
      current_sign_in_ip: DataTypes.STRING,
      last_sign_in_ip: DataTypes.STRING,
      failed_attempts: DataTypes.INTEGER,
      locked_at: DataTypes.DATE,
      unlock_token: DataTypes.STRING,
      last_change_pass_at: DataTypes.DATE,
      enabled: DataTypes.BOOLEAN,
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
      tableName: 'user',
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    },
  );

  return User;
};

export default User;
