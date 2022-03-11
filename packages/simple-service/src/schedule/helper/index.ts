import Schedule from 'node-schedule';

export type Scheduler = typeof Schedule;

export type JobConstructor = (s: Scheduler) => Promise<void>;

const jobList: JobConstructor[] = [];

export const registerJob = (job: JobConstructor) => {
  jobList.push(job);
};

export const getJobList = () => {
  return jobList;
};