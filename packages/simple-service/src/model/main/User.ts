/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import { util } from '../../lib';

declare module '../types' {
  interface AppModels {
    User: typeof User;
  }
  type UserModel = User;
  type UserModelDef = typeof User;
}

const hashPasword = async (user: any) => {
  if (user.isNewRecord || user.changed('Password')) {
    user.Password = await util.password.hashPassword(user.Password);
  }
};

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare Email: string;
  declare Password: string;
  declare Display_Name: string;
  declare Active: CreationOptional<boolean>;
  declare Failed_Attempts: CreationOptional<number>;
  declare Locked_At: CreationOptional<Date>;
  declare Pass_Last_Modified_Date: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  User.init(
    {
      Email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Password: DataTypes.STRING,
      Display_Name: DataTypes.STRING,
      Active: DataTypes.BOOLEAN,
      Failed_Attempts: DataTypes.INTEGER,
      Locked_At: DataTypes.DATE,
      Pass_Last_Modified_Date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'user',
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: hashPasword,
        beforeUpdate: hashPasword,
      },
    },
  );

  return User;
};

export default User;
