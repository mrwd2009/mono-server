import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';

declare module '../types' {
  interface AppModels {
    ChargeType: typeof ChargeType;
  }
  type ChargeTypeModel = ChargeType;
  type ChargeTypeModelDef = typeof ChargeType;
}


class ChargeType extends Model<InferAttributes<ChargeType>, InferCreationAttributes<ChargeType>> {
  declare Charge_ID: CreationOptional<number>;
  declare Charge_Type: string;
  declare Coexistent_Charge_Type: CreationOptional<string>;
  declare Mutual_Exclusive_Charge_Type: CreationOptional<string>;
  declare Description: CreationOptional<string>;
}

export const initialize = (sequelize: Sequelize) => {
  ChargeType.init(
    {
      Charge_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
      },
      Charge_Type: {
        type: DataTypes.STRING
      },
      Coexistent_Charge_Type: {
        type: DataTypes.STRING
      },
      Mutual_Exclusive_Charge_Type: {
        type: DataTypes.STRING
      },
      Description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'chargetype',
      modelName: 'ChargeType',
      timestamps: false,
    },
  );

  return ChargeType;
};

export default ChargeType;
