import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, ContractBodyModel } from '../types';

declare module '../types' {
  interface AppModels {
    ContractParameter: typeof ContractParameter;
  }
  type ContractParameterModel = ContractParameter;
  type ContractParameterModelDef = typeof ContractParameter;
}

export class ContractParameter extends Model<
  InferAttributes<ContractParameter>,
  InferCreationAttributes<ContractParameter>
> {
  static associate = (models: AppModels) => {
    ContractParameter.belongsTo(models.ContractBody, { foreignKey: '_fk_contractbody ', constraints: false });
  };
  declare __pk_parameter: CreationOptional<number>;
  declare _fk_contractbody: number;
  declare Parameter_ID: number;
  declare Parameter_Value: CreationOptional<string>;
  declare Conditional: CreationOptional<string>;
  declare Dictionary_ID: CreationOptional<number>;
  declare SID: CreationOptional<number>;
  declare UID: CreationOptional<string>;
  declare ContractBody?: NonAttribute<ContractBodyModel>;
}

export const initialize = (sequelize: Sequelize) => {
  ContractParameter.init(
    {
      __pk_parameter: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      _fk_contractbody: DataTypes.INTEGER,
      Parameter_ID: DataTypes.INTEGER,
      Parameter_Value: DataTypes.STRING,
      Conditional: DataTypes.STRING,
      Dictionary_ID: DataTypes.INTEGER,
      SID: DataTypes.INTEGER,
      UID: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'parameter',
      modelName: 'ContractParameter',
      timestamps: false,
    },
  );

  return ContractParameter;
};

export default ContractParameter;
