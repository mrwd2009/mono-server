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
    RbacRole: typeof RbacRole;
  }
  type RbacRoleModel = RbacRole;
  type RbacRoleModelDef = typeof RbacRole;
}

export class RbacRole extends Model<InferAttributes<RbacRole>, InferCreationAttributes<RbacRole>> {
  declare id: CreationOptional<number>;
  declare parent_id: number | null;
  declare name: string;
  declare sequence_id: string;
  declare description: string;
  declare enabled: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

export const initialize = (sequelize: Sequelize) => {
  RbacRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '__pk_rbacrole',
      },
      parent_id: {
        type: DataTypes.INTEGER,
        field: '_fk_rbacrole_parent',
      },
      name: DataTypes.STRING,
      sequence_id: DataTypes.STRING,
      description: DataTypes.STRING,
      enabled: DataTypes.BOOLEAN,
      created_at: {
        type: DataTypes.DATE,
        field: 'creation_date',
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'last_modified_date',
      },
    },
    {
      sequelize,
      tableName: 'rbacrole',
      modelName: 'RbacRole',
      timestamps: false,
    },
  );

  return RbacRole;
};

export default RbacRole;
