import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

export class DeploymentLog extends Model {
  static associate = (models: { [name: string]: ModelStatic<Model> }) => {
    DeploymentLog.hasOne(models.Agent, { foreignKey: 'agent_id', constraints: false });
    DeploymentLog.hasOne(models.Service, { foreignKey: 'service_id', constraints: false });
  }
  public id!: number;
  public agent_id!: number;
  public service_id!: number;
  public email!: string;
  public status!: string;
  public percentage!: number;
  public output!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public Agent!: Model;
  public Service!: Model;
}

export type DeploymentLogDef = typeof DeploymentLog;

export default (sequelize: Sequelize, types: typeof DataTypes): typeof Model => {
  DeploymentLog.init({
    id: {
      type: types.INET,
      primaryKey: true,
      autoIncrement: true,
    },
    agent_id: types.INTEGER,
    service_id: types.INTEGER,
    email: types.STRING,
    status: types.STRING,
    percentage: types.INTEGER,
    output: types.STRING,
    created_at: types.DATE,
    updated_at: types.DATE,
  }, {
    sequelize,
    tableName: 'deployment_logs',
    modelName: 'DeploymentLog',
    timestamps: false,
  });

  return DeploymentLog;
}