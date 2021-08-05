import { Sequelize, DataTypes, Model } from 'sequelize';

export class Service extends Model {
  // static associate = (models: { [name: string]: Model }) => {
  //   console.log(models);
  // }
  public id!: number;
  public name!: string;
  public category!: string;
  public description!: string;
  public command!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

export type ServiceDef = typeof Service;

export default (sequelize: Sequelize, types: typeof DataTypes): typeof Model => {
  Service.init({
    id: {
      type: types.INET,
      primaryKey: true,
      autoIncrement: true,
    },
    name: types.STRING,
    category: types.STRING,
    description: types.STRING,
    command: types.STRING,
    created_at: types.DATE,
    updated_at: types.DATE,
  }, {
    sequelize,
    tableName: 'services',
    modelName: 'Service',
    timestamps: false,
  });

  return Service;
}