import { Job } from 'bull';
export const process = async (job: Job): Promise<void> => {
  console.log(job);
};

export default process;
