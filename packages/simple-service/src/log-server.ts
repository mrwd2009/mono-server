import 'dotenv/config';
/**
 * If the master process is not created by us, we can't send new log to master process.
 * So we create a unix domain socket to accept logs created from each worker.
 */
import './lib/logger/log-server-ipc';
