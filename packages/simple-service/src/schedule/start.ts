import Schedule from 'node-schedule';
import _ from 'lodash';
import { getJobList } from './helper';
import './job';

const initialize = async () => {
  const list = getJobList();
  await Promise.all(_.map(list, job => {
    return job(Schedule);
  }));
};

initialize();