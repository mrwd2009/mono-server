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
    ContractRoot: typeof ContractRoot;
  }
  type ContractRootModel = ContractRoot;
}

export class ContractRoot extends Model<InferAttributes<ContractRoot>, InferCreationAttributes<ContractRoot>> {
  static associate = (models: AppModels) => {
    ContractRoot.hasMany(models.ContractBody, { foreignKey: '_fk_contractroot', constraints: false });
  };
  declare __pk_contractroot: number;
  declare Name: CreationOptional<string>;
  declare Status: CreationOptional<string>;
  declare Type: CreationOptional<string>;
  declare RootType: CreationOptional<string>;
  declare ContractDomain: CreationOptional<string>;
  declare ContractScope: CreationOptional<string>;
  declare ContratClass: CreationOptional<string>;
  declare SubMarketplace: CreationOptional<string>;
  declare ActionVersion: CreationOptional<number>;
  declare SID: CreationOptional<number>;
  declare UID: CreationOptional<string>;
  declare ContractBodies?: NonAttribute<ContractBodyModel[]>;
}

export const initialize = (sequelize: Sequelize) => {
  ContractRoot.init(
    {
      __pk_contractroot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: DataTypes.STRING,
      Status: DataTypes.STRING,
      Type: DataTypes.STRING,
      RootType: DataTypes.STRING,
      ContractDomain: DataTypes.STRING,
      ContractScope: DataTypes.STRING,
      ContratClass: DataTypes.STRING,
      SubMarketplace: DataTypes.STRING,
      ActionVersion: DataTypes.INTEGER,
      SID: DataTypes.INTEGER,
      UID: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'contractroot',
      modelName: 'ContractRoot',
      timestamps: false,
    },
  );

  return ContractRoot;
};

export default ContractRoot;
