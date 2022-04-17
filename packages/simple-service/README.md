# Let's go
This project is based on Koa to provide RESTful api and we introduce typescript in.\
Multiple app environments, job queue, schedule, cluster, log, and database are supported.

TODO docker, monitoring.

Node version >= 14.15.1

## Available Scripts
In the project directory, you can run:

### `yarn test`
Runs all unit tests using Jest.

### `yarn lint`
Runs eslint.

### `yarn dev`

Runs the app in the development mode.<br />
Service point is [http://localhost:4100](http://localhost:4100).

### `yarn dev-cluster`

Runs the app cluster in the development mode.<br />
Service point is [http://localhost:4100](http://localhost:4100).

### `yarn dev-log-server`

Starts log server(unix domain socket) in the development mode.

### `yarn dev-queue`

Starts job queue in the development mode.

### `yarn dev-queue-dashboard`

Starts job queue dashboard in the development mode.
Service point is [http://localhost:5379](http://localhost:5379).

### `yarn dev-schedule`

Starts job schedule in the development mode.

### `yarn build`

Compile source ts files into `build` directory.

### `yarn format`

Format ts source code.

### `pretty-quick`

Format git staged ts source code.


## Coding Guidelines

### 1. New App Environment

In order to use your new app environment, you need to give a unique name in environment variable `APP_ENV`.\

Create a new config file in `./src/config/env` using your decided name.
Use your config file as following, the content in your file will be loaded automatically.
```
import config from '../../../config/config';
```


Create a new database connection directory in `./src/config/model` using your decided name. You can add any database connection in this new directory as you like, please refer `./src/config/model/dev/index.ts`.
Use your config file as following, the database connections will be loaded automatically.
```
import appDB from '../../../config/model/app';
```

### 2. New API Module

If you want to add a new api module, please add a new directory under `./src/api`;
A standard module directory structure like following.
```
moduleA
  controller // validate parameters and call model service
  helper // Optional: shared functions in this module
  model // model service
  route // Optional: all available routes
  index.ts // export all routes
```
The unnecessary directories can be removed.
The `index.ts` file will be loaded automatically.

**Caution**: Do not call any function from other module directory. Shared functions across system should be placed in `./src/lib` directory.

### 3. Source Code Format

Before committing any code, please run `yarn format`.

### 4. Environment Variables

HTTP server port.\
**PORT=4100**

Prometheus metricx port\
**APP_PROMETHEUS_PORT=4000**

Prometheus api path\
**APP_PROMETHEUS_PATH=/metrics**

Wokers number in cluster mode. If omitted, cpu cores number will be used.\
**CLUSTER_WORKERS=4**

Worker number in queue service. If omitted, cpu cores number will be used.\
**QUEUE_WORKERS=4**

Bull queue dashboard port.\
**QUEUE_DASHBOARD_PORT=5379**

Secret keys used to encrypt cookie.\
**COOKIE_KEYS=sercret1,secret2**

Node environment.\
**NODE_ENV=development**

Application environment.\
**APP_ENV=dev**

Winston log directory. Default drectory `log/winston` is under current project.\
**WINSTON_LOG_DIR=xxx**

Temp directory used to save uploaded file. Default drectory `temp` is under current project.\
**TEMP_FILE_DIR=xxx**

In development mode, show known error.\
**TRACE_KNOWN_ERROR_IN_DEV=true**

JWT secret key.\
**JWT_SECRET=xxx**

JWT token effective hour.\
**JWT_EXPIRED_HOUR**

Main redis url.\
**MAIN_REDIS_URL=xxx**

Queue redis url.\
**QUEUE_REDIS_URL=xxx**

Enable log server.\
**ENABLE_APP_LOG_IPC=true**

Main database auth.\
**MAIN_DB_USER=xxx**\
**MAIN_DB_PASS=xxx**\
**MAIN_DB_HOST=xxx**\
**MAIN_DB_PORT=xxx**

Gateway databsae auth.\
**GATEWAY_DB_USER=xxx**\
**GATEWAY_DB_PASS=xxx**\
**GATEWAY_DB_HOST=xxx**\
**GATEWAY_DB_PORT=xxx**

Default mysql port.\
**APP_MYSQL_PORT=3306**

Allowed cors domains.\
**ALLOWED_DOMAINS=xxx,xxx**

Enable ability to extend session effective time.\
**APP_SESSION_AUTO_EXTEND**

Skip extending session effective time when route contains defined value. Default value is `auto-refresh`. When you have an api that is called periodically in client, you must include this string in your route definition or set `context.skipSessionExtend=true` in your koa router middleware.\
**APP_SESSION_IGNORED_ROUTE**

How many hours left before extending session effective time\
**APP_SESSION_RESET_HOUR**
