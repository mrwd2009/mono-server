const APP_TYPE = process.env.APP_TYPE || 'api';

if (APP_TYPE === 'api') {
  require('./api');
} else if (APP_TYPE === 'queue') {
  require('./queue');
} else if (APP_TYPE === 'schedule') {
  require('./schedule');
} else if (APP_TYPE === 'queue-dashboard') {
  require('./queue-dashboard');
}
