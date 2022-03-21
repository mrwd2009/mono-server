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
    Service: typeof Service;
  }
  type ServiceModel = Service;
  type ServiceModelDef = typeof Service;
}

export class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  declare category: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare command: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      command: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'services',
      modelName: 'Service',
      timestamps: false,
    },
  );

  return Service;
};

export default Service;
