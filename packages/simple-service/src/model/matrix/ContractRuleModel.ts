import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, ContractBodyModel } from '../types';

declare module '../types' {
  interface AppModels {
    ContractRuleModel: typeof ContractRuleModel;
  }
  type ContractRuleModelModel = ContractRuleModel;
  type ContractRuleModelModelDef = typeof ContractRuleModel;
}

export class ContractRuleModel extends Model<
  InferAttributes<ContractRuleModel>,
  InferCreationAttributes<ContractRuleModel>
> {
  static associate = (models: AppModels) => {
    ContractRuleModel.belongsTo(models.ContractBody, { foreignKey: '_fk_contractbody', constraints: false });
  };
  declare __pk_rulemodel: number;
  declare _fk_contractbody: number;
  declare _fk_parent_rulemodel: number;
  declare Level: CreationOptional<string>;
  declare Rule_Model_Name: CreationOptional<string>;
  declare Rule_Model_Type: CreationOptional<string>;
  declare Rule_Model_Version: CreationOptional<string>;
  declare Conditional: CreationOptional<string>;
  declare Rule_Text: CreationOptional<string>;
  declare Reusable_Flag: CreationOptional<boolean>;
  declare Completion_Flag: CreationOptional<boolean>;
  declare Validation_Output: CreationOptional<string>;
  declare SID: CreationOptional<number>;
  declare UID: CreationOptional<string>;
  declare Last_Modified_Date: CreationOptional<Date>;
  declare ContractBody?: NonAttribute<ContractBodyModel>;
}

export const initialize = (sequelize: Sequelize) => {
  ContractRuleModel.init(
    {
      __pk_rulemodel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      _fk_contractbody: DataTypes.INTEGER,
      _fk_parent_rulemodel: DataTypes.INTEGER,
      Level: DataTypes.STRING,
      Rule_Model_Name: DataTypes.STRING,
      Rule_Model_Type: DataTypes.STRING,
      Rule_Model_Version: DataTypes.STRING,
      Conditional: DataTypes.STRING,
      Rule_Text: DataTypes.STRING,
      Reusable_Flag: DataTypes.BOOLEAN,
      Completion_Flag: DataTypes.BOOLEAN,
      Validation_Output: DataTypes.STRING,
      SID: DataTypes.INTEGER,
      UID: DataTypes.STRING,
      Last_Modified_Date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'rulemodel',
      modelName: 'ContractRuleModel',
      timestamps: false,
    },
  );

  return ContractRuleModel;
};
