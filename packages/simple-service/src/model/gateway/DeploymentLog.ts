import { Sequelize, DataTypes, Model } from 'sequelize';

export class DeploymentLog extends Model {
  // static associate = (models: { [name: string]: Model }) => {
  //   console.log(models);
  // }
  public id!: number;
  public agent_id!: number;
  public service_id!: number;
  public email!: string;
  public status!: string;
  public percentage!: number;
  public stdout!: string;
  public stderr!: string;
  public created_at!: Date;
  public updated_at!: Date;
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
    stdout: types.STRING,
    stderr: types.STRING,
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