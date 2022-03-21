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
    Agent: typeof Agent;
  }
  type AgentModel = Agent;
}

export class Agent extends Model<InferAttributes<Agent>, InferCreationAttributes<Agent>> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  declare ip: CreationOptional<string>;
  declare status: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  Agent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      ip: DataTypes.STRING,
      status: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'agents',
      modelName: 'Agent',
      timestamps: false,
    },
  );

  return Agent;
};

export default Agent;
