/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import SequelizeNameSpace, { Sequelize, Model } from '@sequelize/core';
import path from 'path';
import _ from 'lodash';
import config from '../config/config';
import { AppModels } from './types';

export interface Database {
  sequelize: Sequelize;
  Sequelize: typeof SequelizeNameSpace;
  models: AppModels;
}

export interface DatabaseGroup {
  [dbName: string]: Database;
}

export interface DatabaseOptions {
  database: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number | string;
  modelDir?: string;
  [otherIndex: string]: any;
}

export const connectTo = (options: DatabaseOptions): Database => {
  const {
    database,
    username = config.database.main.username,
    password = config.database.main.password,
    host = config.database.main.host,
    modelDir = 'main',
    ...restOptions
  } = options;
  // so strange, I must use any type
  const port: any = _.parseInt(`${options.port || config.database.main.port || config.database.basic.port}`) as unknown as number;
  const baseDir = path.join(__dirname, modelDir);
  const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    pool: config.database.poolConfig,
    logQueryParameters: config.isDev,
    benchmark: config.isDev,
    logging: (sql, costTime, extra: { model?: { name: string } } = {}) => {
      const { model } = extra;
      // generate SQL query log
      if (config.isDev) {
        const modelName = `${model ? `${model.name} ` : ''}`;
        const costStr = (costTime || 0) > 100 ? `\x1b[38;2;205;0;205m${costTime}ms\x1b[0m` : `${costTime || 0}ms`;
        console.log(
          '\x1b[38;2;0;204;204m%s\x1b[0m \x1b[38;2;0;0;238m%s\x1b[0m',
          `${database}(${modelName}${costStr})`,
          sql,
        );
      }
    },
    ...restOptions,
  });
  const db: Database = {
    sequelize,
    Sequelize: SequelizeNameSpace,
    models: {} as any,
  };
  fs.readdirSync(baseDir)
    .filter((file) => {
      const suffix = file.slice(-3);
      // only load model definition
      return ['.ts', '.js'].includes(suffix) && file !== 'index.ts' && file !== 'index.js';
    })
    .forEach((file) => {
      const model: Model = require(path.join(baseDir, file)).initialize(sequelize, config);
      const name: string = _.get(model, 'name');
      (db.models as any)[name] = model;
    });

  _.forEach(_.keys(db.models), (modelName) => {
    const model: Model = (db.models as any)[modelName];
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
        return rawCallback(trans).catch((error: any) => {
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
      return oldTrans.call(db.sequelize, newCallback);
    }

    return oldTrans.apply(db.sequelize, args);
  };

  return db;
};
