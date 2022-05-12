import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, UITaskModel } from '../types';

declare module '../types' {
  interface AppModels {
    UIFile: typeof UIFile;
  }
  type UIFileModel = UIFile;
  type UIFileModelDef = typeof UIFile;
}

export class UIFile extends Model<
  InferAttributes<UIFile>,
  InferCreationAttributes<UIFile>
> {
  static associate = (models: AppModels) => {
    UIFile.belongsTo(models.UITask, { foreignKey: '_fk_uifile', constraints: false });
  };
  declare __pk_uifile: CreationOptional<number>;
  declare node_env: CreationOptional<string>;
  declare app_env: CreationOptional<string>;
  declare user_type: CreationOptional<string>;
  declare user_id: CreationOptional<number>;
  declare user_email: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare size: CreationOptional<number>;
  declare description: CreationOptional<string>;
  declare url: CreationOptional<string>;
  declare extra_info: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare UITask?: NonAttribute<UITaskModel>;
}

export const initialize = (sequelize: Sequelize) => {
  UIFile.init(
    {
      __pk_uifile: {
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
      size: DataTypes.INTEGER,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      extra_info: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'uifile',
      modelName: 'UIFile',
      timestamps: false,
    },
  );

  return UIFile;
};

export default UIFile;
