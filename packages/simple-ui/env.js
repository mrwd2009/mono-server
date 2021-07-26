const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path

const get = (envName) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname, '/envs');

  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + envName;

  // Check if the file exists
  let finalPath;
  if(fs.existsSync(envPath)){
    finalPath = envPath;
  } else {
    console.error(`There is no env definition: ${envPath}`);
  }

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return envKeys;
}

module.exports = {
  get
}