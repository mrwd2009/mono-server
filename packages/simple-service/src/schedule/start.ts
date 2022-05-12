import Schedule from 'node-schedule';
import _ from 'lodash';
import depsInit from '../config/initializer';
import config from '../config/config';
import { getJobList } from './helper';
import { initialize as initMonitor } from '../lib/monitor/prometheus';
import './job';

const initialize = async () => {
  await depsInit();
  const list = getJobList();
  await Promise.all(
    _.map(list, (job) => {
      return job(Schedule);
    }),
  );
  if (!config.isDev) {
    await initMonitor('schedule');
  }
};

initialize();
