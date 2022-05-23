import { JobConstructor, registerJob } from '../helper';

const initialize: JobConstructor = async (schedule) => {
  schedule.scheduleJob('0 0 0 * * *', () => {
    console.log('job-1');
  });
};

registerJob(initialize);
