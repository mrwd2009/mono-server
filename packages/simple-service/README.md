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