import { Sequelize, DataTypes, Model } from 'sequelize';

export class AgentService extends Model {
  // static associate = (models: { [name: string]: Model }) => {
  //   console.log(models);
  // }
  public id!: number;
  public agent_id!: number;
  public service_id!: number;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

export type AgentServiceDef = typeof AgentService;

export default (sequelize: Sequelize, types: typeof DataTypes): typeof Model => {
  AgentService.init({
    id: {
      type: types.INET,
      primaryKey: true,
      autoIncrement: true,
    },
    agent_id: types.INTEGER,
    service_id: types.INTEGER,
    status: types.STRING,
    created_at: types.DATE,
    updated_at: types.DATE,
  }, {
    sequelize,
    tableName: 'agents_services',
    modelName: 'AgentService',
    timestamps: false,
  });

  return AgentService;
}