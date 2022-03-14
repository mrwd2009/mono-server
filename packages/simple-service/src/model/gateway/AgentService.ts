import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

declare module '../types' {
  interface AppModels {
    AgentService: typeof AgentService
  }
  type AgentServiceModel = AgentService;
}

export class AgentService extends Model<InferAttributes<AgentService>, InferCreationAttributes<AgentService>> {
  declare id: CreationOptional<number>;
  declare agent_id: number;
  declare service_id: number;
  declare status: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  AgentService.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agent_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'agents_services',
    modelName: 'AgentService',
    timestamps: false,
  });

  return AgentService;
};

export default AgentService;
