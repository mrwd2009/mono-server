import { JobConstructor, registerJob } from '../helper';

const initialize: JobConstructor = async (schedule) => {
  schedule;
};

registerJob(initialize);
