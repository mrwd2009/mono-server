import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, ContractParameterModel, ContractRuleModelModel, ContractRootModel } from '../types';

declare module '../types' {
  interface AppModels {
    ContractBody: typeof ContractBody;
  }
  type ContractBodyModel = ContractBody;
  type ContractBodyModelDef = typeof ContractBody;
}

export class ContractBody extends Model<InferAttributes<ContractBody>, InferCreationAttributes<ContractBody>> {
  static associate = (models: AppModels) => {
    ContractBody.belongsTo(models.ContractRoot, { foreignKey: '_fk_contractroot', constraints: false });
    ContractBody.hasMany(models.ContractParameter, { foreignKey: '_fk_contractbody', constraints: false });
    ContractBody.hasMany(models.ContractRuleModel, { foreignKey: '_fk_contractbody', constraints: false });
  };
  declare __pk_contractbody: CreationOptional<number>;
  declare _fk_contractroot: number;
  declare _fk_parent_contractbody: CreationOptional<number>;
  declare Name: string;
  declare Type: string;
  declare Branch_Type: CreationOptional<string>;
  declare Conditional: CreationOptional<string>;
  declare Charge_Type: string;
  declare Source_Contract_Root: CreationOptional<number>;
  declare Source_Contract_Version: CreationOptional<number>;
  declare Source_Reusable_Type: CreationOptional<string>;
  declare Source_Type: CreationOptional<string>;
  declare Source_Reference: CreationOptional<number>;
  declare IsReusableRoot: CreationOptional<boolean>;
  declare HasRateModel: CreationOptional<boolean>;
  declare HasAggregationModel: CreationOptional<boolean>;
  declare HasUsageModel: CreationOptional<boolean>;
  declare HasGrouping: CreationOptional<boolean>;
  declare HasCategorization: CreationOptional<boolean>;
  declare Sequence_ID: CreationOptional<string>;
  declare Start_Date: CreationOptional<Date>;
  declare End_Date: CreationOptional<Date>;
  declare Time_Sequence_ID: CreationOptional<number>;
  declare Version: CreationOptional<number>;
  declare Version_Type: CreationOptional<string>;
  declare Hidden_Flag: CreationOptional<boolean>;
  declare Completion_Flag: CreationOptional<boolean>;
  declare Validation_Output: CreationOptional<string>;
  declare Unbundled_Flag: CreationOptional<boolean>;
  declare SID: CreationOptional<number>;
  declare UID: CreationOptional<string>;
  declare Last_Modified_Date: CreationOptional<Date>;
  declare ContractRoot?: NonAttribute<ContractRootModel>;
  declare ContractParameters?: NonAttribute<ContractParameterModel>;
  declare ContractRuleModels?: NonAttribute<ContractRuleModelModel>;
}

export const initialize = (sequelize: Sequelize) => {
  ContractBody.init(
    {
      __pk_contractbody: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      _fk_contractroot: DataTypes.INTEGER,
      _fk_parent_contractbody: DataTypes.INTEGER,
      Name: DataTypes.STRING,
      Type: DataTypes.STRING,
      Branch_Type: DataTypes.STRING,
      Conditional: DataTypes.STRING,
      Charge_Type: DataTypes.STRING,
      Source_Contract_Root: DataTypes.INTEGER,
      Source_Contract_Version: DataTypes.INTEGER,
      Source_Reusable_Type: DataTypes.STRING,
      Source_Type: DataTypes.STRING,
      Source_Reference: DataTypes.INTEGER,
      IsReusableRoot: DataTypes.BOOLEAN,
      HasRateModel: DataTypes.BOOLEAN,
      HasAggregationModel: DataTypes.BOOLEAN,
      HasUsageModel: DataTypes.BOOLEAN,
      HasGrouping: DataTypes.BOOLEAN,
      HasCategorization: DataTypes.BOOLEAN,
      Sequence_ID: DataTypes.STRING,
      Start_Date: DataTypes.DATE,
      End_Date: DataTypes.DATE,
      Time_Sequence_ID: DataTypes.INTEGER,
      Version: DataTypes.INTEGER,
      Version_Type: DataTypes.STRING,
      Hidden_Flag: DataTypes.BOOLEAN,
      Completion_Flag: DataTypes.BOOLEAN,
      Validation_Output: DataTypes.STRING,
      Unbundled_Flag: DataTypes.BOOLEAN,
      SID: DataTypes.INTEGER,
      UID: DataTypes.STRING,
      Last_Modified_Date: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'contractbody',
      modelName: 'ContractBody',
      timestamps: false,
    },
  );

  return ContractBody;
};

export default ContractBody;
