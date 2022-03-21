import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { AppModels, AgentModel, ServiceModel } from '../types';

declare module '../types' {
  interface AppModels {
    DeploymentLog: typeof DeploymentLog;
  }
  type DeploymentLogModel = DeploymentLog;
  type DeploymentLogModelDef = typeof DeploymentLog;
}

export class DeploymentLog extends Model<InferAttributes<DeploymentLog>, InferCreationAttributes<DeploymentLog>> {
  static associate = (models: AppModels) => {
    DeploymentLog.belongsTo(models.Agent, { foreignKey: 'agent_id', constraints: false });
    DeploymentLog.belongsTo(models.Service, { foreignKey: 'service_id', constraints: false });
  };
  declare id: CreationOptional<number>;
  declare agent_id: number;
  declare service_id: number;
  declare email: CreationOptional<string>;
  declare status: CreationOptional<string>;
  declare percentage: CreationOptional<number>;
  declare output: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare Agent?: NonAttribute<AgentModel>;
  declare Service?: NonAttribute<ServiceModel>;
}

export const initialize = (sequelize: Sequelize) => {
  DeploymentLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      agent_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      percentage: DataTypes.INTEGER,
      output: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'deployment_logs',
      modelName: 'DeploymentLog',
      timestamps: false,
    },
  );

  return DeploymentLog;
};

export default DeploymentLog;
