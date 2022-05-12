import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, UIFileModel } from '../types';

declare module '../types' {
  interface AppModels {
    UITask: typeof UITask;
  }
  type UITaskModel = UITask;
  type UITaskModelDef = typeof UITask;
}

export class UITask extends Model<
  InferAttributes<UITask>,
  InferCreationAttributes<UITask>
> {
  static associate = (models: AppModels) => {
    UITask.hasOne(models.UIFile, { foreignKey: '_fk_uifile', constraints: false });
  };
  declare __pk_uitask: CreationOptional<number>;
  declare node_env: CreationOptional<string>;
  declare app_env: CreationOptional<string>;
  declare user_type: CreationOptional<string>;
  declare user_id: CreationOptional<number>;
  declare user_email: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare type: CreationOptional<'Job' | 'File' | ''>;
  declare status: CreationOptional<'Ready' | 'In Progress' | 'Succeeded' | 'Failed' | ''>;
  declare percentage: CreationOptional<number>;
  declare current: CreationOptional<number>;
  declare total: CreationOptional<number>;
  declare _fk_uifile: CreationOptional<number>;
  declare error: CreationOptional<string>;
  declare parameter: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare UIFile?: NonAttribute<UIFileModel>;
}

export const initialize = (sequelize: Sequelize) => {
  UITask.init(
    {
      __pk_uitask: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      node_env: DataTypes.STRING,
      app_env: DataTypes.STRING,
      user_type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      user_email: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
      percentage: DataTypes.INTEGER,
      current: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      _fk_uifile: DataTypes.INTEGER,
      error: DataTypes.STRING,
      parameter: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'uitask',
      modelName: 'UITask',
      timestamps: false,
    },
  );

  return UITask;
};

export default UITask;
