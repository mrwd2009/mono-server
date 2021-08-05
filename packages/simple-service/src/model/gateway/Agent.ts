import { Sequelize, DataTypes, Model } from 'sequelize';

export class Agent extends Model {
  // static associate = (models: { [name: string]: Model }) => {
  //   console.log(models);
  // }
  public id!: number;
  public name!: string;
  public ip!: string;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

export type AgentDef = typeof Agent;

export default (sequelize: Sequelize, types: typeof DataTypes): typeof Model => {
  Agent.init({
    id: {
      type: types.INET,
      primaryKey: true,
      autoIncrement: true,
    },
    name: types.STRING,
    ip: types.STRING,
    status: types.STRING,
    created_at: types.DATE,
    updated_at: types.DATE,
  }, {
    sequelize,
    tableName: 'agents',
    modelName: 'Agent',
    timestamps: false,
  });

  return Agent;
}