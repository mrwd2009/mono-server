import type { Job } from 'bull';
import type { Logger } from 'winston';
export const process = async (logger: Logger, job: Job): Promise<void> => {
  // logger.info(job);
};

export default process;
