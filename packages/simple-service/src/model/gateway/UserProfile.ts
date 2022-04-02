import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, UserModel } from '../types';

declare module '../types' {
  interface AppModels {
    UserProfile: typeof UserProfile;
  }
  type UserProfileModel = UserProfile;
  type UserProfileModelDef = typeof UserProfile;
}

export class UserProfile extends Model<InferAttributes<UserProfile>, InferCreationAttributes<UserProfile>> {
  static associate = (models: AppModels) => {
    UserProfile.belongsTo(models.User, { foreignKey: 'user_id', constraints: false });
  };
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare display_name: CreationOptional<string>;
  declare avatar: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare User?: NonAttribute<UserModel>;
}

export const initialize = (sequelize: Sequelize) => {
  UserProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      display_name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'user_profiles',
      modelName: 'UserProfile',
      timestamps: false,
    },
  );

  return UserProfile;
};

export default UserProfile;
