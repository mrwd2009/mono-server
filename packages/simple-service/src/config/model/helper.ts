/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import SequelizeNameSpace, { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import _ from 'lodash';
import config from '../config';
import {
  UserDef,
  AgentDef,
  AgentServiceDef,
  DeploymentLogDef,
  ServiceDef,
} from './type';

type ModelDefs = (UserDef
  | AgentDef
  | AgentServiceDef
  | DeploymentLogDef
  | ServiceDef
) ;

export interface Database {
  sequelize: Sequelize,
  Sequelize: typeof SequelizeNameSpace,
  models: {
    [modelName: string]: ModelDefs,
  },
}

export interface DatabaseGroup {
  [dbName: string]: Database,
}

export interface DatabaseOptions {
  database: string,
  username?: string,
  password?: string,
  host?: string,
  port?: number,
  modelDir?: string,
  [otherIndex: string]: any,
}

export const connectTo = (options: DatabaseOptions): Database => {
  const {
    database,
    username = config.database.main.username,
    password = config.database.main.password,
    host = config.database.main.host,
    port = 3306,
    modelDir = 'main',
    ...restOptions
  } = options;
  const baseDir = path.join(__dirname, '../../model', modelDir);
  const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logQueryParameters: config.isDev,
    benchmark: config.isDev,
    logging: (sql, costTime, extra: { model?: { name: string }} = {}) => {
      const {
        model,
      } = extra;
      // generate SQL query log
      if (config.isDev) {
        const modelName = `${model ? `${model.name} ` : ''}`;
        const costStr = (costTime || 0) > 100 ? `\x1b[38;2;205;0;205m${costTime}ms\x1b[0m` : `${costTime || 0}ms`;
        console.log('\x1b[38;2;0;204;204m%s\x1b[0m \x1b[38;2;0;0;238m%s\x1b[0m', `${database}(${modelName}${costStr})`, sql);
      }
    },
    ...restOptions,
  })
  const db: Database = {
    sequelize,
    Sequelize: SequelizeNameSpace,
    models: {}
  };
  fs.readdirSync(baseDir)
    .filter(file => {
      const suffix = file.slice(-3);
      return ['.ts', '.js'].includes(suffix);
    })
    .forEach(file => {
      const model: ModelDefs = require(path.join(baseDir, file)).default(sequelize, DataTypes, config);
      const name: string = _.get(model, 'name');
      db.models[name] = model;
    });
  
  _.forEach(_.keys(db.models), (modelName) => {
    const model = db.models[modelName];
    const associate = _.get(model, 'associate');
    if (associate) {
      associate(db.models);
    }
  });

  // release database connection after deadlock occured
  // reference https://github.com/sequelize/sequelize/issues/11571
  const oldTrans: any = db.sequelize.transaction;
  db.sequelize.transaction = (...args: any[]) => {
    if (_.isFunction(args[1] || args[0])) {
      const rawCallback = args[1] || args[0];
      const newCallback = (trans: any) => {
        return rawCallback(trans)
          .catch((error: any) => {
            if (error.parent && error.parent.code === 'ER_LOCK_DEADLOCK') {
              trans.cleanup();
            }
            throw error;
          });
      };
      // For two prameters
      if (args[1]) {
        return oldTrans.call(db.sequelize, args[0], newCallback);
      }
      // For one parameters
      return oldTrans.call(db.sequelize, newCallback)
    }
  
    return oldTrans.apply(db.sequelize, args);
  }
  
  return db;
};
