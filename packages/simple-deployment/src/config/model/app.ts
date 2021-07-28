import path from 'path';
import fs from 'fs';
import config from '../config';
export * from './type';
import { DatabaseGroup } from './helper';

const dbPath = path.join(__dirname, config.appEnv);

let appDB: DatabaseGroup;
if (fs.existsSync(dbPath)) {
  appDB = require(dbPath).default;
} else {
  appDB = require('./dev').default;
}

export default appDB;

