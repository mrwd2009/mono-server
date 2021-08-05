/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, DataTypes, Model } from 'sequelize';
import { util } from '../../lib';

const hashPasword = async (user: any) => {
  if (user.isNewRecord || user.changed('Password')) {
    user.Password = await util.password.hashPassword(user.Password);
  }
}

export class User extends Model {
  // static associate = (models: { [name: string]: Model }) => {
  //   console.log(models);
  // }
  public Email!: string;
  public Password!: string;
  public Display_Name!: string;
  public Active!: boolean;
  public Failed_Attempts!: number;
  public Locked_At!: Date;
  public Pass_Last_Modified_Date!: Date;
}

export type UserDef = typeof User;

export default (sequelize: Sequelize, types: typeof DataTypes): typeof Model => {
  User.init({
    Email: {
      type: types.STRING,
      primaryKey: true
    },
    Password: types.STRING,
    Display_Name: types.STRING,
    Active: types.BOOLEAN,
    Failed_Attempts: types.INTEGER,
    Locked_At: types.DATE,
    Pass_Last_Modified_Date: types.DATE,
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps: false,
    hooks: {
      beforeCreate: hashPasword,
      beforeUpdate: hashPasword,
    },
  });

  return User;
}